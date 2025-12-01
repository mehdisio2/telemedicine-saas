import Link from "next/link";

type NextAppointmentCardProps = {
  patientName?: string;
  time?: string;
  purpose?: string;
  callHref?: string;
  heightClass?: string; // optional override
};

export function NextAppointmentCard({
  patientName = "Jane Smith",
  time = "Today at 2:00 PM",
  purpose = "Follow-up consultation",
  callHref = "/doctor/call",
  heightClass = "h-56 md:h-64", // fixed size
}: NextAppointmentCardProps) {
  return (
    <section
      className={`rounded-xl p-6 bg-[#2AB3A3] text-white shadow-sm w-full ${heightClass} self-start overflow-hidden`}
    >
      <h2 className="text-lg font-semibold mb-4">Next Appointment</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {/* <PatientAvatar /> */}
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