"use client"

import { ReactNode } from "react"
import { NavBar } from "@/components/nav-bar"

interface PatientLayoutProps {
  children: ReactNode
}

export default function PatientLayout({ children }: PatientLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navigation bar */}
      <NavBar />

      {/* Page content */}
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  )
}
