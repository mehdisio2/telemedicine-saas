"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, FileText } from "lucide-react";
import type { Appointment } from "./past-apointment";
import { useState } from "react";

// Badge component styled with medical theme
function Badge(props: any) {
  const { children, variant = "default", className = "" } = props;
  const base = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-normal";
  const variants: Record<string, string> = {
    scheduled: "bg-[#4CAF50] text-white",
    upcoming: "bg-[#4CAF50] text-white",
    completed: "bg-[#C4C4C4] text-white",
    cancelled: "bg-[#D9534F] text-white",
  };
  const variantClass = variants[variant] ?? "bg-[#E5E5E5] text-[#4A4A4A]";
  return <span className={`${base} ${variantClass} ${className}`}>{children}</span>;
}

interface ApointmentProps {
  appointment: Appointment;
}

export function Apointment({ appointment }: ApointmentProps) {
  const isPast = appointment.status === "completed" || appointment.status === "cancelled";
  const badgeVariant = appointment.status?.toLowerCase() || "default";

  const [descExpanded, setDescExpanded] = useState(false);

  return (
    <Card
      className="mb-4 border border-[#E5E5E5] bg-white rounded-xl transition-all duration-200
                 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-[#2AB3A3]/30"
    >
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          {/* Left - Date, Time, Status (top on mobile) */}
          <div className="flex flex-col gap-2 min-w-[120px]">
            <div className="text-sm font-medium text-[#111111]">
              {appointment.date}
            </div>
            <div className="text-sm text-[#888888] font-normal">
              {appointment.time}
            </div>
            <Badge 
              variant={badgeVariant}
              className="w-fit"
            >
              {appointment.status}
            </Badge>
          </div>

          {/* Center - Doctor info and description */}
          <div className="flex-1 flex flex-col gap-1">
            <h3 className="text-base font-medium text-[#111111]">
              Dr. {appointment.doctorName}
            </h3>
            <p className="text-sm text-[#888888] font-light">
              {appointment.doctorSpecialty}
            </p>
            <p
              className={`text-sm text-[#4A4A4A] font-light mt-1 ${
                descExpanded ? "line-clamp-none" : "line-clamp-1 sm:line-clamp-none"
              }`}
            >
              {appointment.description}
            </p>
            {/* Expand/collapse control (mobile only) */}
            <button
              type="button"
              className="sm:hidden text-xs text-[#2AB3A3] hover:underline w-fit mt-1 font-normal"
              aria-expanded={descExpanded}
              onClick={() => setDescExpanded((v) => !v)}
            >
              {descExpanded ? "Show less" : "Show more"}
            </button>
          </div>

          {/* Right - Action (full-width on mobile) */}
          <div className="flex w-full sm:w-auto sm:items-center sm:justify-end">
            {isPast ? (
              <Button 
                variant="outline" 
                className="gap-2 w-full sm:w-auto h-10 rounded-lg border border-[#2AB3A3] text-[#2AB3A3] bg-white hover:bg-[#E6F9F0] font-medium"
              >
                <FileText className="h-[18px] w-[18px]" strokeWidth={1.5} />
                Notes
              </Button>
            ) : (
              <Button 
                className="gap-2 w-full sm:w-auto h-10 rounded-lg bg-[#2AB3A3] text-white hover:bg-[#1F8478] font-medium"
              >
                <Video className="h-[18px] w-[18px]" strokeWidth={1.5} />
                Join Call
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}