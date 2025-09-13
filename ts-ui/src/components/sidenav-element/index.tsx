"use client";

import Image from "next/image";
import Link from "next/link";
import { type JSX } from "react";

export interface ISideNavElement {
  href: string;
  name: string;
  icon: string;
  isSelected?: boolean;
  isExpanded?: boolean;
}

export const SideNavElement = ({
  href,
  name,
  icon,
  isSelected = false,
  isExpanded = true,
}: ISideNavElement): JSX.Element => {
  return (
    <Link
      href={href}
      className={`flex items-center justify-start w-full py-2 px-4 rounded-lg text-white transition-colors
        ${isSelected ? "bg-blue-600" : "hover:bg-slate-700"}`}
    >
      <Image
        src={`/icons/${icon}.svg`}
        alt={icon}
        className="min-w-[20px]"
        width={20}
        height={20}
      />
      {isExpanded && (
        <span className="ml-3 text-lg hidden md:inline whitespace-nowrap">
          {name}
        </span>
      )}
    </Link>
  );
};
