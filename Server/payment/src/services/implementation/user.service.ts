import { IUserService } from "../interface/user-service.interface";
import { IUserRepository } from "../../repositories/interface/user-repository.interface";
import { env, stripe } from "../../config";
import { ISubscription } from "../../types";
import Stripe from "stripe";
import { Types } from "mongoose";

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {}

    async createStripeSession(planId: string, amount: number, userId: string): Promise<string | null> {
        try {
            const price = await stripe.prices.create({
                unit_amount: amount * 100,
                currency: "inr",
                recurring: { interval: "month" },
                product_data: { name: `Subscription for Plan` },
            });

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "subscription",
                line_items: [{ price: price.id, quantity: 1 }],
                success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
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
            return env.STRIPE_WEBHOOK_SECRET 
                ? stripe.webhooks.constructEvent(payload, sig, env.STRIPE_WEBHOOK_SECRET) 
                : null;
        } catch (err) {
            console.error("Webhook signature verification failed:", err);
            return null;
        }
    }

    async processStripeEvent(event: Stripe.Event): Promise<void> {
        switch (event.type) {
            case "checkout.session.completed":
                await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
                break;

            case "invoice.payment_failed":
                console.log("Payment failed:", event.data.object);
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    }

    private async handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
        if (session.payment_status !== "paid") return;

        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId;
        const planName = "Your Plan Name";

        if (!userId || !planId) {
            console.error("Missing userId or planId in metadata");
            return;
        }

        const subscriptionData: ISubscription = {
            userId: new Types.ObjectId(userId),
            planId: new Types.ObjectId(planId),
            planName,
            amount: session.amount_total! / 100,
            currency: session.currency ?? "USD",
            paymentMethod: session.payment_method_types?.[0] ?? "unknown",
            paymentStatus: session.payment_status as "succeeded" | "pending" | "failed",
            subscriptionStart: new Date(),
            subscriptionEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            status: "active",
            renewal: true,
            paymentId: session.id,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await this.userRepository.createSubscription(subscriptionData)
    }
}