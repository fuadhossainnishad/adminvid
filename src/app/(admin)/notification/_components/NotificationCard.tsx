import React, { MouseEventHandler } from "react";
import { INotification } from "../page";
import Image from "next/image";

export default function NotificationCard({
  notificationData,
  handleEvent,
}: {
  notificationData: INotification;
  handleEvent: MouseEventHandler<HTMLImageElement>;
}) {
  return (
    <main className="flex justify-between w-full px-4 items-center">
      <section className="">
        <h1 className="text-text-notf-title text-base font-medium">
          {notificationData.title}
        </h1>
        <h1 className="text-text-notf-title text-sm font-normal">
          {notificationData.message}
        </h1>
      </section>
      <section className="flex gap-4 items-center">
        <h1 className="">{notificationData.createdAt}</h1>
        <Image
          src="/assets/icons/action/delete.svg"
          alt="delete"
          height={30}
          width={30}
          onClick={handleEvent}
        />
      </section>
    </main>
  );
}
