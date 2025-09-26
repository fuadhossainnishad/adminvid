"use client";
import React, { useState } from "react";
import Pagination from "../../../components/Pagination";
import { Input } from "@/components/ui/input";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { earningsData } from "./Data";
import { Filter } from "@/components/Filter";
import EarningTable from "./_components/EarningTable";

export default function EarningsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;

  // Mock subscription data, replace with actual data
  const mockSubscription = [
    { name: "John Doe", serial: "12345" },
    { name: "Jane Smith", serial: "67890" },
    // Add more mock data as needed
  ];

  const filteredSubscription = mockSubscription.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.serial.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubscription.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredSubscription.slice(
    startIndex,
    startIndex + usersPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="border-[1px] border-[#E5E7EB] bg-white rounded-xl grow">
      <section className="flex justify-between p-5">
        <h2 className="text-lg text-list-header font-semibold leading-7  rounded-xl w-full">
          Earnings Overview
        </h2>
        <div className="flex items-center space-x-2">
          <div className="relative ">
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 w-64 outline-none appearance-none border-border"
            />
            <Filter>
              <Button
                size="sm"
                className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-10 p-0 bg-text-clicked hover:bg-text-clicked2 rounded-s-none"
              >
                <Settings2 className="h-4 w-4 text-white" />
              </Button>
            </Filter>
          </div>
        </div>
      </section>
      <EarningTable earningsData={earningsData} />
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </main>
  );
}
