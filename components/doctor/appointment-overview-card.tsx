"use client";

import { Calendar, Clock, Stethoscope, CheckCircle, XCircle } from "lucide-react";

type AppointmentOverviewCardProps = {
  date: string;
  time: string;
  duration: string;
  reason: string;
  status: "confirmed" | "completed" | "cancelled";
};

export function AppointmentOverviewCard({
  date,
  time,
  duration,
  reason,
  status,
}: AppointmentOverviewCardProps) {
  const getStatusBadge = (status: string) => {
    const badges = {
      confirmed: {
        icon: <CheckCircle className="w-4 h-4" />,
        text: "Confirmed",
        className: "bg-green-50 text-green-700 border-green-200"
      },
      completed: {
        icon: <CheckCircle className="w-4 h-4" />,
        text: "Completed",
        className: "bg-blue-50 text-blue-700 border-blue-200"
      },
      cancelled: {
        icon: <XCircle className="w-4 h-4" />,
        text: "Cancelled",
        className: "bg-red-50 text-red-700 border-red-200"
      }
    };

    const badge = badges[status as keyof typeof badges] || badges.confirmed;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${badge.className}`}>
        {badge.icon}
        {badge.text}
      </span>
    );
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Appointment Overview</h2>
        {getStatusBadge(status)}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Date & Time */}
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="text-base font-semibold text-gray-900">{date}</p>
            <p className="text-sm text-gray-600">{time}</p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-base font-semibold text-gray-900">{duration}</p>
          </div>
        </div>

        {/* Reason */}
        <div className="flex items-start gap-3 col-span-2">
          <div className="p-2 bg-green-50 rounded-lg">
            <Stethoscope className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Reason for Visit</p>
            <p className="text-base font-semibold text-gray-900">{reason}</p>
          </div>
        </div>
      </div>
    </section>
  );
}