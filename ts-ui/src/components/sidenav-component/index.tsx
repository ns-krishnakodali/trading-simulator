"use client";

import Image from "next/image";
import Link from "next/link";

import { JSX } from "react";

export interface ISideNavComponent {
  href: string;
  title: string;
  icon: string;
  isSelected?: boolean;
  isExpanded?: boolean;
}

export const SideNavComponent = ({
  href,
  title,
  icon,
  isSelected = false,
  isExpanded = true,
}: ISideNavComponent): JSX.Element => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 w-full py-2 pl-4 rounded-lg text-white cursor-pointer
        ${isSelected ? "bg-blue-600" : "hover:bg-slate-700"}`}
    >
      <Image src={`/icons/${icon}.svg`} alt={icon} width={20} height={20} />
      {isExpanded && <span className="hidden md:inline text-lg">{title}</span>}
    </Link>
  );
};
