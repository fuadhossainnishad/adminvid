'use client'

import apiList from "@/services/api/apiList";
import apiCall, { TMethods } from "@/services/api/apiMethodList";
import { useEffect, useState } from "react";
import { toast } from "sonner";


interface Summary {
  total_users: number;
  new_registrations: number;
}


// const dashboardCardData = {
//   "Total Users": {
//     value: "12,121",
//   },
//   "New Registration": {
//     value: "12,121",
//   },
//   "Total Revenue": {
//     value: "12,121",
//   },
// };

export default function DashboardCard() {
  const [summary, setSummary] = useState<Summary>({
    total_users: 0,
    new_registrations: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await apiCall(TMethods.get, apiList.dashboard, {});

        if (!res?.success) {
          toast.error("Failed to fetch dashboard data");
          return;
        }

        const summaryData = res?.data?.summary;

        setSummary({
          total_users: summaryData?.total_users ?? 0,
          new_registrations: summaryData?.new_registrations ?? 0,
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const cards = [
    {
      label: "Total Users",
      value: summary.total_users,
    },
    {
      label: "New Registration",
      value: summary.new_registrations,
    },
  ];

  return (
    <main className="flex gap-8">
      {cards.map((card, ind) => (
        <section
          key={ind}
          className=" grow rounded-xl border-[1px] border-[#E5E7EB] bg-white p-8 space-y-6"
        >
          <section className="flex justify-between">
            <h1 className="text-lg font-normal text-[#4B5563]">{card.label}</h1>
          </section>
          <h1 className="text-4xl font-bold  text-black">
            {loading ? "..." : card.value.toLocaleString()}
          </h1>
        </section>
      ))}
    </main>
  );
}
