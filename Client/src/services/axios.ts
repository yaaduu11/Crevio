import axios from "axios";
import { userEndPoints } from "../constants/endpointUrl";

const Api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type" : "application/json"
    },
    withCredentials: true
})

export default Api
