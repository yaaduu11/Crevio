import express from 'express'
import dotenv from "dotenv"
import helmet from 'helmet'
import { env, envValidator } from './config'
import { authMiddleware, corsMiddleware, setupProxies } from './middlewares'
import morganLogger from './loggers/morgan.logger'

dotenv.config()
envValidator()

const app = express()

app.use(corsMiddleware)

app.use(morganLogger)

app.use(helmet())

app.use((req, res, next)=> {
    authMiddleware(req, res, next)
})

setupProxies(app)

app.listen(env.PORT, ()=> console.log(`api-gateway running on ${env.PORT}`))