import { DoctorSidebar } from "@/components/doctor/sidebar";
import { NextAppointmentCard } from "@/components/doctor/next-appointment-card";
import { TotalPatientsCard } from "@/components/doctor/total-patients-card";
import { TodayAppointmentsCard } from "@/components/doctor/today-appointments-card";
import { MonthlyOverviewCard } from "@/components/doctor/monthly-overview-card";
import { LatestAppointmentsCard } from "@/components/doctor/latest-appointments-card";

export default function DoctorDashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <DoctorSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-[#111111]">Dashboard</h1>
            <p className="text-[#888888] mt-1">Welcome back! Here's your overview.</p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left column: Next Appointment (top-left) + Monthly Overview (bottom-left) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Next Appointment - fixed size, teal */}
              <NextAppointmentCard heightClass="h-56 md:h-64" />

              {/* Monthly Overview - bottom left */}
              <MonthlyOverviewCard heightClass="h-96" />
            </div>

            {/* Right column: Stats row (top-right) + Latest Appointments (bottom-right) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Two stat cards side-by-side with minimal spacing */}
              <div className="grid grid-cols-2 gap-2">
                <TotalPatientsCard total={248} deltaMonthly={12} />
                <TodayAppointmentsCard count={12} delta={3} />
              </div>

              {/* Latest Appointments - bottom right */}
              <LatestAppointmentsCard />
            </div>
          </div>
          {/* End Bento Grid */}
        </div>
      </main>
    </div>
  );
}