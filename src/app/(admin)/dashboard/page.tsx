import React from "react";
import UserChart from "./_components/UserChart";
import DashboardCard from "./_components/DashboardCard";
import UserPage from "../users/page";

export default function DashboardPpage() {
  return (
    <main className="space-y-6">
      <DashboardCard />
      <UserChart />
      <UserPage />
    </main>
  );
}
