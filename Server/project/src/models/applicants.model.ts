import mongoose, { Schema, Document } from "mongoose";
import { FileType } from '../types/index';

export interface ApplicationType extends Document {
  projectId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  coverLetter: string;
  resumeUrl: string;
  status: "pending" | "accepted" | "rejected";
  ai_rating: number;
}

const applicationSchema: Schema = new Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    coverLetter: {
      type: String,
      default: "",
      required: true
    },
    resumeUrl: {
      type: String,
      default: "",
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    ai_rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    }
  },
  { timestamps: true }
);

export default mongoose.model<ApplicationType>("Application", applicationSchema, "Applications");