"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Appointment = {
  id: string;
  patientName: string;
  time: string;
  status: "completed" | "scheduled" | "cancelled";
};

type LatestAppointmentsCardProps = {
  appointments?: Appointment[];
  title?: string;
  itemsPerPage?: number;
  // Optional: override detail page base path
  detailBasePath?: string; // e.g. "/doctor/appointments"
};

const defaultAppointments: Appointment[] = [
  { id: "1", patientName: "John Doe", time: "Dec 1, 10:00 AM", status: "completed" },
  { id: "2", patientName: "Sarah Connor", time: "Nov 30, 3:00 PM", status: "scheduled" },
  { id: "3", patientName: "Mike Ross", time: "Nov 29, 1:00 PM", status: "cancelled" },
  { id: "4", patientName: "Jessica Pearson", time: "Nov 28, 11:30 AM", status: "completed" },
  { id: "5", patientName: "Harvey Specter", time: "Nov 27, 2:15 PM", status: "scheduled" },
  { id: "6", patientName: "Rachel Zane", time: "Nov 26, 9:00 AM", status: "completed" },
  { id: "7", patientName: "Louis Litt", time: "Nov 25, 4:00 PM", status: "cancelled" },
  { id: "8", patientName: "Donna Paulsen", time: "Nov 24, 10:30 AM", status: "completed" },
];

const statusStyles = {
  completed: "bg-green-100 text-green-700",
  scheduled: "bg-blue-100 text-blue-700",
  cancelled: "bg-gray-100 text-gray-700",
};

export function LatestAppointmentsCard({
  appointments = defaultAppointments,
  title = "Latest Appointments",
  itemsPerPage = 6,
  detailBasePath = "/doctor/appointments", // change if your detail route differs
}: LatestAppointmentsCardProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const safeAppointments = appointments ?? [];
  const totalPages = Math.ceil(safeAppointments.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentAppointments = safeAppointments.slice(startIdx, endIdx);

  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
      <h2 className="text-lg font-semibold text-[#111111] mb-4">{title}</h2>

      <div className="space-y-4 flex-1">
        {currentAppointments.length === 0 ? (
          <p className="text-sm text-[#888888]">No recent appointments.</p>
        ) : (
          currentAppointments.map((appt, idx) => (
            <Link
              key={appt.id}
              href={`${detailBasePath}/${appt.id}`} // navigates to appointment-detail page
              className={`flex items-center gap-3 no-underline hover:bg-gray-50 rounded-md px-2 -mx-2 ${
                idx < currentAppointments.length - 1 ? "pb-3 border-b border-gray-100" : ""
              }`}
            >
              {/* Avatar placeholder */}
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-gray-500">
                  {appt.patientName.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#111111] truncate">{appt.patientName}</p>
                <p className="text-sm text-[#888888]">{appt.time}</p>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full capitalize ${statusStyles[appt.status]}`}
              >
                {appt.status}
              </span>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}