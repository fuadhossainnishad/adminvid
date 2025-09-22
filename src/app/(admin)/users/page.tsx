import React from "react";
import UserList from "./Userlist";
import Pagination from "@/components/Pagination";

export default function UserPage() {
  return (
    <main className="border-[1px] border-[#E5E7EB] rounded-xl grow">
      <h2 className="text-lg text-list-header font-semibold leading-7 bg-white p-5 rounded-xl w-full">
        User Management
      </h2>
      <UserList />
      <Pagination currentPage={1} />
    </main>
  );
}
