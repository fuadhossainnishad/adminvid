"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Profile from "./_components/Profile";

export default function Page() {
  const router = useRouter();
  return (
    <main className="p-8 border-[1px] border-[#E5E7EB] bg-white rounded-xl h-full">
      <section className="flex gap-4 items-center">
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
        <h1 className="text-2xl font-medium text-text-settings">Profile</h1>
      </section>
      <Profile />
    </main>
  );
}
