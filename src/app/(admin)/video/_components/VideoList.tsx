"use client";
import Pagination from "@/components/Pagination";
import apiList from "@/services/apiList";
import apiCall, { TMethods } from "@/services/apiMethodList";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export enum TSubscription {
  ANNUAL = "Annual",
  FREE = "Free",
  MONTHLY = "Monthly",
}

export interface IVideo {
  id: string;
  Thumbnail: string;
  Title: string;
  "Upload Date": Date;
}

export interface Action {
  view: React.ReactNode;
  block: React.ReactNode;
}

const videosData: IVideo[] = [
  {
    id: "1",
    Thumbnail: "/assets/icons/video/thumbnail.svg",
    Title: "Video 1 Title",
    "Upload Date": new Date("Jan 15, 2025"),
  },
  {
    id: "2",
    Thumbnail: "/assets/icons/video/thumbnail.svg",
    Title: "Video 2 Title",
    "Upload Date": new Date("2023-09-02"),
  },
  {
    id: "3",
    Thumbnail: "/assets/icons/video/thumbnail.svg",
    Title: "Video 3 Title",
    "Upload Date": new Date("2023-09-03"),
  },
];

export default function VideoList() {
  const [view, setView] = useState(false);
  const [videos, setVideos] = useState<IVideo[]>(videosData);

  const handleFetch = async () => {
    const res = await apiCall(TMethods.get, apiList.video, {});
    if (!res.success) {
      toast.error("Failed to fetch video data");
    }
    if (res.data) {
      setVideos(res.data);
    }
    toast.success("Successfully fetch video data");
  };
  useEffect(() => {
    handleFetch();
  });

  return (
    <main className="border-[1px] border-[#E5E7EB] rounded-xl grow">
      <h2 className="text-lg font-semibold leading-7 bg-white p-5 rounded-xl w-full">
        Video Management
      </h2>
      <table className="w-full text-center text-sm border-[#E5E7EB] ">
        <thead>
          <tr className="bg-bg-list-header/40 text-list-header">
            {Object.keys(videos[0]!)
              .filter((key) => key !== "id")
              .map((key, ind) => (
                <th className="px-5 py-3" key={ind}>
                  {key}
                </th>
              ))}
            <th className="px-5 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr
              key={video.id}
              className="hover:bg-[#F3F4F6] border-b border-b-[#E5E7EB] items-center"
            >
              <td className="flex justify-center gap-2 items-center px-5 py-3">
                <Image
                  src={video.Thumbnail}
                  alt={video.Title}
                  width={20}
                  height={20}
                  className=""
                />
              </td>
              <td className="px-5 py-3 items-center ">{video.Title}</td>
              <td className="px-5 py-3 items-center">March 15, 2024</td>
              <td className="px-5 py-3 flex justify-center items-center gap-5">
                <Image
                  src="/assets/icons/action/view.svg"
                  alt="view"
                  width={26}
                  height={26}
                  className="cursor-pointer"
                  onClick={() => {
                    setView(!view);
                  }}
                />
                <Image
                  src="/assets/icons/action/edit.svg"
                  alt="view"
                  width={26}
                  height={26}
                  className="cursor-pointer"
                  onClick={() => {
                    setView(!view);
                  }}
                />
                <Image
                  src="/assets/icons/action/delete.svg"
                  alt="view"
                  width={26}
                  height={26}
                  className="cursor-pointer"
                  onClick={() => {
                    setView(!view);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={1} />
    </main>
  );
}
