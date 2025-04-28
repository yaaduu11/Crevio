import mongoose from "mongoose";

export interface ProjectType {
    userId: mongoose.Types.ObjectId;
    title: string;
    thumbnail: string;
    description: string;
    category: string;
    skills: string[];
    deadline: string;
    additional_info: string;
    applicants: {
        userId: mongoose.Types.ObjectId;
        appliedAt: Date;
    }[];
}