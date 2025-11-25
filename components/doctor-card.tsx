import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppointmentDialog } from "./apointment-dialog";

export type DoctorCardProps = {
  id: string; // Add the doctor's UUID
  name: string;
  specialty: string;
  email: string;
};

export function DoctorCard({ id, name, specialty, email }: DoctorCardProps) {
  return (
    <Card className="border border-[#E5E5E5] bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200">
      <CardHeader>
        <img
          src={`/images/doctors/${name.toLowerCase().replace(" ", "-")}.jpg`}
          alt={`Dr. ${name}`}
          className="w-full h-80 object-cover rounded-t-xl"
        />
      </CardHeader>
      <CardContent className="p-5 space-y-2">
        <CardTitle className="text-lg font-semibold text-[#111111]">
          Dr. {name}
        </CardTitle>
        <CardDescription className="text-sm font-normal text-[#888888]">
          {specialty}
        </CardDescription>
        <p className="text-sm text-[#4A4A4A] font-light">{email}</p>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <AppointmentDialog
          name={name}
          specialty={specialty}
          email={email}
          doctorId={id}
        />
      </CardFooter>
    </Card>
  );
}
