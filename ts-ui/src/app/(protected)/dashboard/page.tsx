import { JSX } from "react";

import { DashboardCard, TextTone } from "@/components";
import { dashboardCardDetails } from "@/utils";

const DashboardPage = (): JSX.Element => {
  return (
    <div className="h-full w-full px-10 py-5">
      <h1 className="text-center text-2xl font-bold text-gray-600 mb-8">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardCardDetails.map((details, idx) => (
          <DashboardCard
            key={idx}
            iconSrc={details.iconSrc}
            title={details.title}
            value={details.value}
            text={details.text}
            textTone={details.textTone as TextTone}
          />
        ))}
        {/* <DashboardCard
          iconSrc="/icons/dollar.svg"
          title="Portfolio Value"
          value="$125,670.50"
          text="+2.5% last 24h"
          textTone="positive"
        />
        <DashboardCard
          iconSrc="/icons/trending-down.svg"
          title="Overall P/L"
          value="-$1,230.10"
          text="-0.98% all time"
          textTone="negative"
        />
        <DashboardCard
          iconSrc="/icons/wallet.svg"
          title="Available Cash"
          value="$50,000.00"
          text="Ready to Invest"
          textTone="neutral"
        />
        <DashboardCard
          iconSrc="/icons/repeat.svg"
          title="Total Trades"
          value="152"
          text="In the last month"
          textTone="neutral"
        /> */}
      </div>
    </div>
  );
};

export default DashboardPage;
