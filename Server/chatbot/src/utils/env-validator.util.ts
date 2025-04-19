import { env } from "../config/env.config";

export function envValidator() {
    if(!env.PORT) {
        throw new Error('PORT is not found in env')
    }
}