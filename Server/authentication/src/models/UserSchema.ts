import mongoose, {Schema} from "mongoose";
import { UserType } from "../types/Type";

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
    role: {
        type: String,
        enum: ["freelancer", "client", "admin"]
    },
    isBlocked: {
        type : Boolean,
        default: false
    },
    isSubscribed : {
        type : Boolean,
        default: false
    },
    subscriptionType: {
        type: String,
        enum: ['basic', 'standad', 'extended', 'none'],
        default: 'none'
    }
}, { timestamps: true })

export default mongoose.model<UserType>("User", userSchema, "Users")