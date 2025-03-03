import { GoogleAuthUserType, SigninResponse, UserType } from "../../types/Type";

export interface IUserService { 
    register(user: UserType): Promise<string>;
    verifyOtp(otp: string, email: string) : Promise<{accessToken:string, refreshToken:string, user: UserType}>;
    resendOtp(email: string): Promise<void>
    assignRole(role:string, email:string) : Promise<{userRole:string}> ;
    login(email:string, password:string) : Promise<{accessToken: string, refreshToken: string, user:UserType}>;
    googleAuth(user: GoogleAuthUserType): Promise<SigninResponse>;
    forgotPassword(email: string): Promise<void>;
    verifyOtpFp(otp: string, email:string): Promise<{user:UserType}>;
    newPassword(password:string, email:string): Promise<{user:UserType}>
    refreshToken(token: string): Promise<string>;
}