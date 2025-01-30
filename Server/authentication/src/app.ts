import dotenv from 'dotenv'
dotenv.config()

import express, {Application} from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import envValidator from './utils/envValidator';

import connectDB from './config/database';
import { initializeRedisClient } from './config/redis';
import userRouter from './app/routes/UserRoute';

class App {
    public app: Application;

    constructor() {
        envValidator()

        this.app = express()

        this.initializeMiddlewares()
        this.initializeDB()
        this.initializeRoutes()
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cookieParser())
        this.app.use(morgan('combined'))
    }

    private initializeRoutes(): void {
        this.app.use('/',userRouter)
    }

    private initializeDB(): void {
        connectDB()
        initializeRedisClient()
    }

    public listen(): void {
        this.app.listen(env.PORT, ()=>{
            console.log(`Server running on http://localhost:${env.PORT}`)
        })
    }
}

const app = new App()
app.listen()