import { env } from "./envValidator"

export const services = [
    {
        route: "/auth",
        target: env.AUTH
    }
]