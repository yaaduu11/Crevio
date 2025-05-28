import mongoose, {Schema} from "mongoose";
import { UserType } from "../types";

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true  
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    profilePicture: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["freelancer", "client", "admin", "none"],
        default : "none"
    },
    isBlocked: {
        type : Boolean,
        required: true,
        default: false
    },
    subscriptionType: {
        type: String,
        enum: ['Basic', 'Standard', 'Extended', 'None'],
        default: 'None'
    }
}, { timestamps: true })

export default mongoose.model<UserType>("User", userSchema, "Users")