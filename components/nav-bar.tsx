"use client";

import Link from "next/link";
import { useState } from "react";

import { useDoctor } from "@/components/doctor/doctor-context";

type NavBarProps = {
  doctorName?: string;
};

export function NavBar({
  doctorName = "Dr. John Doe",
}: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { availability } = useDoctor();
  const isAvailable = availability === "available";

  return (
    <header className="w-full bg-white border-b border-[#E5E5E5]">
      {/* Height: 56–64px; using responsive 56px on mobile, 64px on md+ */}
      <div className="h-14 md:h-16 px-4 md:px-6 flex items-center justify-between">
        {/* Left: Brand + Page Context */}
        <div className="flex items-center gap-3">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#2AB3A3] text-white flex size-8 items-center justify-center rounded-md">
              {/* Brand mark */}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h3l2-5 3 10 2-5h6" />
              </svg>
            </div>
            <span className="text-sm md:text-base font-semibold text-[#111111]">
              TeleMed
            </span>
          </Link>

          {/* Optional page context (breadcrumb/title placeholder) */}
          {/* <span className="text-sm text-[#888888]">/ Doctor Dashboard</span> */}
        </div>

        {/* Right: Availability badge, Notifications, Profile dropdown */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Availability status indicator (passive) */}
          <div
            className={`hidden sm:flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${isAvailable ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
              }`}
            aria-live="polite"
          >
            <span
              className={`inline-block size-2.5 rounded-full ${isAvailable ? "bg-green-500" : "bg-gray-400"
                }`}
              aria-hidden="true"
            />
            <span>{isAvailable ? "Available" : "Offline"}</span>
          </div>

          {/* Notifications icon */}
          <button
            type="button"
            className="relative p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2AB3A3]"
            aria-label="Notifications"
          >
            {/* Bell icon */}
            <svg
              className="w-5 h-5 text-[#4A4A4A]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082A4.001 4.001 0 0 1 8 15v-2.586a7 7 0 1 1 14 0V15a4.001 4.001 0 0 1-6.857 2.082Z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20h6" />
            </svg>

            {/* Unread indicator (placeholder) */}
            {/* <span className="absolute -top-0.5 -right-0.5 inline-block size-2.5 rounded-full bg-red-500" /> */}
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2AB3A3]"
              onClick={() => setMenuOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              {/* Avatar */}
              <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-500">DR</span>
              </div>
              {/* Name */}
              <span className="hidden sm:inline text-sm font-medium text-[#111111]">
                {doctorName}
              </span>
              {/* Caret */}
              <svg
                className="w-4 h-4 text-[#4A4A4A]"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg p-1"
              >
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-[#111111]">{doctorName}</p>
                  <p className="text-xs text-[#888888]">Doctor</p>
                </div>
                <Link
                  href="/doctor/settings"
                  role="menuitem"
                  className="block px-3 py-2 rounded-md text-sm text-[#111111] hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Account settings
                </Link>
                <button
                  role="menuitem"
                  className="w-full text-left px-3 py-2 rounded-md text-sm text-[#D92D20] hover:bg-red-50"
                  onClick={() => {
                    setMenuOpen(false);
                    // TODO: wire logout
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
