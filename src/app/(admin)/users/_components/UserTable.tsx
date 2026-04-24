"use client";
import apiList from "@/services/api/apiList";
import apiCall, { TMethods } from "@/services/api/apiMethodList";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

export enum TPlan {
  PREMIUM = "premium",
  FREE = "free",
}

export interface IRecentSignup {
  "User ID": string;
  Name: {
    photo: string;
    name: string;
  };
  Email: string;
  "Registration Date": Date;
  is_active?: boolean;
}

export interface Action {
  view: React.ReactNode;
  block: React.ReactNode;
}

export const recentSignups: IRecentSignup[] = [
  {
    "User ID": "1",
    Name: { photo: "/assets/images/profile.svg", name: "John Doe" },
    Email: "john@example.com",
    "Registration Date": new Date("Jan 15, 2025"),
  },
  {
    "User ID": "2",
    Name: { photo: "/assets/images/profile.svg", name: "Jane Smith" },
    Email: "jane@example.com",
    "Registration Date": new Date("2023-09-02"),
  },
  {
    "User ID": "3",
    Name: { photo: "/assets/images/profile.svg", name: "Alice Johnson" },
    Email: "alice@example.com",
    "Registration Date": new Date("2023-09-03"),
  },
];

export default function UserTable({
  setOpenModal,
  setModalData,
  tableData = recentSignups,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalData: React.Dispatch<React.SetStateAction<IRecentSignup>>;
  tableData: IRecentSignup[];
}) {
  const [blockedUsers, setBlockedUsers] = useState<Record<string, boolean>>({});
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const handleBlock = async (userId: string) => {
    const isBlocked = blockedUsers[userId] || false;

    try {
      setLoadingUserId(userId);

      const res = await apiCall(TMethods.patch, apiList.blockUser(userId), {});

      if (!res?.success) {
        throw new Error("API failed");
      }

      // update state
      setBlockedUsers((prev) => ({
        ...prev,
        [userId]: !isBlocked,
      }));

      toast.success(
        `User ${isBlocked ? "unblocked" : "blocked"} successfully`
      );
    } catch (error) {
      toast.error(
        `Failed to ${isBlocked ? "unblock" : "block"} the user`
      );
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <main className="border-border border rounded-lg bg-white">
      <table className="w-full text-center text-sm border-[#E5E7EB] ">
        <thead>
          <tr className="bg-bg-list-header/40 text-list-header">
            {Object.entries(recentSignups[0]).map(([key], ind) => (
              <th className="px-5 py-3" key={ind}>
                {key}
              </th>
            ))}
            <th className="px-5 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {tableData.map((signup) => {
            const userId = signup["User ID"];
            const isBlocked = blockedUsers[userId] || false;
            const isLoading = loadingUserId === userId;

            return (
              <tr
                key={signup["User ID"]}
                className="hover:bg-[#F3F4F6] border-b border-b-[#E5E7EB] items-center"
              >
                <td className="px-5 py-3 items-center">{signup["User ID"]}</td>

                <td className="flex justify-center gap-2 items-center px-5 py-3">
                  <Image
                    src={signup.Name.photo! || "/assets/images/profile.svg"}
                    alt={signup.Name.name || "Profile Picture"}
                    width={20}
                    height={20}
                    className=""
                  />
                  <h1 className="text-[#111827] font-semibold text-sm leading-5 items-center">
                    {signup.Name.name || "Unknown"}
                  </h1>
                </td>
                <td className="px-5 py-3 items-center ">{signup.Email}</td>
                <td className="px-5 py-3 items-center">March 15, 2024</td>
                <td className="px-5 py-3 flex justify-center items-center gap-4">
                  <Image
                    src="/assets/icons/action/view.svg"
                    alt="view"
                    width={26}
                    height={26}
                    className="cursor-pointer"
                    onClick={() => {
                      setOpenModal(true);
                      setModalData(signup);
                    }}
                  />
                  <Image
                    src={`/assets/icons/action/${isBlocked ? "view" : "block"}.svg`}
                    alt="block"
                    width={26}
                    height={26}
                    className="cursor-pointer"
                    onClick={() => handleBlock(userId)}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  );
}
