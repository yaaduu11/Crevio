import express from 'express'
import dotenv from "dotenv"
import { createProxyMiddleware } from 'http-proxy-middleware'
import morgan from 'morgan'
import cors from 'cors'
import { env, envValidator } from './config/envValidator'

dotenv.config()

const app = express()

const services = [
    {
        route: "/auth",
        target: env.AUTH
    }
]

const acceptedOrigins = ['https://localhost:5173']

function originCheck(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if(acceptedOrigins.includes(origin as string)) {
        callback(null, true)
    }else{
        callback(new Error("Permission Denied"))
    }
}

app.use(
    cors({
        origin: originCheck,
        credentials: true
    })
)

app.use(morgan('combined'))

services.forEach((service)=>{
    app.use(
        service.route,
        createProxyMiddleware({
            target: service.target,
            changeOrigin: true
        })
    )
})

app.listen(env.PORT, ()=> console.log(`api-gateway running on ${env.PORT}`))