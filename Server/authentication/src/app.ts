import dotenv from 'dotenv'
dotenv.config()

import express, {Application} from 'express'
import { env } from './config/env';

import connectDB from './config/database';
import userRouter from './routes/UserRoute';

class App {
    public app: Application;

    constructor() {
        this.app = express()

        this.middlewares()
        this.initializeDB()
        this.routes()
    }

    private middlewares(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
    }

    private initializeDB(): void {
        connectDB()
    }

    private routes(): void {
        this.app.use('/',userRouter)
    }

    public listen(): void {
        this.app.listen(env.PORT, ()=>{
            console.log(`Server running on http://localhost:${env.PORT}`)
        })
    }
}

const app = new App()
app.listen()