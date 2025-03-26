import { Request, Response, NextFunction } from "express";

export interface IUserController {
    createCheckoutSession(req: Request, res: Response, next: NextFunction): Promise<void>;
    handleWebhook(req: Request, res: Response, next: NextFunction): Promise<void>;
    checkUserSubscribed(req: Request, res: Response, next: NextFunction): Promise<void>;
}