import dotenv from 'dotenv';
dotenv.config()

import express, {Application} from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from './config';

import { connectDB } from './config';
import { envValidator } from './utils';
import userRouter from './routes/user.router'


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
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(cookieParser())
        this.app.use(morgan('short'))
    }

    private initializeRoutes(): void {
        this.app.use('/', userRouter)
    }

    private initializeDB(): void {
        connectDB()
    }

    public listen(): void {
        this.app.listen(env.PORT, () => {
            console.log(`project running on ${env.PORT}`);
        })
    }
}

const app = new App()
app.listen()