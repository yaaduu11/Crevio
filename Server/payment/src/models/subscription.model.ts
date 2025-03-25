import mongoose, { Schema, ObjectId} from "mongoose";
import { ISubscription } from "../types";

const SubscriptionSchema = new Schema<ISubscription>(
    {
        userId: { 
            type: Schema.Types.ObjectId, 
            required: true,
            index: true 
        },
        planId: { 
            type: Schema.Types.ObjectId, 
            required: true,
            index: true 
        },        
        planName: { 
            type: String, 
            required: true 
        },
        amount: { 
            type: Number, 
            required: true 
        },
        currency: { 
            type: String, 
            required: true 
        },
        status: { 
            type: String, 
            enum: ["active", "canceled", "expired", "trial"], 
            default: "active" 
        },
        paymentMethod: { 
            type: String, 
            required: true 
        },
        paymentStatus: { 
            type: String, 
            enum: ["succeeded", "pending", "failed"], 
            required: true 
        },
        subscriptionStart: { 
            type: Date, 
            required: true 
        },
        subscriptionEnd: { 
            type: Date, 
            required: false,
            default: null 
        },
        renewal: { 
            type: Boolean, 
            default: false
        },
        paymentId: { 
            type: String, 
            required: false 
        },
    }, { timestamps: true }
)
export default mongoose.model<ISubscription>('Subscription', SubscriptionSchema, 'Subscriptions')