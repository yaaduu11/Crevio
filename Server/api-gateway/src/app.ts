import express from 'express'
import dotenv from "dotenv"
import morgan from 'morgan'
import { env, envValidator } from './config'
import { authMiddleware, corsMiddleware, setupProxies } from './middlewares'

dotenv.config()
envValidator()

const app = express()

app.use(corsMiddleware)

app.use((req, res, next)=> {
    authMiddleware(req, res, next)
})

app.use(morgan('short'))

setupProxies(app)

app.listen(env.PORT, ()=> console.log(`api-gateway running on ${env.PORT}`))