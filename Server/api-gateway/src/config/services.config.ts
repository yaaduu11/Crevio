import { env } from "./env-validator.config"

export const services = [
    {
        route: "/auth",
        target: env.AUTH
    },
    {
        route: "/payment",
        target: env.PAYMENT
    },
    {
        route: "/chatbot",
        target: env.CHATBOT
    }
]