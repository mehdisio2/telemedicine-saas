"use client"

import { ReactNode } from "react"
import { NavBar } from "@/components/nav-bar"

interface PatientLayoutProps {
  children: ReactNode
}

export default function PatientLayout({ children }: PatientLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <NavBar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
