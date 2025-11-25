import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  doctorSpecialty: string;
  description: string;
}

interface PastAppointmentProps {
  appointments: Appointment[];
}

export default function PastAppointment({ appointments }: PastAppointmentProps) {
  return (
    <Card className="w-full mb-4 max-w-3xl">
      <CardHeader>
        <CardTitle>
          Past Appointments
        </CardTitle>
        <CardDescription>
          View your past medical appointments and details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <p>No past appointments found.</p>
        ) : (
          <ul>
            {appointments.map((appointment: Appointment) => (
              <li key={appointment.id}>
                <div className="mb-4 p-4 border rounded-lg shadow-sm">
                  <strong>{appointment.date} {appointment.time}</strong>
                  <p>With Dr. {appointment.doctorName} ({appointment.doctorSpecialty})</p>
                  <p>{appointment.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}                
      </CardContent>
      <CardFooter>
        {/* Optional footer content */}
      </CardFooter>
    </Card>
  );
}