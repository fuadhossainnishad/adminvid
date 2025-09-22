import React from "react";

const dashboardCardData = {
  "Total Users": {
    value: "12,121",
  },
  "New Registration": {
    value: "12,121",
  },
  "Total Revenue": {
    value: "12,121",
  },
};

export default function DashboardCard() {
  return (
    <main className="flex gap-8">
      {Object.entries(dashboardCardData).map(([key, data], ind) => (
        <section
          key={ind}
          className=" grow rounded-xl border-[1px] border-[#E5E7EB] bg-white p-8 space-y-6"
        >
          <section className="flex justify-between">
            <h1 className="text-lg font-normal text-[#4B5563]">{key}</h1>
          </section>
          <h1 className="text-4xl font-bold  text-black">{data.value}</h1>
        </section>
      ))}
    </main>
  );
}
