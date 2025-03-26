import { ISubscription } from "../../types";
import Stripe from "stripe";

export interface IUserService {
    createStripeSession(planId: string, amount: number, userId: string): Promise<string | null>;
    verifyStripeWebhook(payload: Buffer, sig: string): Stripe.Event | null;
    processStripeEvent(event: Stripe.Event): Promise<void>;
    checkUserSubscribed(userId: string): Promise<{planName: string}>
}