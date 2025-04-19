import { Request, Response, NextFunction } from "express";

export interface IUserController {
    handleUserMessage(req: Request, res: Response, next: NextFunction): Promise<void>;
} 