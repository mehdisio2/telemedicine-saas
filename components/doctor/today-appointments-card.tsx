"use client";

import { NumberTicker } from "@/components/ui/number-ticker";

type TodayAppointmentsCardProps = {
  count: number;
  delta?: number; // change vs yesterday (optional)
};

export function TodayAppointmentsCard({ count, delta }: TodayAppointmentsCardProps) {
  const deltaLabel =
    typeof delta === "number"
      ? `${delta >= 0 ? `+${delta}` : delta} vs yesterday`
      : undefined;

  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-[#111111] mb-4">Today’s Appointments</h2>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-4xl font-bold text-[#2AB3A3]">
            <NumberTicker value={count} />
          </div>
          {deltaLabel && <p className="text-sm text-[#888888] mt-1">{deltaLabel}</p>}
        </div>
        <div className="w-16 h-16 rounded-full bg-[#E6F9F0] flex items-center justify-center">
          {/* Calendar icon */}
          <svg
            className="w-7 h-7 text-[#2AB3A3]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4M3 10h18M4 6h16a1 1 0 0 1 1 1v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}