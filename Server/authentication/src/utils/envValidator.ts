import { env } from "../config/env";

export default function envValidator() {
    if(!env.PORT){
        throw new Error('PORT is not found in env')
    }
}