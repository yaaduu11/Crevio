import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const generateRefreshToken =(userId:any)=> {
    return jwt.sign(
        {userId},
        env.JWT_REFRESH_TOKEN_SECRET as string,
        {expiresIn: '7d'}
    )
} 

export const generateAccessToken=(userId:any)=>{
    return jwt.sign(
        {userId},
        env.JWT_ACCESS_TOKEN_SECRET as string,
        {expiresIn: '3m'}
    )
}