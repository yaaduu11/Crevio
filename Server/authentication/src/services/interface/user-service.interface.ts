import { FileType, GoogleAuthUserType, IFreelancerDetail, SigninResponse, UserType } from "../../types";

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
    updateProfile(id: string, profileImage: FileType | undefined): Promise<{user: UserType}>;
    getProfileImage(userId: string): Promise<{user: UserType}>;
    editUserName(userId:string, name: string): Promise<{ userName: string}>
    refreshToken(token: string): Promise<string>;
    addMoreInfo(userId: string, userData: Partial<IFreelancerDetail>): Promise<{userDetails: Partial<IFreelancerDetail>}>
    updateMoreInfo(userId: string, userData: Partial<IFreelancerDetail>): Promise<{userDetails: Partial<IFreelancerDetail>}>
    getMoreInfo(userId: string): Promise<{userDetails:IFreelancerDetail}>
}