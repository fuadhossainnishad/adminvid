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
    <main className="overflow-y-hidden">
      <Headbar toggleSidebar={handleToggle} openSidebar={openSidebar} />
      <section className="flex">
        {openSidebar && <Sidebar />}
        <section className="bg-bg-list-header/20 grow p-10">{children}</section>
      </section>
    </main>
  );
}
