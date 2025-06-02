import "./dashboard-card.css";

import Image from "next/image";
import { JSX } from "react";

type TextTone = "positive" | "negative" | "neutral";

interface IDashboardCard {
  id: string;
  title: string;
  value: string;
  iconSrc: string;
  iconClass?: string;
  text: string;
  textTone?: TextTone;
}

export const DashboardCard = ({
  id,
  title,
  value,
  iconSrc,
  iconClass,
  text,
  textTone = "neutral",
}: IDashboardCard): JSX.Element => {
  const toneColors = {
    positive: "green",
    negative: "red",
    neutral: "gray",
  };

  return (
    <div
      id={`card-${id}`}
      className="card border border-gray-100 h-fit rounded-lg font-medium pt-3 pb-6 px-6"
    >
      <h3 className="text-sm text-gray-500">{title}</h3>
      <div className="flex items-center gap-2">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <div className={`bg-${toneColors[textTone]}-200 rounded-full p-2`}>
          <Image
            src={iconSrc}
            alt={`${title}-icon`}
            className={`${iconClass}`}
            width={24}
            height={24}
          />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-2">
        {textTone !== "neutral" && (
          <Image
            src={`/icons/${textTone === "positive" ? "increase" : "decrease"}-arrow.svg`}
            alt={`${title}-icon`}
            className={iconClass}
            width={16}
            height={16}
          />
        )}
        <p className={`text-sm text-${toneColors[textTone]}-500`}>{text}</p>
      </div>
    </div>
  );
};
