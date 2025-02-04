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
        const message = err.respose?.data?.err || "Something went wrong"
        return { success:false, err:message, data:{} };
    }
};

export const verifyOtp = async(otp:string, email:string) => {
    try {
        const { data } = await Api.post(userEndPoints.VERIFY_OTP, {otp, email}, { headers })
        return {success:true, data } as any
    } catch (error) {
        const err = error as any
        const message = err.respose?.data?.err || "Something went wrong"
        return { success:false, err:message, data:{} };
    }
}

export const login = async(email:string, password:string) => {
    try {
        const {data} = await Api.post(userEndPoints.SIGNIN, {email, password}, {headers})
        return {success:true, data} as any
    } catch (error) {
        const err = error as any
        const message = err.respose?.data?.err || "Something went wrong"
        return { success:false, err:message, data:{} };
    }
}