import { Request, Response, NextFunction } from "express";

export interface IAdminController {
    getAllPlans(req: Request, res: Response, next: NextFunction): Promise<void>;
    createPlan(req: Request, res: Response, next: NextFunction): Promise<void>; 
}