"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Headbar({
  toggleSidebar,
  openSidebar,
}: {
  toggleSidebar: () => void;
  openSidebar: boolean;
}) {
  const router = useRouter();
  const handleFetch = async () => {};
  return (
    <header className="flex justify-between items-center px-[2%] py-3 shadow-md shadow-shadow">
      <section
        className="flex justify-between w-[13%] items-center"
        onClick={toggleSidebar}
      >
        {openSidebar && (
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            height={53}
            width={53}
          />
        )}
        <Image src="/assets/icons/dash.svg" alt="dash" height={6} width={18} />
      </section>
      <section className="flex gap-6">
        <section className="flex gap-[14px] items-center">
          <Image
            src="/assets/icons/alert.svg"
            alt="profile"
            width={24}
            height={24}
            className="rounded-full "
          />
          <div className="bg-subs-create rounded-full px-3 py-1">8</div>
        </section>
        <Image
          src="/assets/images/logo.svg"
          alt="profile"
          width={40}
          height={40}
          className="rounded-full cursor-pointer "
          onClick={() => {
            router.push("/profile");
          }}
        />
      </section>
    </header>
  );
}
