import { GoogleAuthUserType, SigninResponse, UserType } from "../../types/Type";

export interface IUserService { 
    register(user: UserType): Promise<string>;
    verifyOtp(otp: string, email: string) : Promise<{accessToken:string, refreshToken:string, user: UserType}>;
    resendOtp(email: string): Promise<void>
    assignRole(role: string, token:string) : Promise<{userRole:string}> ;
    checkUserRole(email: string): Promise<{isNone:boolean}>;
    login(email:string, password:string) : Promise<{accessToken: string, refreshToken: string, user:UserType}>;
    googleAuth(user: GoogleAuthUserType): Promise<SigninResponse>;
}