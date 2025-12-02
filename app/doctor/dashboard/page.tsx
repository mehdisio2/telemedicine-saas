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

type LatestAppointmentItem = {
  id: string;
  patientName: string;
  patientInitials: string; // not used by the card, but comes from API
  dateTimeLabel: string;   // API field name
  status: "scheduled" | "completed";
  description: string | null;
};

export default function DoctorDashboardPage() {
  const [nextAppointment, setNextAppointment] = useState<NextAppointment | null>(null);
  const [latestAppointments, setLatestAppointments] = useState<LatestAppointmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nextRes, latestRes] = await Promise.all([
          fetch('/api/doctor/next-appointment'),
          fetch('/api/doctor/latest-appointments'),
        ]);

        const nextData = await nextRes.json();
        const latestData: LatestAppointmentItem[] = await latestRes.json();

        setNextAppointment(nextData ?? null);
        setLatestAppointments(latestData ?? []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Map API items to the card’s expected shape
  const latestAppointmentsForCard = latestAppointments.map((item) => ({
    id: item.id,
    patientName: item.patientName,
    time: item.dateTimeLabel,
    status: item.status as "scheduled" | "completed" | "cancelled",
  }));

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