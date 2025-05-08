import { Request, Response, NextFunction, request } from 'express';
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

    allProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const allProjects = await this._userService.allProjects()

            res.status(httpStatusCodes.OK).json(allProjects)
        })(req, res, next)
    }

    allProjectsById(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const {userId} = JSON.parse(req.headers['x-user-payload'] as string)

            const projects = await this._userService.allProjectsById(userId)

            res.status(httpStatusCodes.OK).json(projects)
        })(req, res, next)
    }

    applyToProject(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {projectId} = req.body
            const {userId} = JSON.parse(req.headers['x-user-payload'] as string)

            console.log(projectId, userId);
            console.log(typeof projectId, typeof userId);
            
            

            await this._userService.applyToProject(userId, projectId)

            res.status(httpStatusCodes.OK).json({success: true})
            console.log('ayachit undeda');
            
        })(req, res, next)
    }


}