import { errorMonitor } from "nodemailer/lib/xoauth2";
import { env } from "../config/env";

export default function envValidator() {
    if(!env.PORT){
        throw new Error('PORT is not found in env')
    }

    if(!env.MONGO_URI) {
        throw new Error('Mongo URI is not found in env')
    }

    if(!env.REDIS_URI) {
        throw new Error('Redis URI is not found in env')
    }
    
    if(!env.USER_EMAIL) {
        throw new Error('User email is not found in env')
    }
    
    if(!env.USER_PASSWORD) {
        throw new Error('User password is not found in the env')
    }
    
}