"use client";
import { DoctorSidebar } from "@/components/doctor/sidebar";
import {
  NextAppointmentCard,
  NextAppointmentCardSkeleton,
  NoAppointmentCard
} from "@/components/doctor/next-appointment-card";
import { TotalPatientsCard } from "@/components/doctor/total-patients-card";
import { TodayAppointmentsCard } from "@/components/doctor/today-appointments-card";
import { MonthlyOverviewCard } from "@/components/doctor/monthly-overview-card";
import { LatestAppointmentsCard } from "@/components/doctor/latest-appointments-card";
import { useState, useEffect } from "react";

interface NextAppointment {
  id: string;
  patientName: string;
  time: string;
  purpose: string;
}

// Static hardcoded appointments for UI testing
const staticAppointments = [
  { id: "1", patientName: "Emma Thompson", time: "Dec 10, 2025, 9:00 AM", status: "scheduled" as const },
  { id: "2", patientName: "James Wilson", time: "Dec 10, 2025, 10:30 AM", status: "scheduled" as const },
  { id: "3", patientName: "Sophie Chen", time: "Dec 9, 2025, 2:00 PM", status: "completed" as const },
  { id: "4", patientName: "Michael Brown", time: "Dec 9, 2025, 11:00 AM", status: "completed" as const },
  { id: "5", patientName: "Olivia Martinez", time: "Dec 8, 2025, 3:30 PM", status: "completed" as const },
  { id: "6", patientName: "William Johnson", time: "Dec 8, 2025, 1:00 PM", status: "scheduled" as const },
  { id: "7", patientName: "Ava Garcia", time: "Dec 7, 2025, 10:00 AM", status: "completed" as const },
  { id: "8", patientName: "Ethan Davis", time: "Dec 7, 2025, 4:00 PM", status: "cancelled" as const },
  { id: "9", patientName: "Isabella Rodriguez", time: "Dec 6, 2025, 9:30 AM", status: "completed" as const },
  { id: "10", patientName: "Liam Anderson", time: "Dec 5, 2025, 2:30 PM", status: "completed" as const },
];

export default function DoctorDashboardPage() {
  const [nextAppointment, setNextAppointment] = useState<NextAppointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nextRes = await fetch('/api/doctor/next-appointment');
        const nextData = await nextRes.json();
        setNextAppointment(nextData ?? null);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Use static appointments for UI testing
  const latestAppointmentsForCard = staticAppointments;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <DoctorSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-[#111111]">Dashboard</h1>
            <p className="text-[#888888] mt-1">Welcome back! Here's your overview.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-2">
                <TotalPatientsCard total={248} deltaMonthly={12} />
                <TodayAppointmentsCard count={12} delta={3} />
              </div>
              <LatestAppointmentsCard
                appointments={latestAppointmentsForCard}
                title="Latest Appointments"
                itemsPerPage={6}
              />
            </div>

            <div className="lg:col-span-6 flex flex-col gap-6">
              {loading ? (
                <NextAppointmentCardSkeleton heightClass="h-56 md:h-64" />
              ) : nextAppointment ? (
                <NextAppointmentCard
                  patientName={nextAppointment.patientName}
                  time={nextAppointment.time}
                  purpose={nextAppointment.purpose}
                  callHref={`/doctor/call/${nextAppointment.id}`}
                  heightClass="h-56 md:h-64"
                />
              ) : (
                <NoAppointmentCard heightClass="h-56 md:h-64" />
              )}
              <MonthlyOverviewCard heightClass="h-96" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}