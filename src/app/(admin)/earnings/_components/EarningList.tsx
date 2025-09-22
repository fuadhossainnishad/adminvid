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

export interface IEarnings {
  Serial: string;
  User: {
    photo: string;
    name: string;
  };
  Subscription: TSubscription;
  Amount: number;
  "Acc Number": string;
  Date: Date;
}

export interface Action {
  view: React.ReactNode;
  block: React.ReactNode;
}

const earningsData: IEarnings[] = [
  {
    Serial: "1",
    User: { photo: "/assets/images/profile.svg", name: "John Doe" },
    Subscription: TSubscription.ANNUAL,
    Amount: 120.5,
    "Acc Number": "123456789",
    Date: new Date("Jan 15, 2025"),
  },
  {
    Serial: "2",
    User: { photo: "/assets/images/profile.svg", name: "Jane Smith" },
    Subscription: TSubscription.FREE,
    Amount: 50.75,
    "Acc Number": "987654321",
    Date: new Date("2023-09-02"),
  },
  {
    Serial: "3",
    User: { photo: "/assets/images/profile.svg", name: "Alice Johnson" },
    Subscription: TSubscription.MONTHLY,
    Amount: 80.25,
    "Acc Number": "456789123",
    Date: new Date("2023-09-03"),
  },
];

export default function EarningList() {
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
    <main className="border-[1px] border-[#E5E7EB] rounded-xl grow">
      <h2 className="text-lg font-semibold leading-7 bg-white p-5 rounded-xl w-full">
        User List
      </h2>
      <table className="w-full text-center text-sm border-[#E5E7EB] ">
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
      <Pagination currentPage={1} />
    </main>
  );
}
