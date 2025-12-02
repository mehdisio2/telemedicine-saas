import Link from "next/link";

type NextAppointmentCardProps = {
  patientName?: string;
  time?: string;
  purpose?: string;
  callHref?: string;
  heightClass?: string;
};

export function NextAppointmentCard({
  patientName = "Jane Smith",
  time = "Today at 2:00 PM",
  purpose = "Follow-up consultation",
  callHref = "/doctor/call",
  heightClass = "h-56 md:h-64",
}: NextAppointmentCardProps) {
  return (
    <section
      className={`rounded-xl p-6 bg-[#2AB3A3] text-white shadow-sm w-full ${heightClass} self-start overflow-hidden`}
    >
      <h2 className="text-lg font-semibold mb-4">Next Appointment</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-xs">PT</span>
          </div>
          <div>
            <p className="font-medium">{patientName}</p>
            <p className="text-sm text-white/90">{time}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-white/20">
          <p className="text-sm text-white/95 line-clamp-2">{purpose}</p>
        </div>

        <div className="pt-2">
          <Link
            href={callHref}
            className="inline-flex items-center gap-2 rounded-lg bg-white text-[#2AB3A3] px-4 py-2 font-medium hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14" />
              <rect x="3" y="6" width="12" height="12" rx="2" />
            </svg>
            Start Call
          </Link>
        </div>
      </div>
    </section>
  );
}

export function NextAppointmentCardSkeleton({
  heightClass = "h-56 md:h-64",
}: {
  heightClass?: string;
}) {
  return (
    <section
      className={`rounded-xl p-6 bg-[#2AB3A3] text-white shadow-sm w-full ${heightClass} self-start overflow-hidden animate-pulse`}
    >
      <div className="h-6 w-40 bg-white/20 rounded mb-4"></div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-white/20 rounded"></div>
            <div className="h-3 w-24 bg-white/20 rounded"></div>
          </div>
        </div>

        <div className="pt-3 border-t border-white/20">
          <div className="h-3 w-full bg-white/20 rounded mb-2"></div>
          <div className="h-3 w-3/4 bg-white/20 rounded"></div>
        </div>

        <div className="pt-2">
          <div className="h-10 w-28 bg-white/30 rounded-lg"></div>
        </div>
      </div>
    </section>
  );
}

export function NoAppointmentCard({
  heightClass = "h-56 md:h-64",
}: {
  heightClass?: string;
}) {
  return (
    <section
      className={`rounded-xl p-6 bg-white border-2 border-dashed border-gray-300 shadow-sm w-full ${heightClass} self-start overflow-hidden flex flex-col items-center justify-center text-center`}
    >
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-[#111111] mb-2">No Upcoming Appointments</h3>
      <p className="text-sm text-[#888888] mb-4">
        You don't have any appointments scheduled at the moment.
      </p>
      <Link
        href="/doctor/appointments"
        className="inline-flex items-center gap-2 rounded-lg bg-[#2AB3A3] text-white px-4 py-2 font-medium hover:bg-[#1F8478] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3]/60"
      >
        View All Appointments
      </Link>
    </section>
  );
}