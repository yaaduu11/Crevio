import axios from "axios";
import { userEndPoints } from "../constants/endpointUrl";
import store from "../redux/storage";
import { removeUser, setUser } from "../redux/userSlice";
import { removeAdmin, setAdmin } from "../redux/adminSlice";
import messages from "../constants/messages";

const refreshToken = async(userLevel: "user" | "admin") => {
    const {data} = await Api.post(userEndPoints.REFRESH_TOKEN, {}, {withCredentials: true}) as any
    
    const accessToken = data?.accessToken    
    if(userLevel == 'user') {
        store.dispatch(setUser({accessToken}))
    }else{
        store.dispatch(setAdmin({accessToken}))
    }
    return accessToken
}

const getTokenByUserLevel = (userLevel: "user" | "admin"): string | null => {
    const state = store.getState();    
    const token = userLevel === 'user' ? state.user.accessToken : state.admin.accessToken;
    return token
};

const Api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type" : "application/json"
    },
    withCredentials: true
})

Api.interceptors.request.use(
    (config) => {
        config.headers = config.headers || {}        
        const userLevel = config.headers["X-User-Level"];
        const token = getTokenByUserLevel(userLevel);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

Api.interceptors.response.use(
    (response) => response ,
    async (error) => {
        const originalRequest = error.config

        if (error.response) {            
            const { status, data } = error.response;

            if (status === 403 && data.message === messages.USER_BLOCKED) {
                
                store.dispatch(removeUser());
                return Promise.reject(error);
            }

            if (status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const userLevel = originalRequest.headers['X-User-Level'];
                    const newToken = await refreshToken(userLevel);

                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return Api(originalRequest);
                } catch (refreshError) {
                    if (originalRequest.headers['X-User-Level'] === 'user') { 
                        store.dispatch(removeUser());
                    } else {
                        store.dispatch(removeAdmin());
                    }
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error)
    }
)

export default Api