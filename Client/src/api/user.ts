import Api from "../services/axios";
import { userEndPoints } from "../constants/endpointUrl";
import { UserSignupFormType,UserType } from "../types/userTypes";

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

export const assignRole = async(role:string, email:string) => {
    try {
        await Api.patch(userEndPoints.ASSIGN_ROLE, {role, email}, {headers})
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

export const googleAuth = async (user: Omit<UserSignupFormType, "password"> & {profilePicture?: string;}) => {
    try {
      const { data } = await Api.post(userEndPoints.GOOGLE_AUTH,{user,},{ headers });      
      return { success: true, data } as any

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
        const {data} = await Api.patch(userEndPoints.NEW_PASSWORD, {password, email}, {headers})
        return {success: true, data}
    } catch (error) {
        const err =error as any
        const message = err.message?.data?.error || 'Something went wrong.'
        return {success:false, error: message, data: {}}
    }
}

export const changeProfile = async (formData: FormData) => {
    try {
        const { data } = await Api.post(userEndPoints.CHANGE_PROFILE, formData, {
            headers: {
                ...headers,
                "Content-Type": "multipart/form-data",
            },
        });
        return { success: true, data };
    } catch (error) {
        const err = error as any;
        const message = err.response?.data?.error || "Something went wrong.";
        return { success: false, error: message, data: {} };
    }
};

export const getProfileImage = async() => {
    try {
        const {data} = await Api.get(userEndPoints.GET_PROFILE_IMAGE, {headers})
        return {success:true, data} as any
    } catch (error) {
        const err = error as any
        const message = err.response?.data?.error || "Something went wrong."
        return {success: false, error: message, data: {}}
    }
}

export const editUserName = async(name: string) => {
    try {
        const {data} = await Api.patch(userEndPoints.EDIT_USER_NAME, {name}, {headers})
        return {success: true, data}
    } catch (error) {
        const err = error as any
        const message = err.response?.data?.error || "Something went wrong."
        return {success: false, error: message, data: {}}
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





