import Api from "../services/axios";
import { adminEndPoints } from "../constants/endpointUrl";
import { GetFreelancers, SigninResponse, SigninResult, UserTypes } from "../types/adminTypes";

const headers = {
    'X-User-Level': 'admin'
}

export const signin = async(email: string, password:string): Promise<SigninResult> =>{
    try {
        const { data } = await Api.post<SigninResponse>(adminEndPoints.SIGNIN, { email, password })
        return {success:true, data}
    } catch (error) {
        const message = "Something went wrong"
        return { success:false, error:message, data:{} };
    }
}

export const _getFreelancers = async(token: string) => {
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              ...headers, 
            },
          };
        const {data} = await Api.get<UserTypes[]>(adminEndPoints.FETCH_FREELANCERS, config)
        return {success:true, data} as any
    } catch (error) {
        const message = "Something went wrong"
        return { success:false, error:message, data:[] };
    }
}

export const _getClients = async(token: string) => {
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              ...headers, 
            },
          };
        const {data} = await Api.get<UserTypes[]>(adminEndPoints.FETCH_CLIENTS, config)
        return {success:true, data} as any
    } catch (error) {
        const message = "Something went wrong"
        return { success:false, error:message, data:[] };
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