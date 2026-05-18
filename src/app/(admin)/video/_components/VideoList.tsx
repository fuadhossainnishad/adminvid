"use client";

import Pagination from "@/components/Pagination";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { useVideo } from "@/utils/hooks/useVideo";
import VideoModal from "./VideoModal";
import { IVideo } from "@/services/video/video.type";

export default function VideoList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);

  const {
    videos,
    pagination,
    fetchVideos,
    changePage,
    createVideo,
    updateVideo,
    deleteVideo,
  } = useVideo();

  useEffect(() => {
    fetchVideos(1);
  }, [fetchVideos]);

  const handleView = (video: IVideo) => {
    setSelectedVideo(video);
    setMode("view");
    setModalOpen(true);
  };

  const handleEdit = (video: IVideo) => {
    setSelectedVideo(video);
    setMode("edit");
    setModalOpen(true);
  };

  const handleDelete = async (video: IVideo) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await deleteVideo(video.id);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      if (mode === "edit" && selectedVideo) {
        await updateVideo(selectedVideo.id, formData);
      } else {
        await createVideo(formData);
      }

      setModalOpen(false);
      setSelectedVideo(null);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <main className="border-[1px] border-[#E5E7EB] rounded-xl grow ">

      {/* HEADER (UNCHANGED DESIGN) */}
      <div className="flex justify-between items-center bg-white p-5 rounded-xl w-full">
        <h2 className="text-lg font-semibold leading-7">
          Video Management
        </h2>

        <button
          onClick={() => {
            setSelectedVideo(null);
            setMode("create");
            setModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Upload Video
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full text-center text-sm border-[#E5E7EB]">
        <thead>
          <tr className="bg-bg-list-header/40 text-list-header">
            <th className="px-5 py-3">Thumbnail</th>
            <th className="px-5 py-3">Title</th>
            <th className="px-5 py-3">Upload Date</th>
            <th className="px-5 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {videos?.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-10">
                No videos found
              </td>
            </tr>
          ) : (
            videos.map((video) => (
              <tr
                key={video.id}
                className="hover:bg-[#F3F4F6] border-b border-b-[#E5E7EB]"
              >
                <td className="flex justify-center items-center px-5 py-3">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={60}
                    height={60}
                  />
                </td>

                <td className="px-5 py-3">{video.title}</td>

                <td className="px-5 py-3">
                  {new Date(video.upload_date).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </td>

                <td className="px-5 py-3 flex justify-center items-center gap-5">
                  <Image
                    src="/assets/icons/action/view.svg"
                    width={26}
                    height={26}
                    alt="view"
                    className="cursor-pointer"
                    onClick={() => handleView(video)}
                  />

                  <Image
                    src="/assets/icons/action/edit.svg"
                    width={26}
                    height={26}
                    alt="edit"
                    className="cursor-pointer"
                    onClick={() => handleEdit(video)}
                  />

                  <Image
                    src="/assets/icons/action/delete.svg"
                    width={26}
                    height={26}
                    alt="delete"
                    className="cursor-pointer"
                    onClick={() => handleDelete(video)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pagination && (
        <div className="p-5">
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            onPageChange={(page) => changePage(page)}
          />
        </div>
      )}

      {/* MODAL */}
      <VideoModal
        open={modalOpen}
        mode={mode}
        initialData={selectedVideo}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </main>
  );
}