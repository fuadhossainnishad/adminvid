import React, { ReactNode } from "react";
import Headbar from "@/components/Headbar/page";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="">
      <Headbar />
      {children}
    </main>
  );
}
