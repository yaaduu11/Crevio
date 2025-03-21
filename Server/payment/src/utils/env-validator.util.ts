import { env } from "../config/env.config";

export function envValidator() {
    if(!env.PORT) {
        throw new Error('PORT is not found in env')
    }

    if(!env.MONGO_URI) {
        throw new Error('Mongo URI is not found in env')
    }

    if(!env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is not found in env")
    }
}