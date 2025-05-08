import { Request, Response, NextFunction } from "express";

export interface IUserController {
    addProject(req: Request, res: Response, next: NextFunction): Promise<void>;
    allProjects(req: Request, res: Response, next: NextFunction): Promise<void>;
    allProjectsById(req: Request, res: Response, next: NextFunction): Promise<void>;
    applyToProject(req: Request, res: Response, next: NextFunction): Promise<void>;
}