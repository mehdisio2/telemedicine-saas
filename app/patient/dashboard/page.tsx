"use client"

import { useEffect, useState, useMemo } from "react"
import UpcomingAppointment from "@/components/upcoming-apointment"
import PastAppointment from "@/components/past-apointment"

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  doctorSpecialty: string;
  description: string;
  status?: string;
}

export default function PatientPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch("/api/apointments/view", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      })
      console.log("Appointments response status:", res.status)
      if (!res.ok) throw new Error("Failed to fetch appointments")
      const data = await res.json()
    console.log("Fetched appointments data:", data)
      setAppointments(data.appointments || [])
    } catch (e: any) {
      setError(e.message || "Error loading appointments")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAppointments()
  }, [])

  const { pastAppointments, upcomingAppointments } = useMemo(() => {
    return {
      pastAppointments: appointments.filter(a => a.status?.toLowerCase() === "completed"),
      upcomingAppointments: appointments.filter(a => a.status?.toLowerCase() === "scheduled"),
    }
  }, [appointments])

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-[#111111]">Patient Dashboard</h1>
          <p className="text-sm font-light text-[#888888]">
            Review upcoming and past appointments.
          </p>
        </header>
        
        {error && (
          <div className="rounded-xl border border-[#D9534F]/30 bg-[#D9534F]/10 px-5 py-4 text-sm text-[#D9534F] font-normal">
            {error}
          </div>
        )}
        
        {loading && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="animate-pulse rounded-xl border border-[#E5E5E5] bg-white p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="h-5 w-1/2 bg-[#E5E5E5] rounded" />
              <div className="h-3 w-3/4 bg-[#E5E5E5] rounded" />
              <div className="h-24 w-full bg-[#E5E5E5] rounded" />
            </div>
            <div className="animate-pulse rounded-xl border border-[#E5E5E5] bg-white p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="h-5 w-1/2 bg-[#E5E5E5] rounded" />
              <div className="h-3 w-3/4 bg-[#E5E5E5] rounded" />
              <div className="h-24 w-full bg-[#E5E5E5] rounded" />
            </div>
          </div>
        )}
        
        {!loading && (
          <div className="grid gap-6 md:grid-cols-2">
            <PastAppointment appointments={pastAppointments}/>
            <UpcomingAppointment appointments={upcomingAppointments} />
          </div>
        )}
      </div>
    </div>
  )
}