"use client"

import { ReactNode } from "react"
import { PatientNavBar } from "@/components/patient/nav-bar"

interface PatientLayoutProps {
  children: ReactNode
}

export default function PatientLayout({ children }: PatientLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      {/* Patient-specific top navbar (minimal, calm) */}
      <PatientNavBar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
