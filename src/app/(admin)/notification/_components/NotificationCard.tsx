import React from "react";
import Image from "next/image";
import { INotification } from "@/services/notification/notification.type";

export default function NotificationCard({
  notificationData,
  onDelete,
}: {
  notificationData: INotification;
  onDelete: (id: number) => void;
}) {
  return (
    <main className="flex justify-between w-full px-4 items-center">
      <section className="">
        <h1 className="text-text-notf-title text-base font-medium">
          {notificationData.notification_type.replace("_", " ")}
        </h1>
        <h1 className="text-text-notf-title text-sm font-normal">
          {notificationData.message}
        </h1>
      </section>
      <section className="flex gap-4 items-center">
        <h1 className="">{notificationData.time_ago}</h1>
        <Image
          src="/assets/icons/action/delete.svg"
          alt="delete"
          height={30}
          width={30}
          onClick={() => onDelete(notificationData.id)}
        />
      </section>
    </main>
  );
}
