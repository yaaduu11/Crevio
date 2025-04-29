import { Request, Response, NextFunction, request } from "express";
import { asyncHandler, sendResponse} from "../../utils";
import { httpStatusCodes } from "../../constants";
import { IAdminController } from "../interface/admin-controller.interface";
import { IAdminService } from "../../services/interface/admin-service.interface";

export class AdminController implements IAdminController {
    constructor(private _adminService: IAdminService) {}

    signin(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response):Promise<void> => {
            const {email, password} = req.body
            const {accessToken, refreshToken, admin} = await this._adminService.signin(email, password)

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            sendResponse(res, httpStatusCodes.OK, true, {accessToken, admin})
        })(req,res,next)
    }

    getFreelancers(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response):Promise<void> => {
            const payload = JSON.parse(req.headers['x-user-payload'] as string); 

            const {freelancers} = await this._adminService.getFreelancers(payload.userId)
            sendResponse(res, httpStatusCodes.OK, true, {freelancers})
        })(req,res,next)
    }

    getMoreInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const userId = req.query.userId as string;
            const {userDetails} = await this._adminService.getMoreInfo(userId)
            console.log('success');


            sendResponse(res, httpStatusCodes.OK, true, {userDetails})
        })(req, res, next)
    }

    getClients(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response): Promise<void> => {
            const payload = JSON.parse(req.headers['x-user-payload'] as string)
            const {clients} = await this._adminService.getClients(payload.userId)
            sendResponse(res, httpStatusCodes.OK, true, {clients})
        })(req,res, next)
    }

    clientBlockUnblock(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {userId} = req.body
            await this._adminService.clientBlockUnblock(userId)
            sendResponse(res, httpStatusCodes.OK, true)
        })(req, res, next)
    }

    freelancerBlockUnblock(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {userId} = req.body
            await this._adminService.freelancerBlockUnblock(userId)
            sendResponse(res, httpStatusCodes.OK, true)
        })(req, res, next)
    }

    logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response): Promise<void> => {
            
            await res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });
            sendResponse(res, httpStatusCodes.OK, true)
        })(req,res,next)
    }
}