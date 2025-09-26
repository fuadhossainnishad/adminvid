"use client";
import React, { MouseEventHandler, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Filter } from "@/components/Filter";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import NotificationCard from "./_components/NotificationCard";

export interface INotification {
  title: string;
  message: string;
  createdAt: string;
}
// Mock subscription data, replace with actual data
const mockNotification: INotification[] = [
  {
    title: "Product Listing Reminder",
    message:
      "It’s time to update the product description and images for Luxury Home Decor Set.",
    createdAt: "5 min ago",
  },
  {
    title: "Product Listing Reminder",
    message:
      "It’s time to update the product description and images for Luxury Home Decor Set.",
    createdAt: "5 min ago",
  },
  {
    title: "Product Listing Reminder",
    message:
      "It’s time to update the product description and images for Luxury Home Decor Set.",
    createdAt: "5 min ago",
  },
  {
    title: "Product Listing Reminder",
    message:
      "It’s time to update the product description and images for Luxury Home Decor Set.",
    createdAt: "5 min ago",
  },
  {
    title: "Product Listing Reminder",
    message:
      "It’s time to update the product description and images for Luxury Home Decor Set.",
    createdAt: "5 min ago",
  },
  {
    title: "Product Listing Reminder",
    message:
      "It’s time to update the product description and images for Luxury Home Decor Set.",
    createdAt: "5 min ago",
  },
];

export default function NotificationPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete: MouseEventHandler<HTMLImageElement> = async () => {};

  const filteredNotification = mockNotification.filter(
    (user) =>
      user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const router = useRouter();
  return (
    <main className="p-8 border-[1px] border-[#E5E7EB] bg-white rounded-xl h-full space-y-8">
      <section className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Image
            src="/assets/icons/backArrow.svg"
            alt="profile"
            height={40}
            width={40}
            className="cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />
          <h1 className="text-2xl font-medium text-text-settings">
            Notification
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative ">
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 w-64 outline-none appearance-none border-border"
            />
            <Filter>
              <Button
                size="sm"
                className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-10 p-0 bg-text-clicked hover:bg-text-clicked2 rounded-s-none"
              >
                <Settings2 className="h-4 w-4 text-white" />
              </Button>
            </Filter>
          </div>
        </div>
      </section>
      <section className="flex gap-3">
        <button className="text-text-not text-base font-medium">All</button>
        <h1 className="bg-subs-create/50 rounded-full w-fit px-2">8</h1>
      </section>
      <section className="space-y-8">
        {filteredNotification.map((notf, ind) => (
          <NotificationCard
            key={ind}
            notificationData={notf}
            handleEvent={handleDelete}
          />
        ))}
      </section>
    </main>
  );
}
