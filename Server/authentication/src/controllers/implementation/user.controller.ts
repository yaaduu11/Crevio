import { NextFunction, Request, Response } from "express";
import { env, redisClient } from "../../config"
import { httpStatusCodes, Messages } from "../../constants";
import { GoogleAuthUserType } from "../../types";
import { asyncHandler, sendResponse } from "../../utils"
import { IUserController } from "../interface/user-controller.interface";
import { IUserService } from "../../services/interface/user-service.interface";
import jwt from "jsonwebtoken";

export class UserController implements IUserController{
    constructor(private _userService: IUserService) {}

    register(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const email = await this._userService.register(req.body);
            sendResponse(res, httpStatusCodes.OK, true, {email})
        })(req, res, next);
    }

    verifyOtp(req: Request, res:Response, next: NextFunction): Promise<void> {
        return asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const {otp, email} = req.body
            const {accessToken, refreshToken, user} = await this._userService.verifyOtp(otp, email)

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true, 
                secure: true,
                sameSite: "strict", 
                maxAge: 7 * 24 * 60 * 60 * 1000 
            });
            sendResponse(res, httpStatusCodes.OK, true, {accessToken, user})
        })(req, res, next); 
    }

    resendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {email} = req.body

            if (!email) {
                res.status(httpStatusCodes.BAD_REQUEST).json({ error: Messages.INCOMPLETE_FORM });
                return;
            }

            await this._userService.resendOtp(email)
            sendResponse(res, httpStatusCodes.OK, true)
        })(req,res,next)
    }

    assignRole(req: Request, res:Response, next: NextFunction): Promise<void> {
        return asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const {role, email} = req.body;
            const {userRole} = await this._userService.assignRole(role, email)

            sendResponse(res, httpStatusCodes.OK, true, {userRole})
        })(req, res, next);
    }

    login(req: Request, res:Response, next: NextFunction): Promise<void> {
        return asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const {email, password} = req.body
            const {accessToken, refreshToken, user} = await this._userService.login(email, password)

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true, 
                secure: true,
                sameSite: "strict", 
                maxAge: 7 * 24 * 60 * 60 * 1000 
            });
            sendResponse(res, httpStatusCodes.OK, true, {accessToken, user})
        })(req, res, next); 
    }

    googleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res: Response):Promise<void> => {
            const {...userData} = req.body.user;            
            const {accessToken, refreshToken, user} = await this._userService.googleAuth(userData as GoogleAuthUserType)

            res.cookie("refreshToken", refreshToken, {
                httpOnly:true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })

            sendResponse(res, httpStatusCodes.OK, true, {accessToken, user})
        })(req, res, next)
    }

    forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res: Response): Promise<void> => {
            const {email} = req.body
            await this._userService.forgotPassword(email)

            sendResponse(res, httpStatusCodes.OK, true)
        })(req, res, next)
    }

    verifyOtpFP(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {otp, email} = req.body
            const {user} = await this._userService.verifyOtpFp(otp, email)

            sendResponse(res, httpStatusCodes.OK, true, {user})
        })(req, res, next)
    }

    newPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response): Promise<void> => {
            const {password, email} = req.body
            const {user} = await this._userService.newPassword(password, email)

            sendResponse(res, httpStatusCodes.OK, true, {user})
        })(req, res, next)
    }

    refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const refreshToken = req.cookies.refreshToken
            if(!refreshToken){
                res.status(httpStatusCodes.FORBIDDEN).json({error: Messages.TOKEN_EMPTY})
                return;
            }
            const accessToken = await this._userService.refreshToken(refreshToken)

            sendResponse(res, httpStatusCodes.OK, true, {accessToken})
        })(req, res, next)
    }

    updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response): Promise<void> => {
            const { userId } = JSON.parse(req.headers['x-user-payload'] as string);
            const profileImage = req.file
            const {user} = await this._userService.updateProfile(userId, profileImage)

            sendResponse(res, httpStatusCodes.OK, true, {user})
        })(req, res, next)
    }

    getProfileImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const { userId } = JSON.parse(req.headers['x-user-payload'] as string);
            const {user} = await this._userService.getProfileImage(userId)
            
            sendResponse(res, httpStatusCodes.OK, true, {user})
        })(req, res, next)
    }

    editUserName(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response): Promise<void> => {
            const {name} = req.body
            const {userId} = JSON.parse(req.headers['x-user-payload'] as string)
            const {userName} = await this._userService.editUserName(userId, name)

            sendResponse(res, httpStatusCodes.OK, true, {userName})
        })(req, res, next)
    }

    addMoreInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {userData} = req.body
            const {userId} = JSON.parse(req.headers['x-user-payload'] as string)
            const {userDetails} = await this._userService.addMoreInfo(userId, userData)

            sendResponse(res, httpStatusCodes.OK, true, {userDetails})
        })(req, res, next)
    }

    updateMoreInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {userData} = req.body
            const {userId} = JSON.parse(req.headers['x-user-payload'] as string)
            const {userDetails} = await this._userService.updateMoreInfo(userId, userData)

            sendResponse(res, httpStatusCodes.OK, true, {userDetails})
        })(req, res, next)
    }

    getMoreInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {userId} = JSON.parse(req.headers['x-user-payload'] as string)
            const {userDetails} = await this._userService.getMoreInfo(userId)

            sendResponse(res, httpStatusCodes.OK, true, {userDetails})
        })(req, res, next)
    }

    getUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {            
            const {userId} = JSON.parse(req.headers['x-user-payload'] as string)
            const {user} = await this._userService.getUserData(userId)
            
            sendResponse(res, httpStatusCodes.OK, true, {user})
        })(req, res, next)
    }

    updateUserSubStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {            
            const {planName} = req.body
            const {userId} = JSON.parse(req.headers['x-user-payload'] as string)
            await this._userService.updateUserSubStatus(userId, planName)

            sendResponse(res, httpStatusCodes.OK, true)
        })(req, res, next)
    }

    logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res:Response): Promise<void> => {      
            const refreshToken = req.cookies?.refreshToken;
        
            if (refreshToken) {
                const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_TOKEN_SECRET as string) as { userId: string };
                if (decoded?.userId) {
                    await redisClient.del(decoded.userId);
                }
            }

            await res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });

            sendResponse(res, httpStatusCodes.OK, true)
        })(req,res,next)
    }
}