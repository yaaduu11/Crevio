import { IUserService } from "../interface/user-service.interface";
import { IUserRepository } from "../../repositories/interface/user-repository.interface";
import { env, stripe } from "../../config";
import { ISubscription } from "../../types";
import Stripe from "stripe";
import { Types } from "mongoose";
import { generateHttpError } from "../../utils";
import { httpStatusCodes, Messages } from "../../constants";

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {}

    async createStripeSession(planId: string, amount: number, userId: string): Promise<string | null> {
        try {
            const product = await stripe.products.create({
                name: `Subscription Plan`,
            });
    
            const price = await stripe.prices.create({
                unit_amount: amount * 100,
                currency: "inr",
                recurring: { interval: "month" },
                product: product.id,
            });
    
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "subscription",
                line_items: [{ price: price.id, quantity: 1 }],
                success_url: `http://localhost:5173/success?Your%20payment%20is%20successfully%20completed`,
                cancel_url: `http://localhost:5173/cancel`,
                metadata: { userId, planId },
            });
    
            return session.url || null;
        } catch (error) {
            console.error("Error creating Stripe session:", error);
            return null;
        }
    }

    verifyStripeWebhook(payload: Buffer, sig: string): Stripe.Event | null {
        try {
            return stripe.webhooks.constructEvent(payload, sig, env.STRIPE_WEBHOOK_SECRET as string);
        } catch (err) {
            console.error("Webhook signature verification failed:", err);
            return null;
        }
    }

    async processStripeEvent(event: Stripe.Event) {
        switch (event.type) {
            case "checkout.session.completed":
                await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
                break;
            case "payment_intent.succeeded":
            case "customer.subscription.created":
            case "customer.subscription.updated":
            case "invoice.payment_succeeded":
            case "plan.created":
            case "price.created":
            case "invoice.payment_failed":
            case "charge.succeeded":
                break;
            default:
                break;
        }
    }    
    
    private async handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
        if (session.payment_status !== "paid") return;
    
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId;
    
        if (!userId || !planId) {
            console.error("Missing userId or planId in metadata");
            return;
        }

        const subscriptionData: ISubscription = {
            userId: new Types.ObjectId(userId),
            planId: new Types.ObjectId(planId),
            amount: (session.amount_total! / 100),
            currency: session.currency ?? "USD",
            paymentMethod: session.payment_method_types?.[0] ?? "unknown",
            paymentStatus: session.payment_status as "successful" | "pending" | "failed",
            subscriptionStart: new Date(),
            subscriptionEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            status: "active",
            renewal: true,
            paymentId: session.id,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    
        await this.userRepository.createSubscription(subscriptionData);
    }

    async checkUserSubscribed(userId: string): Promise<{planName: string}> {
        const subscriptionData = await this.userRepository.findSubscriptionDataByUserId(userId)
        if(!subscriptionData) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.PLAN_NOT_FOUND)
        }
        
        const planName = await this.userRepository.getPlansById(subscriptionData.planId?.toString())
        if(!planName) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.PLAN_NOT_FOUND)
        }

        return {planName}
    }
}