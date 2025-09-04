import Image from "next/image";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center">
      <Image
        src="/assets/images/logo.svg"
        alt="logo"
        width={200}
        height={200}
      />
      {children}
    </main>
  );
}
