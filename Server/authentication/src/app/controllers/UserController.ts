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

    verifyOtp(req: Request, res:Response, next: NextFunction): Promise<void> {
        return asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const {otp, email} = req.body
            const {accessToken, refreshToken, user} = await this.userService.verifyOtp(otp, email)

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true, 
                secure: true,
                sameSite: "strict", 
                maxAge: 7 * 24 * 60 * 60 * 1000 
            });

            res.status(httpStatusCodes.OK).json({ success:true, accessToken, user });
        })(req, res, next); 
    }

    assignRole(req: Request, res:Response, next: NextFunction): Promise<void> {
        return asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const {role, token} = req.body;
            console.log('currently in assignRolessssss', role);
            const {userRole} = await this.userService.assignRole(role, token)
            console.log('currently in assignRolessssss', userRole);
            res.status(httpStatusCodes.OK).json({success:true, userRole});
        })(req, res, next);
    }

    login(req: Request, res:Response, next: NextFunction): Promise<void> {
        return asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const {email, password} = req.body
            const {accessToken, refreshToken, user} = await this.userService.login(email, password)

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true, 
                secure: true,
                sameSite: "strict", 
                maxAge: 7 * 24 * 60 * 60 * 1000 
            });
            console.log(accessToken);
            res.status(httpStatusCodes.OK).json({ success:true, accessToken, user });
        })(req, res, next); 
    }
}