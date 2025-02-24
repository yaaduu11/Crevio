import Api from "../services/axios";
import { userEndPoints } from "../constants/endpointUrl";
import { UserSignupFormType } from "../types/userTypes";

const headers= {
    'X-User-Level': 'user'
}

export const signup = async (userData: UserSignupFormType) => {
    try {
        const { data } = await Api.post(userEndPoints.SIGNUP, userData, { headers })
        return { success: true, data} as any;
    } catch (error) {
        const err = error as any
        const message = err.response?.data?.error || "Something went wrowng"
        return { success:false, error:message, data:{} };
    }
};

export const verifyOtp = async(otp:string, email:string) => {
    try {
        const { data } = await Api.post(userEndPoints.VERIFY_OTP, {otp, email}, { headers })
        return {success:true, data } as any
    } catch (error:any) {
        const err = error as any;
        const message = err.response?.data?.error || "Something went wrong";
        return { success: false, error: message, data: {} };
    }
}

export const resendOtp = async(email: string) => {
    try {
        await Api.post(userEndPoints.RESEND_OTP, {email}, {headers})
        return {success:true}
    } catch (error) {
        const err = error as any;
        const message = err.response?.data?.error || "Something went wrong";
        return { success: false, error: message, data: {} };
    }
}

export const checkUserRole = async(email: string)=> {
    try {
        const {data} = await Api.get<boolean>(userEndPoints.CHECK_ROLE, {params: {email}})
        return {success:true, data}
    } catch (error) {
        const err = error as any;
        const message = err.response?.data?.error || "Something went wrong";
        return { success: false, error: message, data: {} };
    }
}

export const assignRole = async(role:string, token: string) => {
    try {
        await Api.patch(userEndPoints.ASSIGN_ROLE, {role, token})
        return {success: true}
    } catch (error) {
        const err = error as any
        const message = err.response?.data?.error || "Something went wrong"
        return { success:false, error:message, data:{} };
    }
}

export const login = async(email:string, password:string) => {
    try {
        const {data} = await Api.post(userEndPoints.SIGNIN, {email, password}, {headers})
        return {success:true, data} as any
    } catch (error) {
        const err = error as any
        const message = err.response?.data?.error || "Something went wrong"
        return { success:false, error:message, data:{} };
    }
}

export const googleAuth = async (user: Omit<UserSignupFormType, "password" | "confirmPassword"> & {profilePicture?: string;}) => {
    try {
      const { data } = await Api.post(userEndPoints.GOOGLE_AUTH,{user,},{ headers });
      return { success: true, data };
    } catch (error) {
        const err = error as any
        const message = err.response?.data?.error || "Something went wrong"
        return { success:false, error:message, data:{} };
    }
};

export const forgotPassword = async(email:string) => {
    try {
        await Api.post(userEndPoints.FORGOT_PASSWORD, {email}, {headers})
        return {success:true}
    } catch (error) {
        const err = error as any;
        const message = err.response?.data?.error  || "Something went wrong"        
        return { success:false, error:message, data:{} };
    }
}

export const verifyOtpFP = async(otp:string, email:string) => {
    try {
        const { data } = await Api.post(userEndPoints.VERIFY_OTP_FP, {otp, email}, { headers })        
        return {success:true, data }
    } catch (error) {
        const err = error as any;
        const message = err.response?.data?.error || "Something went wrong";
        return { success: false, error: message, data: {} };
    }
}

export const newPassword = async(password: string, email:string) => {
    try {
        const {data} = await Api.post(userEndPoints.NEW_PASSWORD, {password, email})
        return {success: true, data}
    } catch (error) {
        const err =error as any
        const message = err.message?.data?.error || 'Something went wrong.'
        return {success:false, error: message, data: {}}
    }
}

export const userLogout = async() =>{
    try {
        await Api.delete(userEndPoints.LOGOUT, {headers})
        return {success:true}
    } catch (error) {
        const err = error as any
        const message = err.respose?.data?.error || "Something went wrong"
        return { success:false, error:message };
    }
}