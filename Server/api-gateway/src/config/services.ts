import { env } from "./envValidator"

export const services = [
    {
        route: "/auth",
        target: env.AUTH
    },
    {
        route: "/payment",
        target: env.PAYMENT
    }
]