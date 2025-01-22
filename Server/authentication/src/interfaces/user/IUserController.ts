import { Request, Response } from "express";

export interface IUserController {
    register(req: Request, res: Response) : Promise<void>;
}