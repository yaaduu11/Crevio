import { env } from "../config/env";

export default function envValidator() {
    if(!env.PORT) {
        throw new Error('PORT is not found in env')
    }

    if(!env.MONGO_URI) {
        throw new Error('Mongo URI is not found in env')
    }
}