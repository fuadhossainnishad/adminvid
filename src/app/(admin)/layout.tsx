"use client";
import Headbar from "@/components/Headbar/page";
import Sidebar from "@/components/Sidebar/page";
import React, { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSidebar, setOpenSidebar] = useState(true);
  const handleToggle = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <main className="space-y-[22px] px-[3%]">
      <Headbar toggleSidebar={handleToggle} openSidebar={openSidebar} />
      <section className="flex">
        {openSidebar && <Sidebar />}
        {children}
      </section>
    </main>
  );
}
