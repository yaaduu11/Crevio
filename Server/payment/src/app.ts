import dotenv from 'dotenv'
dotenv.config()


declare module "http" {
    interface IncomingMessage {
        rawBody?: Buffer;
    }
}

import express, {Application} from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { env, connectDB } from './config'
import {envValidator} from './utils'

import userRouter from './routes/user.router'
import adminRouter from './routes/admin.router'


class App {
    public app: Application;

    constructor() {
        envValidator()

        this.app = express()

        this.initializeMiddlewares()
        this.initialiseDB()
        this.initialiseRoutes()
    }

    private initializeMiddlewares(): void {
        this.app.use("/pricing/webhook", express.raw({ type: "application/json" }));
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cookieParser())
        this.app.use(morgan('short'))
    }

    private initialiseRoutes(): void {
        this.app.use('/', userRouter)
        this.app.use('/admin', adminRouter)
    }

    private initialiseDB(): void {
        connectDB()
    }

    public listen(): void {
        this.app.listen(env.PORT, ()=> {
            console.log(`payment running on ${env.PORT}`)
        })
    }
}

const app = new App()
app.listen()