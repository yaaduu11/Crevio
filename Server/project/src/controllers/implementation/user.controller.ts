import { Request, Response, NextFunction, request } from 'express';
import { IUserService } from "../../services/interface/user-service.interface";
import { IUserController } from "../interface/user-controller.interface";
import { asyncHandler } from "../../utils/async-handler.util";
import { httpStatusCodes } from "../../constants";
import { ApplyFileType } from '../../types';

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
            const {projectId, coverLetter, ai_rating} = req.body
            const resume = req.file
            const {userId} = JSON.parse(req.headers['x-user-payload'] as string)

            console.log(projectId, userId, ai_rating);
            
            const data : ApplyFileType= {
                userId,
                projectId,
                coverLetter,
                resume,
                ai_rating
            }
            console.log(data)

            await this._userService.applyToProject(data)

            res.status(httpStatusCodes.OK).json({success: true})
            console.log('ayachit undeda');
            
        })(req, res, next)
    }

    getApplicants(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {projectId} = req.body
            // const applicants = await this._userService.getApplicants(projectId as string)

            res.status(httpStatusCodes.OK).json()
        })(req, res, next)
    }
}