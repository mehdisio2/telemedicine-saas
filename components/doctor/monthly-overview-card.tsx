"use client";

import { AppointmentsBarChart } from "./appointments-bar-chart";

type MonthlyOverviewCardProps = {
  title?: string;
  heightClass?: string;
};

export function MonthlyOverviewCard({
  title = "Monthly Overview",
  heightClass = "h-96",
}: MonthlyOverviewCardProps) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-[#111111] mb-4">{title}</h2>
      <div className={`${heightClass} flex flex-col`}>
        <AppointmentsBarChart />
      </div>
    </section>
  );
}