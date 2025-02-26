import axios from "axios";
import { userEndPoints } from "../constants/endpointUrl";

const Api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type" : "application/json"
    },
    withCredentials: true
})


export const refreshToken = async() => {
    const response = await axios.post(userEndPoints.REFRESH_TOKEN, {}, {withCredentials: true}) as any

    const accessToken = response.data?.accessToken
}


export default Api