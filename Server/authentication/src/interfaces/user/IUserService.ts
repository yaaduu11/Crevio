import { UserType } from "../../types/Type";

export interface IUserService { 
    register(user: UserType): Promise<string>;
    verifyOtp(otp: string, email: string) : Promise<{accessToken:string, refreshToken:string, user: UserType}>;
}