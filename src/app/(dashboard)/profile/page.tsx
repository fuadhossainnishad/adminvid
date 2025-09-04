import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <main className="space-y-5">
      <h1 className="text-[40px] font-bold leading-[110px]">Profile</h1>
      <section className="flex justify-center w-full">
        <Image
          src="/assets/icons/logo.svg"
          alt="profile"
          height={124}
          width={124}
        />
      </section>
    </main>
  );
}
