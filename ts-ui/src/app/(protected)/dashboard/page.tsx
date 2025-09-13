import { type JSX } from "react";

import { DashboardCard, PageHeading, TextTone } from "@/components";
import { dashboardCardDetails } from "@/utils";

const DashboardPage = (): JSX.Element => {
  return (
    <div className="h-full w-full px-10 py-5">
      <PageHeading heading="Dashboard" />
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
      </div>
    </div>
  );
};

export default DashboardPage;
