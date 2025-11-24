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
    <Card>
      <CardHeader>
        <img
          src={`/images/doctors/${name.toLowerCase().replace(" ", "-")}.jpg`}
          alt={`Dr. ${name}`}
          className="w-full h-80 object-cover rounded-t-md"
        />
        <CardTitle>{name}</CardTitle>
        <CardDescription>Specialty: {specialty}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">Email: {email}</p>
      </CardContent>
      <CardFooter>
        <AppointmentDialog
          name={name}
          specialty={specialty}
          email={email}
          doctorId={id} // Pass the doctor UUID
        />
      </CardFooter>
    </Card>
  );
}
