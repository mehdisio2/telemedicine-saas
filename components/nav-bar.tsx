"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

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
    <header className="w-full bg-gray-900 text-white shadow-md relative ">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <div className="text-lg font-bold">Patient Portal</div>
        <div className="flex items-center space-x-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" className="text-white hover:bg-blue-100">
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      
      </nav>
    </header>
  )
}
