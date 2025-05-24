"use client";

import Image from "next/image";
import Link from "next/link";

import { JSX } from "react";

export interface ISideNavComponent {
  href: string;
  title: string;
  icon: string;
  isSelected?: boolean;
}

export const SideNavComponent = (
  attributes: ISideNavComponent,
): JSX.Element => {
  const { href, title, icon, isSelected = false } = attributes;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 w-full py-2 pl-4 rounded-lg text-white cursor-pointer
        ${isSelected ? "bg-[#4546E5]" : "hover:bg-gray-700"}`}
    >
      <Image src={`/icons/${icon}.svg`} alt={icon} width={20} height={20} />
      <span className="text-lg">{title}</span>
    </Link>
  );
};
