import mongoose, { Schema} from "mongoose";
import { SubscriptionPlanType } from "../types/subscriptionType";

const SubscriptionPlanSchema : Schema = new Schema({
    planName: {
      type: String,
      enum: ["Basic", "Standard", "Extended"],
      default: 'Basic'
    },
    price: {
      type: Number,
      required: true,
    },
    client_services: {
      type: [String],
      required: true,
    },
    freelancer_services: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ["Listed", "Unlisted"],
      default: "Listed",
    }
  },{ timestamps: true }
);

export default mongoose.model<SubscriptionPlanType>("SubscriptionPlan",SubscriptionPlanSchema, "SubscriptionPlans");