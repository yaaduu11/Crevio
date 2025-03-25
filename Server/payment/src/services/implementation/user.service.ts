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
            console.log('in verify');
            return stripe.webhooks.constructEvent(payload, sig, env.STRIPE_WEBHOOK_SECRET as string);
        } catch (err) {
            console.error("Webhook signature verification failed:", err);
            return null;
        }
    }
    

    // async processStripeEvent(event: Stripe.Event): Promise<void> {
    //     switch (event.type) {
    //         case "checkout.session.completed":
    //             await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    //             break;

    //         case "invoice.payment_failed":
    //             console.log("Payment failed:", event.data.object);
    //             break;

    //         default:
    //             console.log(`Unhandled event type ${event.type}`);
    //     }
    // }



    async processStripeEvent(event: Stripe.Event) {
        switch (event.type) {
            case "checkout.session.completed":
                await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
                break;
            case "payment_intent.succeeded":
                console.log("✅ Payment Intent Succeeded", event);
                // Handle successful payment logic
                break;
    
            case "customer.subscription.created":
            case "customer.subscription.updated":
                console.log("✅ Subscription Event", event);
                // Handle subscription logic
                break;
    
            case "invoice.payment_succeeded":
                console.log("✅ Invoice Payment Succeeded", event);
                // Update subscription status
                break;
            case 'plan.created':
                console.log('New plan created:', event.data.object);
                break;
            case 'price.created':
                console.log('New price created:', event.data.object);
                break;
            case 'customer.subscription.created':
                console.log('New subscription created:', event.data.object);
                break;
            case 'invoice.payment_failed':
                console.log('Payment failed:', event.data.object);
                break;
            case 'checkout.session.completed':
                console.log('Checkout completed:', event.data.object);
                break;
            case 'charge.succeeded':
                console.log('Charge successful:', event.data.object);
                break;
            default:
                console.warn(`⚠️ Unhandled event type ${event.type}`);
                break;
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
        console.log('going to create a plan');
        
        await this.userRepository.createSubscription(subscriptionData)
    }
}