"use client";
import React, { useState } from "react";
import UserTable from "./_components/UserTable";
import Pagination from "@/components/Pagination";
import DateFilter from "../../../components/DateFilter";

export default function UserPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 1;

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="p-8 space-y-6 border-[1px] border-[#E5E7EB] bg-white rounded-xl h-full flex flex-col">
      <section className="flex justify-between">
        <h2 className="text-lg text-list-header font-semibold leading-7 bg-white  rounded-xl w-full">
          User Management
        </h2>
        <DateFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </section>
      <section className="flex flex-col grow overflow-auto ">
        <UserTable />
      </section>

      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </main>
  );
}
