import dotenv from 'dotenv';
dotenv.config()

import express, {Application} from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import { env } from './config/env.config';
import { envValidator } from './utils/env-validator.util';
import userRoute from './routes/user.router'
import adminRoute from './routes/admin.router'


class App {
    public app: Application;

    constructor() {
        envValidator()

        this.app = express()

        this.initializeMiddlewares()
        this.initializeRoutes()
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(cookieParser())
        this.app.use(morgan('short'))
    }

    private initializeRoutes(): void {
        this.app.use('/', userRoute)
        this.app.use('admin', adminRoute)
    }

    public listen(): void {
        this.app.listen(env.PORT, ()=> {
            console.log(`chatbot running on ${env.PORT}`);
        })
    }
}

const app = new App()
app.listen()