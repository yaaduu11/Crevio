import Api from "../services/axios";
import { userEndPoints } from "../constants/endpointUrl";
import { IFreelancerDetail, UserSignupFormType, ProjectType } from "../types/user.type";
import { ObjectId } from "mongoose";
import axios from 'axios';

const headers= {
    'X-User-Level': 'user'
}

interface GeminiResponse {
    candidates?: {
      content?: {
        parts?: { text: string }[];
      };
    }[];
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

export const fetchUserData = async() => {
    try {
        const {data} = await Api.get(userEndPoints.FETCH_USER_DATA, {headers})
        return {success: true, data} as any
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
        return { success: true, data } as any
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




export const handleCheckout = async (planId: ObjectId | undefined, amount: number, userId: string) => {
    try {
      const {data} =  await Api.post<{ url: string }>(userEndPoints.STRIPE_CHECKOUT, {planId, amount, userId}, {headers})
  
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
        const err = error as any
        const message = err.respose?.data?.error || "Something went wrong"
        return { success:false, error:message };
    }
};

export const checkUserSubscribed = async() => {
    try {
        const {data} = await Api.get(userEndPoints.CHECK_USER_SUBSCRIBED, {headers})
        return {success: true, data} as any
    } catch (error) {
        const err = error as any
        const message = err.respose?.data?.error || "Something went wrong"
        return { success:false, error:message };
    }
}

export const updateUserSubStatus = async(planName: string) => {
    try {
        await Api.patch(userEndPoints.UPDATE_USER_SUB_STATUS, {planName}, {headers})
        return {success: true}
    } catch (error) {
        const err = error as any
        const message = err.respose?.data?.error || "Something went wrong"
        return { success:false, error:message };
    }
}

export const freelancerAddMoreInfo = async(userData: Partial<IFreelancerDetail>) => {
    try {
        const {data} = await Api.post(userEndPoints.ADD_MORE_INFO, {userData}, {headers})
        return {success: true, data} as any
    } catch (error) {
        const err = error as any
        const message = err.response?.data?.error || 'Something went wrong'
        return {success: false, error: message}
    }
}


export const updateFreelancerInfo = async(userData: Partial<IFreelancerDetail>) => {
    try {
        const {data} = await Api.patch(userEndPoints.UPDATE_MORE_INFO, {userData}, {headers})
        return {success: true, data} as any
    } catch (error) {
        const err = error as any
        const message = err.response?.data?.error || 'Something went wrong'
        return {success: false, error: message}
    }
}

export const getMoreInfo_F = async() => {
    try {
        const {data} = await Api.get(userEndPoints.GET_MORE_INFO, {headers})
        return {success: true, data} as any
    } catch (error) {
        const err = error as any
        const message = err.response?.data?.error || 'Something went wrong'
        return {success: false, error: message}
    }
}

export const aichatbot = async (inputText: string) => {
    try {
      const { data } = await axios.post<GeminiResponse>(
        userEndPoints.AI_CHATBOT,
        {
          contents: [{ parts: [{ text: `User: ${inputText}\nBot:` }] }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't respond.";
      return { success: true, data: reply };
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'Something went wrong';
      return { success: false, error: message };
    }
};


export const addProject = async (formData: FormData) => {
    try {
      const { data } = await Api.post(userEndPoints.ADD_PROJECT, formData, {
        headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
        },
      });
      return { success: true, data };
    } catch (error) {
      const err = error as any;
      const message = err.response?.data?.error || "Something went wrong";
      return { success: false, error: message };
    }
};

export const allProjectsById = async () => {
    try {
        const {data} = await Api.get(userEndPoints.ALL_PROJECTS_BY_ID, {headers})
        return {success: true, data} as any
    } catch (error) {
        const err = error as any;
        const message = err.response?.data?.error || "Something went wrong";
        return { success: false, error: message };
    }
}

export const allProjects = async () => {
    try {
        const {data} = await Api.get(userEndPoints.ALL_PROJECTS, {headers})
        return {success: true, data} as any
    } catch (error) {
        const err = error as any;
        const message = err.response?.data?.error || "Something went wrong";
        return { success: false, error: message };
    }
}