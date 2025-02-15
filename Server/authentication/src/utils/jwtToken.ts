import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ObjectId } from 'mongoose';
import { generateHttpError } from './httpError';
import { httpStatusCodes } from '../constants/statusCodes';
import { Messages } from '../constants/messages';

export const generateRefreshToken =(userId : ObjectId)=> {
    return jwt.sign(
        {userId},
        env.JWT_REFRESH_TOKEN_SECRET as string,
        {expiresIn: '7d'}
    )
} 

export const generateAccessToken=(userId : ObjectId)=>{
    return jwt.sign(
        {userId},
        env.JWT_ACCESS_TOKEN_SECRET as string,
        {expiresIn: '3m'}
    )
}

export const decodeAccessToken=(token: string) => {
    let decoded = jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET as string) as { id: string };
    return decoded
}