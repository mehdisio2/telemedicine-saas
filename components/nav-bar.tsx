"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeartPulse } from "lucide-react"

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/patient/dashboard" },
  { label: "Book Appointment", href: "/patient/appointments/new" },
]

export function NavBar() {
  return (
    <header className="w-full bg-white border-b border-[#E5E5E5] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#2AB3A3]">
            <HeartPulse className="h-5 w-5 text-white" strokeWidth={1.5} />
          </div>
          <span className="text-xl font-semibold tracking-tight text-[#111111]">
            Patient Portal
          </span>
        </div>
        <div className="flex items-center space-x-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="text-[#4A4A4A] hover:text-[#2AB3A3] hover:bg-[#E6F9F0] font-medium px-4 py-2 h-10 rounded-lg transition-colors"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
