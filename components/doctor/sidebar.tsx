"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DoctorSidebar() {
  const [availability, setAvailability] = useState<"available" | "unavailable">("available");

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
      {/* Doctor Profile Section */}
      <div className="flex flex-col items-center gap-4 pb-6 border-b border-gray-200">
        {/* Profile Avatar - Component placeholder */}
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
          {/* <DoctorAvatar /> */}
          <span className="text-gray-400 text-sm">Avatar</span>
        </div>

        {/* Doctor Name & Specialty - Component placeholder */}
        <div className="text-center">
          {/* <DoctorInfo name="Dr. John Doe" specialty="Cardiologist" /> */}
          <h3 className="font-semibold text-[#111111]">Dr. John Doe</h3>
          <p className="text-sm text-[#888888]">Cardiologist</p>
        </div>

        {/* Availability Select - Component placeholder */}
        <div className="w-full">
          {/* <AvailabilityToggle /> */}
          <Select value={availability} onValueChange={(val) => setAvailability(val as "available" | "unavailable")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unavailable">Not Available</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 flex flex-col gap-2 mt-6">
        {/* <DashboardNav /> */}
        <a
          href="/doctor/dashboard"
          className="px-4 py-2 rounded-lg bg-[#E6F9F0] text-[#2AB3A3] font-medium"
        >
          Dashboard
        </a>
        <a
          href="/doctor/appointments"
          className="px-4 py-2 rounded-lg text-[#4A4A4A] hover:bg-gray-100"
        >
          Appointments
        </a>
        <a
          href="/doctor/settings"
          className="px-4 py-2 rounded-lg text-[#4A4A4A] hover:bg-gray-100"
        >
          Settings
        </a>
      </nav>
    </aside>
  );
}