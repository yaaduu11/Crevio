import { Request, Response, NextFunction } from "express";

export interface IUserController {
    addProject(req: Request, res: Response, next: NextFunction): Promise<void>;

}