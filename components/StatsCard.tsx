import React from "react";
import { NumberTicker } from "@/components/ui/number-ticker";

interface StatsCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <div className="flex-1 rounded-xl border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-black/60 dark:border-white/10">
      <div className="flex items-center gap-4 p-4">
        <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#E6F9F0] text-[#2AB3A3] ring-1 ring-[#2AB3A3]/10">
          {icon}
        </span>
        <div>
          <div className="text-2xl font-semibold tracking-tight">
            <span className="text-[#2AB3A3]">
              <NumberTicker value={value} />
            </span>
            <span className="text-[#2AB3A3]">+</span>
          </div>
          <p className="text-sm text-[#4A4A4A] font-medium mt-0.5">
            {label}
          </p>
        </div>
      </div>

    </div>
  );
}