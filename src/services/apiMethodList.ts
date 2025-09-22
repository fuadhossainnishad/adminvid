import axiosInstance from "@/config/axios.config";

export enum TMethods {
    post = 'post',
    get = 'get',
    patch = 'patch',
    delete = 'delete',
    put = 'put'
}

const apiCall = async <T>(
    method: TMethods,
    url: string,
    data: T,
    headers?: object
) => {
    console.log(data);

    const res = await axiosInstance(
        {
            method,
            url,
            data,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
        }
    );
    return res.data;
};

export default apiCall
