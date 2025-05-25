"use client";

import { JSX, useEffect, useState } from "react";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { ISideNavComponent, SideNavComponent } from "@/components";

const sideNavComponents: ISideNavComponent[] = [
  { href: "/dashboard", title: "Dashboard", icon: "home" },
  { href: "/trade", title: "Trade", icon: "trade" },
  { href: "/portfolio", title: "Portfolio", icon: "portfolio" },
  { href: "/market-news", title: "Market News", icon: "news" },
  { href: "/settings", title: "Settings", icon: "settings" },
];

interface ISideNav {
  userName?: string;
  email?: string;
  dpSrc?: string;
}

export const SideNav = ({ userName, email, dpSrc }: ISideNav): JSX.Element => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  useEffect(() => {
    setIsExpanded(window?.innerWidth >= 768);
  }, []);

  const toggleSideNav = (): void => setIsExpanded((prev) => !prev);

  const flexCenter: string = "flex items-center justify-center";

  return (
    <nav
      className={`relative top-0 left-0 h-screen ${
        isExpanded ? "w-64" : "w-20"
      } bg-gray-800 overflow-hidden z-50 transition-all duration-300`}
    >
      <div className={`${flexCenter} gap-4 bg-gray-900 py-3 px-6`}>
        <h1
          className={`text-blue-500 text-2xl font-bold whitespace-nowrap transition-opacity duration-200 ${
            isExpanded ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
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
              isExpanded={isExpanded}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 text-white border-t border-gray-700 p-4">
          <div className="flex items-center justify-start mb-3 gap-2 w-full">
            <div
              className={`${flexCenter} w-10 h-10 rounded-full border-2 border-gray-300 overflow-hidden`}
            >
              <Image
                src={dpSrc ?? "/icons/user.svg"}
                alt="User"
                width={24}
                height={24}
              />
            </div>
            <div className={`hidden ${isExpanded && "md:inline"}`}>
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-gray-400">{email}</p>
            </div>
          </div>
          <button
            className={`${flexCenter} w-full gap-2.5 bg-gray-500 text-base text-white font-semibold py-2 rounded-lg`}
          >
            <span className={`hidden ${isExpanded && "md:inline"}`}>
              Logout
            </span>
            <Image
              src="/icons/log-out.svg"
              alt="Log Out"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
      <div
        className="absolute bottom-4 right-4 cursor-pointer hidden md:inline"
        onClick={toggleSideNav}
      >
        <Image
          src={`/icons/${isExpanded ? "collapse" : "expand"}.svg`}
          alt={isExpanded ? "Collapse" : "Expand"}
          width={30}
          height={30}
        />
      </div>
    </nav>
  );
};
