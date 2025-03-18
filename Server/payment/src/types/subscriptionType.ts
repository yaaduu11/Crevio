import { ObjectId } from "mongoose";

export interface SubscriptionPlanType {
   _id?: ObjectId;
   planName: string;
   price: number;
   client_services: string[]; 
   freelancer_services: string[];
   status: string,
   createdAt?: Date;
   updatedAt?: Date;
}

export interface SubscriptionType {
  price: number;
  client_services: string[]; 
  freelancer_services: string[];
}

export interface ISubscription extends Document {
  userId: ObjectId; 
  planId: ObjectId; 
  planName: string;
  amount: number;
  currency: string;
  status: "active" | "canceled" | "expired";
  paymentMethod: string;
  paymentStatus: "succeeded" | "pending" | "failed";
  subscriptionStart: Date;
  subscriptionEnd: Date;
  renewal: boolean;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
}