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
            const {accessToken, refreshToken} = await this.adminService.signin(email, password)

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(httpStatusCodes.OK).json({sucess:true, accessToken})
        })(req,res,next)
    }

    getFreelancers(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response):Promise<void> => {
            const authHeader = req.headers.authorization            
            if(!authHeader) {
                throw generateHttpError(httpStatusCodes.UNAUTHORIZED, Messages.NO_TOKEN_PROVIDED)
            }

            const token = authHeader.split(" ")[1]
            const {freelancers} = await this.adminService.getFreelancers(token)
            res.status(httpStatusCodes.OK).json({freelancers})
        })(req,res,next)
    }

    getClients(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response): Promise<void> => {
            const authHeader = req.headers.authorization
            if(!authHeader) {
                throw generateHttpError(httpStatusCodes.UNAUTHORIZED, Messages.NO_TOKEN_PROVIDED)
            }

            const token = authHeader.split(' ')[1]
            const {clients} = await this.adminService.getClients(token)
            res.status(httpStatusCodes.OK).json({clients})
        })(req,res, next)
    }

    logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response): Promise<void> => {
            console.log('request got in controller');
            
            await res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });
            
            console.log('deleted in controller');
            res.status(httpStatusCodes.OK).json({})
        })(req,res,next)
    }

    
}