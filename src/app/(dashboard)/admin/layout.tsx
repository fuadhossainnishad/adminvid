import React from "react";
import Headbar from "../../../components/Headbar/page";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="space-y-[22px] px-[3%]">
      <section className="">
        <Headbar />
      </section>
      {children}
    </main>
  );
}
