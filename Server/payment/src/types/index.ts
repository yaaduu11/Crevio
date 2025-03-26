import { ObjectId, Types } from "mongoose";

export interface SubscriptionPlanType {
   _id?: ObjectId;
   planName: string;
   price: number;
   client_services: string[]; 
   freelancer_services: string[];
   status: string,
   most_popular: boolean;
   createdAt?: Date;
   updatedAt?: Date;
}

export interface SubscriptionType {
  price: number;
  client_services: string[]; 
  freelancer_services: string[];
}

export interface ISubscription {
  userId: Types.ObjectId;
  planId: Types.ObjectId;
  amount: number;
  currency: string;
  status: "active" | "canceled" | "expired";
  paymentMethod: string;
  paymentStatus: "pending" | "failed" | "successful" | "paid";
  subscriptionStart: Date;
  subscriptionEnd: Date;
  renewal: boolean;
  paymentId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
