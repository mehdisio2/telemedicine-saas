"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", appointments: 45 },
  { month: "February", appointments: 52 },
  { month: "March", appointments: 48 },
  { month: "April", appointments: 61 },
  { month: "May", appointments: 55 },
  { month: "June", appointments: 67 },
];

const chartConfig = {
  appointments: {
    label: "Appointments",
    color: "#2AB3A3", // Your brand teal
  },
} satisfies ChartConfig;

export function AppointmentsBarChart() {
  return (
    <div className="w-full h-full flex flex-col">
      <ChartContainer config={chartConfig} className="flex-1">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} stroke="#E5E5E5" />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            className="text-[#888888] text-xs"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar
            dataKey="appointments"
            fill="#2AB3A3"
            radius={8}
          />
        </BarChart>
      </ChartContainer>
      <div className="flex flex-col gap-2 pt-4 border-t border-gray-100 text-sm">
        <div className="flex gap-2 leading-none font-medium text-[#111111]">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-[#2AB3A3]" />
        </div>
        <div className="text-[#888888] leading-none text-xs">
          Showing total appointments for the last 6 months
        </div>
      </div>
    </div>
  );
}