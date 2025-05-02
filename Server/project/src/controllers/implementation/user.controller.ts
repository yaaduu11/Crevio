import { Request, Response, NextFunction } from "express";
import { IUserService } from "../../services/interface/user-service.interface";
import { IUserController } from "../interface/user-controller.interface";
import { asyncHandler } from "../../utils/async-handler.util";
import { httpStatusCodes } from "../../constants";

export class UserController implements IUserController {
    constructor(private _userService: IUserService) {}

    addProject(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const formData = req.body;
            const thumbnail = req.file
            const {userId} = JSON.parse(req.headers['x-user-payload'] as string)
            
            const createdProject = await this._userService.addProject(formData, thumbnail, userId);
            console.log('sucesss');
            
            res.status(httpStatusCodes.OK).json({ project: createdProject });
        })(req, res, next);
    }
}