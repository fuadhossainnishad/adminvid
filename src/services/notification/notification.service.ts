import axiosInstance from "@/config/axios.config";
import { INotificationResponse } from "./notification.type";
import apiList from "../api/apiList";

export const notificationService = {
  async getNotifications(
    page = 1,
    pageSize = 10,
  ): Promise<INotificationResponse> {
    const response = await axiosInstance.get(
      `${apiList.notifications}?page=${page}&page_size=${pageSize}`,
    );

    console.log("Notification Response:", response.data);
    return response.data;
  },

  async deleteNotification(id: number): Promise<void> {
    await axiosInstance.delete(`${apiList.notifications}${id}/`);
  },

  async markAsRead(id: number): Promise<void> {
    await axiosInstance.patch(`${apiList.notifications}${id}/`, {
      is_read: true,
    });
  },
};
