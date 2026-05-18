import axiosInstance from "@/config/axios.config";

import apiList from "@/services/api/apiList";

import { IVideoResponse, IVideo } from "./video.type";

export const videoService = {
  async getVideos(page = 1, pageSize = 10): Promise<IVideoResponse> {
    const response = await axiosInstance.get(
      `${apiList.allVideo}?page=${page}&page_size=${pageSize}`,
    );

    if (!response?.data) {
      throw new Error("Failed to fetch videos");
    }

    return response.data;
  },

  async getVideoById(id: number): Promise<IVideo> {
    const response = await axiosInstance.get(`${apiList.allVideo}${id}/`);

    if (!response?.data) {
      throw new Error("Failed to fetch video");
    }

    return response.data.data;
  },

  async createVideo(formData: FormData): Promise<IVideo> {
    const response = await axiosInstance.post(`${apiList.allVideo}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response?.data) {
      throw new Error("Failed to create video");
    }

    return response.data.data;
  },

  async updateVideo(id: number, formData: FormData): Promise<IVideo> {
    const response = await axiosInstance.patch(
      `${apiList.allVideo}${id}/`,
      formData,
    );

    if (!response?.data) {
      throw new Error("Failed to update video");
    }

    return response.data.data;
  },

  async deleteVideo(id: number) {
    const response = await axiosInstance.delete(`${apiList.allVideo}${id}/`);

    if (!response?.data) {
      throw new Error("Failed to delete video");
    }

    return response.data;
  },
};
