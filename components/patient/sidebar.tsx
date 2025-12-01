"use client";

import Image from "next/image";

/**
 * PatientSidebar
 * - Matches the doctor's sidebar styling (teal header, avatar overlap)
 * - Shows patient name and ID
 * - Bottom navigation: Appointments, Settings
 */
export function PatientSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header with medical teal gradient and subtle pattern */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-[#2AB3A3] to-[#1F8478]">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 130">
              {/* Unique pattern id to avoid collisions */}
              <pattern id="medical-pattern-patient" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 10v10m-5-5h10" stroke="white" strokeWidth="2" fill="none" />
              </pattern>
              <rect width="400" height="130" fill="url(#medical-pattern-patient)" />
            </svg>
          </div>
        </div>

        {/* Avatar overlapping header */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-14">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
              <Image
                src="/images/patient-avatar.jpg"
                alt="Patient profile"
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Verification badge */}
            <div className="absolute bottom-1 right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Info */}
      <div className="pt-16 pb-6 px-6 text-center border-b border-gray-200">
        <h3 className="text-xl font-semibold text-[#111111]">John Doe</h3>
        <p className="text-sm text-[#888888] mt-1">Patient ID: #12345</p>
      </div>

      {/* Bottom Navigation */}
      <nav className="flex-1 flex flex-col gap-2 p-6 mt-auto">
        <a
          href="/patient/appointments"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#4A4A4A] hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Appointments
        </a>
        <a
          href="/patient/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#4A4A4A] hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </a>
      </nav>
    </aside>
  );
}