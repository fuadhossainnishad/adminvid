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

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;