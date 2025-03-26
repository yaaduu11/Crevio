import { Request, Response, NextFunction } from "express";

export interface IUserController {
    register(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
    resendOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
    assignRole(req: Request, res: Response, next: NextFunction): Promise<void>;
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    googleAuth(req: Request, res: Response, next: NextFunction): Promise<void>;
    forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyOtpFP(req: Request, res: Response, next: NextFunction): Promise<void>;
    newPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
    refreshToken(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
    getProfileImage(req: Request, res: Response, next: NextFunction): Promise<void>;
    editUserName(req: Request, res: Response, next: NextFunction): Promise<void>;
    addMoreInfo(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateMoreInfo(req: Request, res: Response, next: NextFunction): Promise<void>;
    getMoreInfo(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserData(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateUserSubStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(req:Request, res:Response, next:NextFunction): Promise<void>;
}