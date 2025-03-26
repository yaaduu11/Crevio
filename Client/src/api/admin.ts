import Api from "../services/axios";
import { adminEndPoints } from "../constants/endpointUrl";
import { SigninResponse, UserTypes } from "../types/admin.type";
import { SubscriptionPlan } from "../types/admin.type";


const headers = {
    'X-User-Level': 'admin'
}

export const signin = async(email: string, password:string) =>{
    try {
        const { data } = await Api.post<SigninResponse>(adminEndPoints.SIGNIN, { email, password }, {headers})
        return {success:true, data} as any
    } catch (error) {
        const message = "Something went wrong"
        return { success:false, error:message, data:{} };
    }
}

export const _getFreelancers = async() => {
    try {
        const {data} = await Api.get<UserTypes[]>(adminEndPoints.FETCH_FREELANCERS, {headers})
        return {success:true, data} as any
    } catch (error) {
        const message = "Something went wrong"
        return { success:false, error:message, data:[]};
    }
}

export const getMoreInfo_F = async(userId: string) => {
    try {
        const {data} = await Api.get(`${adminEndPoints.GET_MORE_INFO}?userId=${userId}`, {headers})
        return {success: true, data} as any
    } catch (error) {
        const err = error as any
        const message = err.response?.data?.error || 'Something went wrong'
        return {success: false, error: message}
    }
}

export const _getClients = async() => {
    try {
        const {data} = await Api.get<UserTypes[]>(adminEndPoints.FETCH_CLIENTS, {headers})
        return {success:true, data} as any
    } catch (error) {
        const message = "Something went wrong"
        return { success:false, error:message, data:[] };
    }
}

export const clientBlock = async(userId: string) => {
    try {
        await Api.patch(adminEndPoints.CLIENT_BLOCK, {userId}, {headers})
        return {success:true} 
    } catch (error) {
        const err = error as any
        const message = err.response?.data?.error || "Something went wrong"
        return { success:false, error:message};
    }
}

export const freelancerBlock = async(userId: string) =>{
    try {
        await Api.patch(adminEndPoints.FREELANCER_BLOCK, {userId}, {headers})
        return {success: true}
    } catch (error) {
        const err = error as any
        const message = err.response?.data?.error || "Something went wrong"
        return { success:false, error:message};
    }
}

export const logout = async() => {
    try {
        await Api.delete(adminEndPoints.LOGOUT, {headers})
        return {success:true}
    } catch (error) {
        const message = "Something went wrong"
        return { success:false, error:message};
    }
}




export const addSubscriptionPlan = async(formData: SubscriptionPlan) => {
    try {
        const {data} = await Api.post(adminEndPoints.ADD_PLAN, {formData}, {headers})
        return {success:true, data} 
    } catch (error) {
        const err = error as any
        const message = err.response?.data?.error || "Something went wrong"
        return { success:false, error:message }
    }
}

export const getAllPlans = async() => {
    try {
        const {data} = await Api.get(adminEndPoints.FETCH_PLANS, {headers})
        return {success: true, data} as any
    } catch (error) {
        const err = error as any
        const message = err.response?.data?.error || "Something went wrong"
        return { success:false, error:message }
    }
}