"use client";

import { NumberTicker } from "@/components/ui/number-ticker"; // adjust if your file is named "number-tciker"

type TotalPatientsCardProps = {
  total: number;
  deltaMonthly?: number;
};

export function TotalPatientsCard({ total, deltaMonthly }: TotalPatientsCardProps) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-[#111111] mb-4">Total Patients</h2>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-4xl font-bold text-[#2AB3A3]">
            <NumberTicker value={total} />
          </div>
          {typeof deltaMonthly === "number" && (
            <p className="text-sm text-[#888888] mt-1">
              {deltaMonthly >= 0 ? `+${deltaMonthly}` : deltaMonthly} this month
            </p>
          )}
        </div>
        <div className="w-16 h-16 rounded-full bg-[#E6F9F0] flex items-center justify-center">
          {/* Icon placeholder */}
          <span className="text-2xl">👥</span>
        </div>
      </div>
    </section>
  );
}