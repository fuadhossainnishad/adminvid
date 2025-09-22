"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UserChart() {
  const data = [
    { month: "Jan", earnings: 20 },
    { month: "Feb", earnings: 15 },
    { month: "Mar", earnings: 35 },
    { month: "Apr", earnings: 25 },
    { month: "May", earnings: 30 },
    { month: "Jun", earnings: 25 },
    { month: "Jul", earnings: 35 },
    { month: "Aug", earnings: 30 },
    { month: "Sep", earnings: 35 },
    { month: "Oct", earnings: 25 },
    { month: "Nov", earnings: 30 },
    { month: "Dec", earnings: 32 },
  ];

  return (
    <main className="py-8 bg-white outline-none">
      <section className="flex justify-between ">
        <h2 className="px-8 text-lg font-semibold leading-7 bg-white  rounded-xl w-full">
          Earning Summary
        </h2>
      </section>
      <ResponsiveContainer
        width="100%"
        height={300}
        style={{ padding: "32px", outline: "none", border: "none" }}
      >
        <BarChart data={data} style={{ outline: "none", border: "none" }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} />
          <YAxis axisLine={false} />
          <Tooltip
            cursor={false}
            contentStyle={{ backgroundColor: "transparent" }}
          />
          <Bar
            dataKey="earnings"
            fill={"url(#colorEarnings)"}
            stroke="#8884d8"
            barSize={30}
            activeBar={{
              fill: "#4389D7",
              stroke: "#0F3E72",
            }}
          />
          <defs>
            <linearGradient
              id="colorEarnings"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="5%" stopColor="#4389D7" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#0F3E72" stopOpacity={1} />
            </linearGradient>
            )
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </main>
  );
}
