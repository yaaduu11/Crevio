import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ObjectId } from 'mongoose';

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

export const verifyToken = (token: string) => {
    try {
      const decoded = jwt.verify(
        token,
        env.JWT_ACCESS_TOKEN_SECRET as string
      ) as { userId: string };
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      throw error;
    }
};