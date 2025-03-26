import Jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env, initializeRedisClient } from "../config";
import { isPublic } from "../utils/publicRoutes.util";

const redisClient = initializeRedisClient();

export async function authMiddleware(req:Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
        if(isPublic(req)) {
            return next()
        }
        
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({error: 'No token provided.'})
        }

        const token = authHeader.split(' ')[1]
        if(!token) {
            return res.status(401).json({error: 'No token provided.'})
        }

        const payload = Jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET as string) as { userId: string };
        req.headers["x-user-payload"] = JSON.stringify(payload);

        const { userId } = payload;

        const isBlocked = await redisClient.get(userId);
        if (isBlocked) {
            return res.status(403).json({ error: "You are blocked from Crevio." });
        }

        next()
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            console.error("Token has expired");
            return res.status(401).json({error:'Token has expired'});
        } else if (error instanceof JsonWebTokenError) {
            console.error("Invalid token");
            return res.status(401).json({error:'Invalid token'});

        } else {
            console.error(error);
            return res.status(500).json({error:'Something went wrong'});
        }
    }
}