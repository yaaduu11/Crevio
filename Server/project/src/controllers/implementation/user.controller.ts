import { Request, Response, NextFunction } from "express";
import { IUserService } from "../../services/interface/user-service.interface";
import { IUserController } from "../interface/user-controller.interface";
import { asyncHandler } from "../../utils/async-handler.util";

export class UserController implements IUserController {
    constructor(private userService: IUserService) {}

    addProject(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {formData} = req.body;
        })(req, res, next)
    }
}