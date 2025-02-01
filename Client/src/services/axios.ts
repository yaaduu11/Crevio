import axios from "axios";


const Api = axios.create({
    baseURL: import.meta.env.API_PORT,
    headers: {
        "Content-Type" : "application/json"
    },
    withCredentials: true
})

export default Api