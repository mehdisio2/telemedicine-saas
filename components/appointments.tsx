"use client"

export type DoctorAppointment = {
  id: string;
  date: string;
  time: string;
  patientName: string;
  status?: string;
}

export type PatientAppointment = {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  doctorSpecialty: string;
  description: string;
  status?: string;
}

type AnyAppointment = DoctorAppointment | PatientAppointment

interface AppointmentsProps {
  title: string
  description?: string
  appointments: AnyAppointment[]
}

const isDoctorAppointment = (a: AnyAppointment): a is DoctorAppointment => {
  return "patientName" in a
}

export default function Appointments({ title, description, appointments }: AppointmentsProps) {
  return (
    <section className="rounded-xl border border-[#E5E5E5] bg-white p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-[#111111]">{title}</h2>
        {description ? (
          <p className="text-sm text-[#888888]">{description}</p>
        ) : null}
      </div>

      {appointments.length === 0 ? (
        <div className="text-sm text-[#666666]">No appointments to show.</div>
      ) : (
        <ul className="space-y-3">
          {appointments.map((a) => (
            <li
              key={a.id}
              className="rounded-lg border border-[#F0F0F0] p-4 hover:bg-[#FAFAFA] transition"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-[#555555]">
                  <span className="font-medium text-[#111111]">{a.date}</span>
                  {" • "}
                  <span>{a.time}</span>
                </div>
                {a.status ? (
                  <span className="text-[11px] uppercase tracking-wide rounded-full bg-[#F3F4F6] px-2 py-1 text-[#555555]">
                    {a.status}
                  </span>
                ) : null}
              </div>

              <div className="mt-2 text-sm text-[#333333]">
                {isDoctorAppointment(a) ? (
                  <div className="space-y-1">
                    <div>
                      <span className="font-medium">Patient: </span>
                      <span>{a.patientName}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div>
                      <span className="font-medium">Doctor: </span>
                      <span>{a.doctorName}</span>
                    </div>
                    <div className="text-[#666666]">{a.doctorSpecialty}</div>
                    {a.description ? (
                      <div className="text-[#666666]">{a.description}</div>
                    ) : null}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}