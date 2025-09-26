"use client";
import apiList from "@/services/apiList";
import apiCall, { TMethods } from "@/services/apiMethodList";
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
}

export interface Action {
  view: React.ReactNode;
  block: React.ReactNode;
}

const recentSignups: IRecentSignup[] = [
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

export default function UserTable() {
  const [view, setView] = useState(false);
  const [block, setBlock] = useState(false);

  const handleBlock = async () => {
    const res = await apiCall(TMethods.post, apiList.user, { delete: !block });
    if (!res.success) {
      toast.error(
        `Request failed to ${block === true ? "unblock" : "block"} this user`
      );
    }
    setBlock(!block);
    toast.success(
      `User ${block === true ? "unblocked" : "blocked"} successfully`
    );
  };

  return (
    <main className="border-border border rounded-lg bg-white overflow-hidden">
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
          {recentSignups.map((signup) => (
            <tr
              key={signup["User ID"]}
              className="hover:bg-[#F3F4F6] border-b border-b-[#E5E7EB] items-center"
            >
              <td className="px-5 py-3 items-center">{signup["User ID"]}</td>

              <td className="flex justify-center gap-2 items-center px-5 py-3">
                <Image
                  src={signup.Name.photo}
                  alt={signup.Name.name}
                  width={20}
                  height={20}
                  className=""
                />
                <h1 className="text-[#111827] font-semibold text-sm leading-5 items-center">
                  {signup.Name.name}
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
                    setView(!view);
                  }}
                />
                <Image
                  src={`/assets/icons/action/${block ? "view" : "block"}.svg`}
                  alt="block"
                  width={26}
                  height={26}
                  className="cursor-pointer"
                  onClick={() => handleBlock}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
