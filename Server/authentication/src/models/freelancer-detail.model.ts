import mongoose, { Schema } from "mongoose";
import { IFreelancerDetail } from "../types";

const FreelancerDetailSchema: Schema = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        profession: {
            type: String,
            required: true
        },        
        company: {
            type: String,
            required: true
        },
        qualification: {
            type: String,
            required: false,
            maxlength: 150
        },
        bio: {
            type: String,
            required: false,
            maxlength: 500
        },
        work_experience: {
            type: String,
            required: true
        },
        proficient_languages: {
            type: [String],
            required: true
        },
        skills: {
            type: [String],
            required: true
        },
        working_days: {
            type: String,
            required: true
        },
        active_hours: {
            type: String,
            required: true
        },
        basic_price: {
            type: Number,
            required: true
        },
        standard_price: {
            type: Number,
            required: true
        },
        premium_price: {
            type: Number,
            required: false
        },
        portfolio: {
            type: String,
            required: false
        },
        linkedin: {
            type: String,
            required: false,
        },
        twitter: {
            type: String,
            required: false,
        },
        github: {
            type: String,
            required: false,
        },
        total_reviews: {
            type: Number,
            default: 0
        },
        availability_status: {
            type: String,
            enum: ["available", "busy", "offline"],
            default: "available"
        }
    },
    { timestamps: true }
);

export default mongoose.model<IFreelancerDetail>("FreelancerDetail", FreelancerDetailSchema, "FreelancerDetails");