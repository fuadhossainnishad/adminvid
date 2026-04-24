import { IRecentSignup } from "@/app/(admin)/users/_components/UserTable";

export interface IUserResposeData {
    id: string;
    full_name: string;
    email: string
    is_active: boolean;
    registration_date: Date;
    profile_picture: string
}

export const mapUserResponseToUser = (data: IUserResposeData): IRecentSignup => {
    return {
        "User ID": String(data.id),
        Name: {
            photo: data.profile_picture || "/assets/images/profile.svg",
            name: data.full_name || "Unknown",
        },
        Email: data.email,
        "Registration Date": new Date(data.registration_date),
        is_active: data.is_active,
    };
};


export const mapUsersResponseToUsers = (data: IUserResposeData[]) => {
    return data.map(mapUserResponseToUser);
}