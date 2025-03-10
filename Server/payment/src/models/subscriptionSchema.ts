import { Schema, model, Document, ObjectId } from "mongoose";
import { SubscriptionType } from "../types/subscriptionType";

const SubscriptionPlanSchema = new Schema<SubscriptionType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planName: {
      type: String,
      enum: ["Base", "Standard", "Extended"],
      required: true,
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
      enum: ["Active", "Expired", "Canceled"],
      default: "Active",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); 
      },
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

SubscriptionPlanSchema.pre<SubscriptionType>("save", function (next) {
  if (this.endDate && this.endDate < new Date()) {
    this.status = "Expired";
  }
  next();
});

const SubscriptionPlanModel = model<SubscriptionType>("SubscriptionPlan",SubscriptionPlanSchema);

export default SubscriptionPlanModel;