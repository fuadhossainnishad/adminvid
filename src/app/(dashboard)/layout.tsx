import React, { ReactNode } from "react";
import Sidebar from "@/components/Sidebar/page";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="">
      <Sidebar />
      {children}
    </main>
  );
}
