import { Document } from "mongoose";

export interface SubscriptionType extends Document {
  planName: "Base" | "Standard" | "Extended";
  price: number;
  client_services: string[]; 
  freelancer_services: string[];
  status: "Active" | "Expired" | "Canceled";
  startDate: Date;
  endDate: Date;
  paymentStatus: "Pending" | "Completed" | "Failed";
  createdAt?: Date;
  updatedAt?: Date;
}