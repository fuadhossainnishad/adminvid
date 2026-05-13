"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { videoService } from "@/services/video/video.service";
import { IVideo, IVideoPagination } from "@/services/video/video.type";

export const useVideo = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [pagination, setPagination] =
    useState<IVideoPagination | null>(null);

  const [loading, setLoading] = useState(false);

  const fetchVideos = useCallback(async (page = 1) => {
    try {
      setLoading(true);

      const data = await videoService.getVideos(page);

      setVideos(data.results);
      setPagination(data.pagination);
    } catch {
      toast.error("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  }, []);

  const createVideo = useCallback(
    async (payload: FormData) => {
      try {
        await videoService.createVideo(payload);
        toast.success("Video created");

        // refresh current page safely
        const page = pagination?.current_page || 1;
        await fetchVideos(page);
      } catch {
        toast.error("Create failed");
      }
    },
    [fetchVideos, pagination],
  );

  const updateVideo = useCallback(
    async (id: number, payload: FormData) => {
      try {
        await videoService.updateVideo(id, payload);
        toast.success("Video updated");

        const page = pagination?.current_page || 1;
        await fetchVideos(page);
      } catch {
        toast.error("Update failed");
      }
    },
    [fetchVideos, pagination],
  );

  const deleteVideo = useCallback(
    async (id: number) => {
      try {
        await videoService.deleteVideo(id);

        setVideos((prev) =>
          prev.filter((v) => v.id !== id),
        );

        toast.success("Deleted");
      } catch {
        toast.error("Delete failed");
      }
    },
    [],
  );

  const changePage = useCallback(
    (page: number) => {
      fetchVideos(page);
    },
    [fetchVideos],
  );

  return {
    videos,
    pagination,
    loading,

    fetchVideos,
    changePage,

    createVideo,
    updateVideo,
    deleteVideo,
  };
};