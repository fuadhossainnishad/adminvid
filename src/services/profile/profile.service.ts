import axiosInstance from "@/config/axios.config";
import { IProfileResponse, IUserProfile } from "./profile.type";

const PROFILE_BASE_URL = "/users/profile";

export const profileService = {
  async getProfile(id: number): Promise<IUserProfile> {
    const response = await axiosInstance.get<IProfileResponse>(
      `${PROFILE_BASE_URL}/${id}/`,
    );

    return response.data.data;
  },

  async updateProfile(id: number, formData: FormData): Promise<IUserProfile> {
    const response = await axiosInstance.patch<IProfileResponse>(
      `${PROFILE_BASE_URL}/${id}/`,
      formData,
    );

    return response.data.data;
  },
};
