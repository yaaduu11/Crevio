import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { httpStatusCodes } from "../../constants/statusCodes";
import { IUserController } from "../../interfaces/user/IUserController";
import { IUserService } from "../../interfaces/user/IUserService";
import { GoogleAuthUserType } from "../../types/Type";
import { Messages } from "../../constants/messages";

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

    resendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {email} = req.body

            if (!email) {
                res.status(httpStatusCodes.BAD_REQUEST).json({ error: Messages.INCOMPLETE_FORM });
                return;
            }

            await this.userService.resendOtp(email)
            res.status(httpStatusCodes.OK).json({ success:true })
        })(req,res,next)
    }

    assignRole(req: Request, res:Response, next: NextFunction): Promise<void> {
        return asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const {role, email} = req.body;
            const {userRole} = await this.userService.assignRole(role, email)

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
            res.status(httpStatusCodes.OK).json({ success:true, accessToken, user });
        })(req, res, next); 
    }

    googleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res: Response):Promise<void> => {
            const {...userData} = req.body.user;            
            const {accessToken, refreshToken, user} = await this.userService.googleAuth(userData as GoogleAuthUserType)

            res.cookie("refreshToken", refreshToken, {
                httpOnly:true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })

            res.status(httpStatusCodes.OK).json({sucess:true, accessToken, user})
        })(req, res, next)
    }

    forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res: Response): Promise<void> => {
            const {email} = req.body
            await this.userService.forgotPassword(email)

            res.status(httpStatusCodes.OK).json({success:true })
        })(req, res, next)
    }

    verifyOtpFP(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {otp, email} = req.body
            const {user} = await this.userService.verifyOtpFp(otp, email)

            res.status(httpStatusCodes.OK).json({success:true, user})
        })(req, res, next)
    }

    newPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response): Promise<void> => {
            const {password, email} = req.body
            const {user} = await this.userService.newPassword(password, email)
            res.status(httpStatusCodes.OK).json({success:true, user})
        })(req, res, next)
    }

    refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const refreshToken = req.cookies.refreshToken
            if(!refreshToken){
                res.status(httpStatusCodes.FORBIDDEN).json({error: Messages.TOKEN_EMPTY})
                return;
            }

            const accessToken = await this.userService.refreshToken(refreshToken)
            res.status(httpStatusCodes.OK).json({accessToken})
        })(req, res, next)
    }

    updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response): Promise<void> => {
            const { userId } = JSON.parse(req.headers['x-user-payload'] as string);
            const profileImage = req.file

            const {user} = await this.userService.updateProfile(userId, profileImage)
            res.status(httpStatusCodes.OK).json({user})
        })(req, res, next)
    }

    getProfileImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const { userId } = JSON.parse(req.headers['x-user-payload'] as string);
            const {user} = await this.userService.getProfileImage(userId)
            res.status(httpStatusCodes.OK).json({user})
        })(req, res, next)
    }

    editUserName(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response): Promise<void> => {
            const {name} = req.body
            const {userId} = JSON.parse(req.headers['x-user-payload'] as string)
            const {userName} = await this.userService.editUserName(userId, name)
            res.status(httpStatusCodes.OK).json({userName})
        })(req, res, next)
    }

    logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response): Promise<void> => {            
            await res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });            
            res.status(httpStatusCodes.OK).json({ success:true })
        })(req,res,next)
    }
}