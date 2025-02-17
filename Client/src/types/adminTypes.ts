interface SigninResponse {
    accessToken: string;
}

type SigninResult = { success: true; data: SigninResponse } | { success: false; error: string; data:{} }

type GetFreelancers = {success:true; data:[]} | {success:false; error:string; data:{}}

type UserTypes = {
    _id: string; 
    name: string;
    email: string;
    role: "freelancer" | "client" | "admin" | "none";
    isBlocked: boolean;
    subscriptionType: "basic" | "standad" | "extended" | "none";
    createdAt?: Date;
    updatedAt?: Date;
}
  

export type {SigninResponse, SigninResult, GetFreelancers, UserTypes}