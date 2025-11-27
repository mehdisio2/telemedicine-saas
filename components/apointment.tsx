"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, FileText, Eye } from "lucide-react"
import { useState } from "react"
import type { DoctorAppointment, PatientAppointment } from "@/components/appointments"

type AnyAppointment = DoctorAppointment | PatientAppointment

function Badge(props: any) {
  const { children, variant = "default", className = "" } = props
  const base = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-normal"
  const variants: Record<string, string> = {
    scheduled: "bg-[#4CAF50] text-white",
    upcoming: "bg-[#4CAF50] text-white",
    completed: "bg-[#C4C4C4] text-white",
    cancelled: "bg-[#D9534F] text-white",
    default: "bg-[#E5E5E5] text-[#4A4A4A]",
  }
  const variantClass = variants[variant] ?? variants.default
  return <span className={`${base} ${variantClass} ${className}`}>{children}</span>
}

interface ApointmentProps {
  appointment: AnyAppointment
}

const isDoctorAppointment = (a: AnyAppointment): a is DoctorAppointment => "patientName" in a

export function Apointment({ appointment }: ApointmentProps) {
  const status = appointment.status?.toLowerCase() ?? "default"
  const isPast = status === "completed" || status === "cancelled"

  const [descExpanded, setDescExpanded] = useState(false)

  // PatientAppointment layout (existing UX)
  if (!isDoctorAppointment(appointment)) {
    return (
      <Card className="mb-4 border border-[#E5E5E5] bg-white rounded-xl transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-[#2AB3A3]/30">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            {/* Left - Date, Time, Status */}
          <div className="flex flex-col gap-2 min-w-[120px]">
              <div className="text-sm font-medium text-[#111111]">{appointment.date}</div>
              <div className="text-sm text-[#888888] font-normal">{appointment.time}</div>
              <Badge variant={status} className="w-fit">{appointment.status}</Badge>
            </div>

            {/* Middle - Doctor info and description */}
           <div className="flex-1 flex flex-col gap-1">
              <h3 className="text-base font-medium text-[#111111]">Dr. {appointment.doctorName}</h3>
              <p className="text-sm text-[#888888] font-light">{appointment.doctorSpecialty}</p>
              {"description" in appointment && appointment.description ? (
                <>
                  <p
                    className={`text-sm text-[#4A4A4A] font-light mt-1 ${
                      descExpanded ? "line-clamp-none" : "line-clamp-1 sm:line-clamp-none"
                    }`}
                  >
                    {appointment.description}
                  </p>
                  <button
                    type="button"
                    className="sm:hidden text-xs text-[#2AB3A3] hover:underline w-fit mt-1 font-normal"
                    aria-expanded={descExpanded}
                    onClick={() => setDescExpanded((v) => !v)}
                  >
                    {descExpanded ? "Show less" : "Show more"}
                  </button>
                </>
              ) : null}
            </div>

            {/* Right - Action */}
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
                <Button className="gap-2 w-full sm:w-auto h-10 rounded-lg bg-[#2AB3A3] text-white hover:bg-[#1F8478] font-medium">
                  <Video className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  Join Call
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // DoctorAppointment layout:
  // Left: Patient identity and appointment metadata
  // Middle: Date and time information
  // Right: Status + action button (“View”)
  return (
    <Card className="mb-4 border border-[#E5E5E5] bg-white rounded-xl transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-[#2AB3A3]/30">
      <CardContent className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:items-center">
          {/* Left: Patient identity and metadata */}
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium text-[#111111]">{appointment.patientName}</h3>
            {/* Optional future metadata slots (e.g., MRN, reason) */}
            <div className="text-xs text-[#888888]">Appointment</div>
          </div>

          {/* Middle: Date and time */}
          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium text-[#111111]">{appointment.date}</div>
            <div className="text-sm text-[#888888] font-normal">{appointment.time}</div>
          </div>

          {/* Right: Status + action */}
          <div className="flex sm:justify-end sm:items-center gap-3">
            <Badge variant={status}>{appointment.status}</Badge>
            <Button
              variant={isPast ? "outline" : "default"}
              className={`gap-2 h-9 rounded-lg ${
                isPast
                  ? "border border-[#2AB3A3] text-[#2AB3A3] bg-white hover:bg-[#E6F9F0]"
                  : "bg-[#2AB3A3] text-white hover:bg-[#1F8478]"
              }`}
            >
              <Eye className="h-[18px] w-[18px]" strokeWidth={1.5} />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}