import axios from "axios";
import { config } from "."

const axiosInstance = axios.create({
    baseURL: config.serverUrl,
    withCredentials: true,
});

console.log(config.serverUrl);


export default axiosInstance;