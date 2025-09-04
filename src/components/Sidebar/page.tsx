import React from "react";
import Image from "next/image";
import Link from "next/link";

const sidebarData = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: "/assets/icons/dashboard.svg",
    icongray: "/assets/icons/dashboardgray.svg",
  },
  {
    title: "User Management",
    path: "/admin/users",
    icon: "/assets/icons/user.svg",
    icongray: "/assets/icons/usergray.svg",
  },
  {
    title: "Earning",
    path: "/admin/venues",
    icon: "/assets/icons/earning.svg",
    icongray: "/assets/icons/earninggray.svg",
  },
  {
    title: "Video Management",
    path: "/admin/venue-wallet",
    icon: "/assets/icons/video.svg",
    icongray: "/assets/icons/videogray.svg",
  },
  {
    title: "Manage Subscription",
    path: "/admin/venue-wallet",
    icon: "/assets/icons/subscription.svg",
    icongray: "/assets/icons/subscriptiongray.svg",
  },
  {
    title: "Notifications",
    path: "/admin/earnings",
    icon: "/assets/icons/notification.svg",
    icongray: "/assets/icons/notificationgray.svg",
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: "/assets/icons/settings.svg",
    icongray: "/assets/icons/settingsgray.svg",
  },
];

export default function Sidebar() {
  return (
    <main className="flex flex-col w-[250px] px-4 gap-10 pt-[30px]  shadow-[4px_0px_8px_rgba(0,0,0,0.1)] min-h-screen">
      <section className="flex justify-between">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          height={53}
          width={53}
        />
        <Image src="/assets/icons/dash.svg" alt="dash" height={6} width={18} />
      </section>
      <section className="items-center space-y-5 w-full">
        {sidebarData.map((data, ind) => (
          <Link
            href={data.path}
            className="flex gap-2 rounded-sm hover:bg-[#083D70] p-3"
            key={ind}
          >
            <Image
              src={data.icongray}
              alt={data.title}
              width={24}
              height={24}
            />
            <h1 className="">{data.title}</h1>
          </Link>
        ))}
      </section>
    </main>
  );
}
