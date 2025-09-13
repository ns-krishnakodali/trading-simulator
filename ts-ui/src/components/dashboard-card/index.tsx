import "./dashboard-card.css";

import Image from "next/image";
import { type JSX } from "react";

export type TextTone = "positive" | "negative" | "neutral";

interface IDashboardCard {
  id?: string;
  title: string;
  value: string;
  iconSrc: string;
  text: string;
  textTone: TextTone;
}

export const DashboardCard = ({
  id,
  title,
  value,
  iconSrc,
  text,
  textTone = "neutral",
}: IDashboardCard): JSX.Element => {
  const toneColorClasses = {
    positive: {
      bg: "bg-green-200",
      text: "text-green-500",
    },
    negative: {
      bg: "bg-red-200",
      text: "text-red-500",
    },
    neutral: {
      bg: "bg-gray-200",
      text: "text-gray-500",
    },
  };

  return (
    <div
      id={`card-${id}`}
      className="card border bg-white border-gray-100 h-fit rounded-lg font-medium px-6 py-4"
    >
      <h3 className="text-sm text-gray-500">{title}</h3>
      <div className="flex items-center justify-between gap-3">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <div className={`${toneColorClasses[textTone].bg} rounded-full p-2`}>
          <Image src={iconSrc} alt={`${title}-icon`} width={24} height={24} />
        </div>
      </div>
      <div className="flex items-center gap-0.5 mt-2">
        {textTone !== "neutral" && (
          <Image
            src={`/icons/${textTone === "positive" ? "increase" : "decrease"}-arrow.svg`}
            alt={`${title}-icon`}
            width={18}
            height={18}
          />
        )}
        <p className={`text-sm ${toneColorClasses[textTone].text}`}>{text}</p>
      </div>
    </div>
  );
};
