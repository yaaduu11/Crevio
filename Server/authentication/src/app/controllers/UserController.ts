import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { httpStatusCodes } from "../../constants/statusCodes";
import { IUserController } from "../../interfaces/user/IUserController";
import { IUserService } from "../../interfaces/user/IUserService";

export class UserController implements IUserController{
    constructor(private userService: IUserService) {}

    register(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const email = await this.userService.register(req.body);
            res.status(httpStatusCodes.OK).json({ email });
        })(req, res, next); 
    }

    
}