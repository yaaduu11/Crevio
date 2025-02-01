import { env } from "./envValidator"

export const services = [
    {
        route: "/auth",
        target: 'http://localhost:3001'
    }
]