import { Request, Response, NextFunction } from "express";

export interface IAdminController {
    signin(req: Request, res: Response, next: NextFunction) : Promise<void>;
    getFreelancers(req: Request, res: Response, next: NextFunction): Promise<void>;
    getClients(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(req:Request, res:Response, next:NextFunction): Promise<void>;
}