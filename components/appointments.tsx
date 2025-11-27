"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Apointment } from "@/components/apointment"

export type DoctorAppointment = {
  id: string;
  date: string;
  time: string;
  patientName: string;
  status?: string;
}

export type PatientAppointment = {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  doctorSpecialty: string;
  description: string;
  status?: string;
}

type AnyAppointment = DoctorAppointment | PatientAppointment

interface AppointmentsProps {
  title: string
  description?: string
  appointments: AnyAppointment[]
  emptyText?: string
}

export default function Appointments({ 
  title, 
  description, 
  appointments, 
  emptyText = "No appointments to show." 
}: AppointmentsProps) {
  return (
    <Card className="w-full h-auto border border-[#E5E5E5] bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-xl font-semibold text-[#111111]">{title}</CardTitle>
        {description ? (
          <CardDescription className="text-sm font-light text-[#888888]">
            {description}
          </CardDescription>
        ) : null}
      </CardHeader>

      <CardContent className="space-y-0">
        {appointments.length === 0 ? (
          <p className="text-sm text-[#888888] font-light">{emptyText}</p>
        ) : (
          <div className="space-y-0">
            {appointments.map((a) => (
              <Apointment key={a.id} appointment={a} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}