"use client";
import apiList from "@/services/apiList";
import apiCall, { TMethods } from "@/services/apiMethodList";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { IEarnings } from "../Data";

export default function EarningTable({
  earningsData,
}: {
  earningsData: IEarnings[];
}) {
  const [view, setView] = useState(false);
  const [earnings, setEarnings] = useState<IEarnings[]>(earningsData);

  const handleFetch = async () => {
    const res = await apiCall(TMethods.get, apiList.earnings, {});
    if (!res.success) {
      toast.error("Failed to fetch earning data");
    }
    if (res.data) {
      setEarnings(res.data);
    }
    toast.success("Successfully fetch earning data");
  };
  useEffect(() => {
    handleFetch();
  });

  return (
    <main className="border-border border mx-4 rounded-lg bg-white overflow-hidden">
      <table className=" w-full text-center text-sm">
        <thead>
          <tr className="bg-bg-list-header/40 text-list-header">
            {Object.keys(earnings[0]!).map((key, ind) => (
              <th className="px-5 py-3" key={ind}>
                {key}
              </th>
            ))}
            <th className="px-5 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {earnings.map((earning) => (
            <tr
              key={earning.Serial}
              className="hover:bg-[#F3F4F6] border-b border-b-[#E5E7EB] items-center"
            >
              <td className="px-5 py-3 items-center">{earning.Serial}</td>

              <td className="flex justify-center gap-2 items-center px-5 py-3">
                <Image
                  src={earning.User.photo}
                  alt={earning.User.name}
                  width={20}
                  height={20}
                  className=""
                />
                <h1 className="text-[#111827] font-semibold text-sm leading-5 items-center">
                  {earning.User.name}
                </h1>
              </td>
              <td className="px-5 py-3 items-center ">
                {earning.Subscription}
              </td>
              <td className="px-5 py-3 items-center ">{earning.Amount}</td>
              <td className="px-5 py-3 items-center ">
                {earning["Acc Number"]}
              </td>
              <td className="px-5 py-3 items-center">March 15, 2024</td>
              <td className="px-5 py-3 flex justify-center items-center">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
