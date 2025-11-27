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
  full_name: string;
  specialty: string;
};

export function DoctorCard({ id, full_name, specialty }: DoctorCardProps) {
  return (
    <Card className="border border-[#E5E5E5] bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200">
      <CardHeader>
        <img
          src={`/images/doctors/${full_name.toLowerCase().replace(" ", "-")}.jpg`}
          alt={`Dr. ${full_name}`}
          className="w-full h-80 object-cover rounded-t-xl"
        />
      </CardHeader>
      <CardContent className="p-5 space-y-2">
        <CardTitle className="text-lg font-semibold text-[#111111]">
          Dr. {full_name}
        </CardTitle>
        <CardDescription className="text-sm font-normal text-[#888888]">
          {specialty}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <AppointmentDialog
          full_name={full_name}
          specialty={specialty}
          doctorId={id}
        />
      </CardFooter>
    </Card>
  );
}
