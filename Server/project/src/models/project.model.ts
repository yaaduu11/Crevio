import mongoose, { Schema, Document, Types } from "mongoose";

export interface ProjectType extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    thumbnail: string;
    description: string;
    category: string;
    skills: string[];
    deadline: string;
    additional_info: string;
    is_shortlisted: boolean;
    shortlisted_freelancers: Types.ObjectId[];
}

const projectSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    additional_info: {
        type: String,
        default: ""
    },
    is_shortlisted: {
        type: Boolean,
        default: false
    },
    shortlisted_freelancers: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model<ProjectType>("Project", projectSchema, "Projects");
