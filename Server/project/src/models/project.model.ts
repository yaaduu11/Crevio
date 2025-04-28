import mongoose, { Schema, Document } from "mongoose";

export interface ProjectType extends Document {
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
    applicants: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
            },
            appliedAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model<ProjectType>("Project", projectSchema, "Projects");
