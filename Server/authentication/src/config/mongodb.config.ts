import mongoose from "mongoose";
import { env } from "./env.config";

export function connectDB() {
    mongoose.connect(env.MONGO_URI as string)
        .then(()=>console.log('Mongo connected'))
        .catch((err)=>console.log('Mongo connection failed', err))
}