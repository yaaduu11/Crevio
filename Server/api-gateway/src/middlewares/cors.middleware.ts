import cors from 'cors'
import { env } from '../config'

const acceptedOrigins = [env.CLIENT_PORT]

function originCheck(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || acceptedOrigins.includes(origin as string)) {
        callback(null, true);
    } else {
        callback(new Error("Permission Denied"));
    }
}

export const corsMiddleware = cors({
    origin: originCheck,
    credentials: true
})