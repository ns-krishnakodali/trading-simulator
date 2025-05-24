"use client";

import { JSX } from "react";

import { usePathname } from "next/navigation";

import { ISideNavComponent, SideNavComponent } from "@/components";

const sideNavComponents: ISideNavComponent[] = [
  {
    href: "/",
    title: "Dashboard",
    icon: "home",
  },
  {
    href: "/trade",
    title: "Trade",
    icon: "trade",
  },
  {
    href: "/portfolio",
    title: "Portfolio",
    icon: "portfolio",
  },
  {
    href: "/market-news",
    title: "Market News",
    icon: "news",
  },
];

export const SideNav = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <nav className="w-fit h-screen bg-gray-800">
      <div className="flex items-center justify-center gap-4 bg-gray-900 py-3 px-6">
        <h1 className="text-indigo-400 text-2xl text-center font-bold whitespace-nowrap">
          Trading Simulator
        </h1>
      </div>
      <div className="flex flex-col justify-between h-4/5">
        <div className="flex flex-col gap-4 items-start pt-4 pl-3 pr-6">
          {sideNavComponents.map((component, idx) => (
            <SideNavComponent
              key={idx}
              href={component.href}
              title={component.title}
              icon={component.icon}
              isSelected={pathname === component.href}
            />
          ))}
        </div>
        <div className="text-white border-t border-gray-700 pt-4 pl-3 pr-6">
          <SideNavComponent
            href="/settings"
            title="Settings"
            icon="settings"
            isSelected={pathname === "/settings"}
          />
          <div>User Name</div>
          <div>
            <button>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};
