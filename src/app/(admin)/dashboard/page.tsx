import React from "react";
import UserChart from "./_components/UserChart";
import DashboardCard from "./_components/DashboardCard";
import RecentSignup from "./_components/UserList";

export default function DashboardPpage() {
  return (
    <main className="space-y-6">
      <DashboardCard />
      <UserChart />
      <RecentSignup />
    </main>
  );
}
