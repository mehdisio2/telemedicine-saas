import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Apointment } from "@/components/apointment";

export interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  doctorSpecialty: string;
  description: string;
  status?: string;
}

interface UpcomingAppointmentProps {
  appointments: Appointment[];
}

export default function UpcomingAppointment({ appointments }: UpcomingAppointmentProps) {
  return (
    <Card className="w-full h-auto border border-[#E5E5E5] bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-xl font-semibold text-[#111111]">
          Upcoming Appointments
        </CardTitle>
        <CardDescription className="text-sm font-light text-[#888888]">
          View your upcoming medical appointments and details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.length === 0 ? (
          <p className="text-sm text-[#888888] font-light">No upcoming appointments found.</p>
        ) : (
          appointments.map((appointment: Appointment) => (
            <Apointment key={appointment.id} appointment={appointment} />
          ))
        )}                
      </CardContent>
      <CardFooter />
    </Card>
  );
}