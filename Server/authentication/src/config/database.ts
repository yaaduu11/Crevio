import mongoose from "mongoose";

export default function connectDB() {
    mongoose.connect('mongodb://localhost:27017/authService')
        .then(()=>console.log('Mongo connected'))
        .catch((err)=>console.log('Mongo connection failed', err))
}