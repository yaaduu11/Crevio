import express from 'express'
import dotenv from "dotenv"
import morgan from 'morgan'
import { env, envValidator } from './config/envValidator'
import { corsMiddleware } from './middlewares/cors'
import { setupProxies } from './middlewares/proxy'
import authMiddleware from './middlewares/authMiddleware'

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