import axios from "axios";
import { config } from "."

const axiosInstance = axios.create({
    baseURL: config.serverUrl,
    withCredentials: true,
});

console.log(config.serverUrl);


axiosInstance.interceptors.request.use(
    (config) => {
        const token =
            typeof window !== "undefined"
                ? sessionStorage.getItem("token")
                : null;

        console.log("Token from interceptor:", token);


        if (token && token !== "undefined" && token !== "null") {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;