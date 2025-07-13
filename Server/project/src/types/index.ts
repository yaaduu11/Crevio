import mongoose from "mongoose";
import { ApplicationType } from "../models/applicants.model";

export interface FileType {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

export interface ApplyFileType {
    userId: string;
    projectId: string;
    coverLetter: string;
    resume?: FileType ;
    resumeUrl? : string
    ai_rating: number
}

export interface ProjectType {
    userId: mongoose.Types.ObjectId;
    title: string;
    thumbnail?: string;
    description: string;
    category: string;
    skills: string[];
    deadline: string;
    additional_info: string;
    is_shortlisted?: boolean;
    shortlisted_freelancers?: mongoose.Types.ObjectId[];
}

export interface UserType {
    _id?: mongoose.Types.ObjectId;
    name?: string;
    email: string;
    password?: string;
    profilePicture?: string;
    role?: 'freelancer' | 'client' | 'admin';
    isBlocked?: boolean;
    subscriptionType? : string;
}
