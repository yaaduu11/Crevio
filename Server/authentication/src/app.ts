import dotenv from 'dotenv'
dotenv.config()

import express, {Application} from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { connectDB, initializeRedisClient, env } from './config';
import {envValidator} from './utils';
import morganLogger from './loggers/morgan.logger';

import userRouter from './routes/user.router';
import adminRouter from './routes/admin.router'

import { createUserMappings, createFreelancerMappings } from './mappings'; 

class App {
    public app: Application;

    constructor() {
        envValidator()

        this.app = express()

        this.initializeMappings();
        this.initializeMiddlewares()
        this.initializeDB()
        this.initializeRoutes()
    }

    private initializeMappings(): void {
        createUserMappings();
        createFreelancerMappings()
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cookieParser())
        this.app.use(morganLogger)
    }

    private initializeRoutes(): void {
        this.app.use('/', userRouter)
        this.app.use('/admin', adminRouter)
    }

    private initializeDB(): void {
        connectDB()
        initializeRedisClient()
    }

    public listen(): void {
        this.app.listen(env.PORT, ()=>{
            console.log(`authentication running on ${env.PORT}`)
        })
    }
}
const app = new App()
app.listen()