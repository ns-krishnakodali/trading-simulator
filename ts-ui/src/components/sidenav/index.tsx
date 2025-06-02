"use client";

import { JSX, useEffect, useState } from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { ISideNavElement, SideNavElement } from "@/components";
import { removeAuthToken } from "@/utils";

const sideNavComponents: ISideNavElement[] = [
  { href: "/dashboard", name: "Dashboard", icon: "home" },
  { href: "/portfolio", name: "Portfolio", icon: "portfolio" },
  { href: "/stocks", name: "Stocks", icon: "stocks" },
  { href: "/commodities", name: "Commodities", icon: "commodities" },
  { href: "/backtest", name: "Backtest Strategies", icon: "backtest" },
  { href: "/settings", name: "Settings", icon: "settings" },
];

interface ISideNav {
  username?: string;
  email?: string;
  dpSrc?: string;
}

export const SideNav = ({ username, email, dpSrc }: ISideNav): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  useEffect(() => {
    setIsExpanded(window?.innerWidth >= 768);
  }, []);

  const toggleSideNav = (): void => setIsExpanded((prev) => !prev);

  const handleLogout = (): void => {
    removeAuthToken();
    router.replace("/login");
  };

  const flexCenter: string = "flex items-center justify-center";

  return (
    <nav
      className={`relative top-0 left-0 h-screen ${
        isExpanded ? "w-64" : "w-20"
      } bg-slate-800 overflow-hidden z-50 transition-all duration-300`}
    >
      <div
        className={`hidden md:flex ${flexCenter} gap-4 bg-slate-900 py-3 px-6`}
      >
        <h1 className="text-blue-400 text-2xl font-bold whitespace-nowrap transition-opacity duration-200">
          {isExpanded ? <>Trading Simulator</> : <>TS</>}
        </h1>
      </div>
      <div className="flex flex-col justify-between h-5/6">
        <div className="flex flex-col gap-4 items-start pt-4 pl-3 pr-6">
          {sideNavComponents.map((component, idx) => (
            <SideNavElement
              key={idx}
              href={component.href}
              name={component.name}
              icon={component.icon}
              isSelected={pathname === component.href}
              isExpanded={isExpanded}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4 text-white border-t border-slate-700 p-4">
          <div className="flex items-center justify-start mb-3 gap-2 w-full">
            <div
              className={`${flexCenter} w-10 h-10 rounded-full border-2 border-slate-300 overflow-hidden`}
            >
              <Image
                src={dpSrc ?? "/icons/user.svg"}
                alt="User"
                width={24}
                height={24}
              />
            </div>
            <div className={`hidden ${isExpanded && "md:inline"}`}>
              <p className="text-sm font-medium">{username}</p>
              <p className="text-xs text-slate-400">{email}</p>
            </div>
          </div>
          <button
            type="button"
            className={`${flexCenter} w-full gap-2.5 bg-slate-500 text-base text-red-800 font-semibold py-2 rounded-lg cursor-pointer`}
            onClick={handleLogout}
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
