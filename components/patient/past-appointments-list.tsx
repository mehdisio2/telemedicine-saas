"use client";
import React from "react";

/**
 * PastAppointmentsList
 * - Themed card that lists past/completed appointments.
 * - Uses Completed neutral color and Off-White background per UI theme.
 */
export type PastAppointment = {
  doctor: string;     // e.g. "Dr. Robert Brown"
  reason: string;     // e.g. "Annual Physical"
  datetime: string;   // e.g. "November 20, 2025 - 9:00 AM"
  href?: string;      // optional link to appointment details
};

type Props = {
  title?: string;            // defaults to "Past Appointments"
  items: PastAppointment[];  // appointment rows
};

export function PastAppointmentsList({ title = "Past Appointments", items }: Props) {
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
              className="block border-l-4 border-[#C4C4C4] p-4 bg-[#F9FAFB] rounded-lg hover:bg-[#F3F4F6] transition"
            >
              {content}
            </a>
          ) : (
            <div
              key={i}
              className="border-l-4 border-[#C4C4C4] p-4 bg-[#F9FAFB] rounded-lg"
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}