import Image from "next/image";
import React from "react";

export default function Headbar() {
  return (
    <header className="flex justify-end items-center gap-[30px]">
      <Image
        src="/assets/icons/notification.svg"
        alt="profile"
        width={40}
        height={40}
        className="rounded-full "
      />
      <section className="flex gap-[14px] items-center">
        <div className="text-right">
          <h1 className="text-sm font-bold leading-[22px] ">James Mitchell</h1>
          <h1 className="text-[10px] font-regular leading-[14px] ">Admin</h1>
        </div>
        <Image
          src="/assets/icons/totalVenue.svg"
          alt="profile"
          width={40}
          height={40}
          className="rounded-full "
        />
      </section>
    </header>
  );
}
