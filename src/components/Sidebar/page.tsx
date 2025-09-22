import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const sidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "/assets/icons/dashboard.svg",
    icongray: "/assets/icons/gray/dashboardgray.svg",
  },
  {
    title: "User Management",
    path: "/users",
    icon: "/assets/icons/user.svg",
    icongray: "/assets/icons/gray/usergray.svg",
  },
  {
    title: "Earning",
    path: "/earnings",
    icon: "/assets/icons/earning.svg",
    icongray: "/assets/icons/gray/earninggray.svg",
  },
  {
    title: "Video Management",
    path: "/video",
    icon: "/assets/icons/video.svg",
    icongray: "/assets/icons/gray/videogray.svg",
  },
  {
    title: "Manage Subscription",
    path: "/subscription",
    icon: "/assets/icons/subscription.svg",
    icongray: "/assets/icons/gray/subscriptiongray.svg",
  },
  {
    title: "Notifications",
    path: "/notification",
    icon: "/assets/icons/notification.svg",
    icongray: "/assets/icons/gray/notificationgray.svg",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: "/assets/icons/settings.svg",
    icongray: "/assets/icons/gray/settingsgray.svg",
  },
];

export default function Sidebar() {
  const [hoverStates, setHoverStates] = useState<boolean[]>(
    new Array(sidebarData.length).fill(false)
  );

  const handleMouseEnter = (index: number) => {
    setHoverStates((prev) => {
      const newHoverStates = [...prev];
      newHoverStates[index] = true;
      return newHoverStates;
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoverStates((prev) => {
      const newHoverStates = [...prev];
      newHoverStates[index] = false;
      return newHoverStates;
    });
  };

  return (
    <main className="flex flex-col min-w-[300px] shadow-[4px_0px_8px_rgba(0,0,0,0.1)] min-h-screen overflow-y-hidden">
      <section className="px-8 py-5 space-y-4 w-full border-b-[1px] border-b-border">
        {sidebarData.map((data, ind) => (
          <Link
            href={data.path}
            className="flex gap-2 rounded-sm font-normal pl-2 py-3 hover:bg-gradient-to-b hover:from-button hover:to-button2 text-primary hover:text-white"
            key={ind}
            onMouseEnter={() => handleMouseEnter(ind)}
            onMouseLeave={() => handleMouseLeave(ind)}
          >
            <Image
              src={hoverStates[ind] ? data.icon : data.icongray}
              alt={data.title}
              width={24}
              height={24}
            />
            <h1 className="">{data.title}</h1>
          </Link>
        ))}
      </section>
      <Link href="/login" className="flex gap-2 pl-10 py-5 space-y-4 w-full">
        <Image
          src="/assets/icons/logout.svg"
          alt="logout"
          width={24}
          height={24}
        />
        <h1 className="text-logout font-semibold">Logout</h1>
      </Link>
    </main>
  );
}
