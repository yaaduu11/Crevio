import { Request, Response, NextFunction, request } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { httpStatusCodes } from "../../constants/statusCodes";
import { IAdminController } from "../../interfaces/admin/IAdminController";
import { IAdminService } from "../../interfaces/admin/IAdminService";
import { generateHttpError } from "../../utils/httpError";
import { Messages } from "../../constants/messages";

export class AdminController implements IAdminController {
    constructor(private adminService: IAdminService) {}

    signin(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response):Promise<void> => {
            const {email, password} = req.body
            const {accessToken, refreshToken, admin} = await this.adminService.signin(email, password)

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(httpStatusCodes.OK).json({sucess:true, accessToken, admin})
        })(req,res,next)
    }

    getFreelancers(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response):Promise<void> => {
            const payload = JSON.parse(req.headers['x-user-payload'] as string); 

            const {freelancers} = await this.adminService.getFreelancers(payload.userId)
            res.status(httpStatusCodes.OK).json({freelancers})
        })(req,res,next)
    }

    getClients(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response): Promise<void> => {
            const payload = JSON.parse(req.headers['x-user-payload'] as string)
            const {clients} = await this.adminService.getClients(payload.userId)
            res.status(httpStatusCodes.OK).json({clients})
        })(req,res, next)
    }

    clientBlockUnblock(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {userId} = req.body
            await this.adminService.clientBlockUnblock(userId)
            res.status(httpStatusCodes.OK).json({success:true})
        })(req, res, next)
    }

    freelancerBlockUnblock(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {userId} = req.body
            await this.adminService.freelancerBlockUnblock(userId)
            res.status(httpStatusCodes.OK).json({success:true})
        })(req, res, next)
    }

    logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response): Promise<void> => {
            
            await res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });
            
            res.status(httpStatusCodes.OK).json({})
        })(req,res,next)
    }

    
}