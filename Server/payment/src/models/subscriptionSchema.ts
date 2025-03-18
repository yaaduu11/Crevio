import mongoose, { Schema, ObjectId} from "mongoose";
import { ISubscription } from "../types/subscriptionType";

const SubscriptionSchema = new Schema<ISubscription>(
    {
        userId: { 
            type: Schema.Types.ObjectId, 
            required: true 
        },
        planId: { 
            type: Schema.Types.ObjectId, 
            required: true 
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
            enum: ["active", "canceled", "expired"], 
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
            required: true 
        },
        renewal: { 
            type: Boolean, 
            default: false 
        },
        paymentId: { 
            type: String, 
            required: true 
        },
    }, { timestamps: true }
)
console.log('git check')
export default mongoose.model<ISubscription>('Subscription', SubscriptionSchema, 'Subscriptions')