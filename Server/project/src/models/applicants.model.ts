import mongoose, { Schema, Document } from "mongoose";
import { FileType } from '../types/index';

export interface ApplicationType extends Document {
  projectId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  coverLetter: string;
  resumeUrl: string;
  status: "pending" | "accepted" | "rejected";
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
  },
  { timestamps: true }
);

export default mongoose.model<ApplicationType>("Application", applicationSchema, "Applications");