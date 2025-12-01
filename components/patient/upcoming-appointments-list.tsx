"use client";
import React from "react";

/**
 * UpcomingAppointmentsList
 * - Themed card that lists upcoming appointments.
 * - Uses Success and Primary Light colors per UI theme.
 */
export type UpcomingAppointment = {
  doctor: string;     // e.g. "Dr. Sarah Smith"
  reason: string;     // e.g. "General Checkup"
  datetime: string;   // e.g. "December 5, 2025 - 10:00 AM"
  href?: string;      // optional link to appointment details
};

type Props = {
  title?: string;                 // defaults to "Upcoming Appointments"
  items: UpcomingAppointment[];   // appointment rows
};

export function UpcomingAppointmentsList({ title = "Upcoming Appointments", items }: Props) {
  return (
    <section className="bg-white rounded-xl border border-[#E5E5E5] shadow-sm p-6">
      {/* Section header */}
      <h2 className="text-xl font-medium text-[#111111] mb-4">{title}</h2>

      {/* Appointments list */}
      <div className="space-y-3">
        {items.map((item, i) => {
          const content = (
            <>
              <p className="font-medium text-[#111111]">{item.doctor}</p>
              <p className="text-sm text-[#4A4A4A]">{item.reason}</p>
              <p className="text-xs text-[#888888] mt-2">{item.datetime}</p>
            </>
          );

          return item.href ? (
            <a
              key={i}
              href={item.href}
              className="block border-l-4 border-[#4CAF50] p-4 bg-[#E6F9F0] rounded-lg hover:brightness-95 transition"
            >
              {content}
            </a>
          ) : (
            <div
              key={i}
              className="border-l-4 border-[#4CAF50] p-4 bg-[#E6F9F0] rounded-lg"
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}