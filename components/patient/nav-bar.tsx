"use client";

import { usePatient } from "@/components/patient/patient-context";
import Link from "next/link";
import Image from "next/image";

/**
 * PatientNavBar
 * - Sits above the sidebar+main layout
 * - Left: Brand logo with medical icon
 * - Center: empty (keeps UI calm)
 * - Right: patient avatar + name, optional: notifications and help icons
 * - Theme: white bar, light grey border, clinical outline icons
 */
export function PatientNavBar() {
  const { patientData } = usePatient();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="h-16 px-8 flex items-center">
        {/* Left: Brand with icon (small, unobtrusive) */}
        <div className="shrink-0">
          <Link href="/" className="flex items-center gap-2">
            {/* Brand icon */}
            <div className="bg-[#2AB3A3] text-white flex size-8 items-center justify-center rounded-md">
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
            {/* Brand name */}
            <span className="text-lg font-semibold text-[#111111] hover:opacity-90">
              TelemedCare
            </span>
          </Link>
        </div>

        {/* Center: empty by design */}
        <div className="flex-1" />

        {/* Right: optional icons + patient identity */}
        <div className="flex items-center gap-4">
          {/* Notifications (optional) */}
          <button
            type="button"
            aria-label="Notifications"
            className="p-2 rounded-lg hover:bg-gray-100 text-[#4A4A4A] transition-colors relative"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082A2.999 2.999 0 0112 19a2.999 2.999 0 01-2.857-1.918M21 19H3l2.243-2.243A4 4 0 006 14V9a6 6 0 1112 0v5c0 .53.211 1.039.586 1.414L21 19z" />
            </svg>
            {/* Notification badge */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D9534F] rounded-full"></span>
          </button>

          {/* Help (optional) */}
          <button
            type="button"
            aria-label="Help"
            className="p-2 rounded-lg hover:bg-gray-100 text-[#4A4A4A] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Settings */}
          <Link
            href="/patient/settings"
            aria-label="Settings"
            className="p-2 rounded-lg hover:bg-gray-100 text-[#4A4A4A] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200" />

          {/* Patient avatar + name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm">
              <Image
                src={patientData.avatar || "/images/patient-avatar.jpg"}
                alt="Patient avatar"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#111111]">{patientData.name}</span>
              <span className="text-xs text-[#888888]">Patient</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}