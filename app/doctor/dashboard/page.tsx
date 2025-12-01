export default function DoctorDashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        {/* Doctor Profile Section */}
        <div className="flex flex-col items-center gap-4 pb-6 border-b border-gray-200">
          {/* Profile Avatar - Component placeholder */}
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            {/* <DoctorAvatar /> */}
            <span className="text-gray-400 text-sm">Avatar</span>
          </div>

          {/* Doctor Name & Specialty - Component placeholder */}
          <div className="text-center">
            {/* <DoctorInfo name="Dr. John Doe" specialty="Cardiologist" /> */}
            <h3 className="font-semibold text-[#111111]">Dr. John Doe</h3>
            <p className="text-sm text-[#888888]">Cardiologist</p>
          </div>

          {/* Availability Toggle Button - Component placeholder */}
          <div className="w-full">
            {/* <AvailabilityToggle /> */}
            <button className="w-full px-4 py-2 bg-[#2AB3A3] text-white rounded-lg text-sm font-medium hover:bg-[#1F8478]">
              Available
            </button>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 flex flex-col gap-2 mt-6">
          {/* <DashboardNav /> */}
          <a
            href="/doctor/dashboard"
            className="px-4 py-2 rounded-lg bg-[#E6F9F0] text-[#2AB3A3] font-medium"
          >
            Dashboard
          </a>
          <a
            href="/doctor/appointments"
            className="px-4 py-2 rounded-lg text-[#4A4A4A] hover:bg-gray-100"
          >
            Appointments
          </a>
          <a
            href="/doctor/settings"
            className="px-4 py-2 rounded-lg text-[#4A4A4A] hover:bg-gray-100"
          >
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#111111]">
              Dashboard
            </h1>
            <p className="text-[#888888] mt-1">
              Welcome back! Here's your overview.
            </p>
          </div>

          {/* Top Row: Next Appointment + Total Customers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Next Appointment Card - Top Left */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              {/* <NextAppointmentCard /> */}
              <h2 className="text-lg font-semibold text-[#111111] mb-4">
                Next Appointment
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="font-medium text-[#111111]">Jane Smith</p>
                    <p className="text-sm text-[#888888]">
                      Today at 2:00 PM
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm text-[#4A4A4A]">
                    Follow-up consultation
                  </p>
                </div>
              </div>
            </div>

            {/* Total Customers Card - Top Right */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              {/* <TotalCustomersCard /> */}
              <h2 className="text-lg font-semibold text-[#111111] mb-4">
                Total Patients
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold text-[#2AB3A3]">248</p>
                  <p className="text-sm text-[#888888] mt-1">
                    +12 this month
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-[#E6F9F0] flex items-center justify-center">
                  {/* Icon placeholder */}
                  <span className="text-2xl">👥</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Weekly Overview + Latest Appointments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Overview Card - Bottom Left */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              {/* <WeeklyOverviewChart /> */}
              <h2 className="text-lg font-semibold text-[#111111] mb-4">
                Weekly Overview
              </h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                {/* Chart component goes here (e.g., Recharts, Chart.js) */}
                <p className="text-[#888888] text-sm">
                  Chart: Appointments per day
                </p>
              </div>
            </div>

            {/* Latest Appointments Card - Bottom Right */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              {/* <LatestAppointmentsList /> */}
              <h2 className="text-lg font-semibold text-[#111111] mb-4">
                Latest Appointments
              </h2>
              <div className="space-y-4">
                {/* Appointment Item 1 */}
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <p className="font-medium text-[#111111]">John Doe</p>
                    <p className="text-sm text-[#888888]">Dec 1, 10:00 AM</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Completed
                  </span>
                </div>

                {/* Appointment Item 2 */}
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <p className="font-medium text-[#111111]">Sarah Connor</p>
                    <p className="text-sm text-[#888888]">Nov 30, 3:00 PM</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    Scheduled
                  </span>
                </div>

                {/* Appointment Item 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <p className="font-medium text-[#111111]">Mike Ross</p>
                    <p className="text-sm text-[#888888]">Nov 29, 1:00 PM</p>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    Cancelled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}