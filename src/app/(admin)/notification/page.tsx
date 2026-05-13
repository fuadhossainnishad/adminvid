"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Settings2 } from "lucide-react";

import { Filter } from "@/components/Filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import NotificationCard from "./_components/NotificationCard";

import { useNotifications } from "@/utils/hooks/useNotification";
import Pagination from "@/components/Pagination";

export default function NotificationPage() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const {
    notifications,
    pagination,
    loading,
    error,
    fetchNotifications,
    deleteNotification,
  } = useNotifications();

  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage, fetchNotifications]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(
      (notification) =>
        notification.message
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        notification.notification_type
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [notifications, searchTerm]);

  const handleDelete = async (id: number) => {
    await deleteNotification(id);
  };

  const handlePageChange = (page: number) => {
    if (!pagination) return;

    if (page < 1 || page > pagination.total_pages) return;

    setCurrentPage(page);
  };

  return (
    <main className="p-8 border-[1px] border-[#E5E7EB] bg-white rounded-xl h-full flex flex-col">
      <section className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Image
            src="/assets/icons/backArrow.svg"
            alt="profile"
            height={40}
            width={40}
            className="cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />

          <h1 className="text-2xl font-medium text-text-settings">
            Notification
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
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

      <section className="flex gap-3 mt-8">
        <button className="text-text-not text-base font-medium">
          All
        </button>

        <h1 className="bg-subs-create/50 rounded-full w-fit px-2">
          {pagination?.total_count ?? notifications.length}
        </h1>
      </section>

      <section className="space-y-8 mt-8 flex-1">
        {loading ? (
          <div className="flex justify-center py-10">
            <h1 className="text-base font-medium text-gray-500">
              Loading...
            </h1>
          </div>
        ) : error ? (
          <div className="flex justify-center py-10">
            <h1 className="text-base font-medium text-red-500">
              {error}
            </h1>
          </div>
        ) : filteredNotifications.length > 0 ? (
          filteredNotifications.map((notf) => (
            <NotificationCard
              key={notf.id}
              notificationData={notf}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="flex justify-center py-10">
            <h1 className="text-base font-medium text-gray-500">
              No notifications found
            </h1>
          </div>
        )}
      </section>

      {pagination && pagination.total_pages > 1 && (
        <section className="mt-8 flex justify-end">
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            onPageChange={handlePageChange}
          />
        </section>
      )}
    </main>
  );
}