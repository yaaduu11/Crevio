import mongoose, {ObjectId} from 'mongoose'

interface SigninResponse {
    accessToken: string;
    admin: UserTypes
}

type SigninResult = { success: true; data: SigninResponse } | { success: false; error: string; data:{} }

type GetFreelancers = {success:true; data:[]} | {success:false; error:string; data:{}}

type UserTypes = {
    _id: string; 
    name: string;
    email: string;
    role: "freelancer" | "client" | "admin" | "none";
    isBlocked: boolean;
    subscriptionType: "basic" | "standad" | "extended" | "none";
    createdAt?: Date;
    updatedAt?: Date;
}
  
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

type SubscriptionPlan = {
    price: number;
    client_services: string[]; 
    freelancer_services: string[];
}

export type {SigninResponse, SigninResult, GetFreelancers, UserTypes, SubscriptionPlan}

export interface IFreelancerDetail {
    user_id: mongoose.Schema.Types.ObjectId;
    profession: string;
    company: string;
    qualification: string;
    bio: string;
    work_experience: string;
    proficient_languages: string[];
    skills: string[];
    working_days: string;
    active_hours: string;
    basic_price: number;
    standard_price: number;
    premium_price: number;
    portfolio: string;
    linkedin: string;
    twitter: string;
}