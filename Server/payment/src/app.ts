import dotenv from 'dotenv'
dotenv.config()

import express, {Application} from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { env } from './config/env'
import envValidator from './utils/envValidator'

import connectDB from './config/mongodb'
import userRouter from './app/routes/UserRoute'
import adminRouter from './app/routes/AdminRoute'


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