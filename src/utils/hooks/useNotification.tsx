"use client";

import { useCallback, useState } from "react";

import { notificationService } from "@/services/notification/notification.service";

import {
  INotification,
  INotificationPagination,
} from "@/services/notification/notification.type";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const [pagination, setPagination] = useState<INotificationPagination | null>(
    null,
  );

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async (page = 1) => {
    try {
      setLoading(true);

      setError(null);

      const response = await notificationService.getNotifications(page);

      setNotifications(response.results);

      setPagination(response.pagination);
    } catch (err) {
      console.error(err);

      setError("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteNotification = async (id: number) => {
    try {
      await notificationService.deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return {
    notifications,
    pagination,
    loading,
    error,
    fetchNotifications,
    deleteNotification,
  };
};
