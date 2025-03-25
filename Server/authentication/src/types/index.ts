import mongoose,{ ObjectId } from "mongoose";

export interface UserType {
    _id?: ObjectId;
    name?: string;
    email: string;
    password?: string;
    profilePicture?: string;
    role?: 'freelancer' | 'client' | 'admin';
    isBlocked?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type SigninResponse = {accessToken: string, refreshToken: string, user: UserType}

export interface GoogleAuthUserType {
    email: string;
    name: string;
    profilePicture?: string;
}

export interface FileType {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

export interface IFreelancerDetail extends Document {
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
    total_reviews: number;
    availability_status: "available" | "busy" | "offline";
}