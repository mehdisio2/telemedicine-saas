import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export type DoctorCardProps = {
  name: string
  specialty: string
  email: string
}

export function DoctorCard({
  name,
  specialty,
  email,
}: DoctorCardProps) {
  return (
    <Card >
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book Appointment with Dr. {name}</DialogTitle>
              <DialogDescription>
                {/* Appointment booking form it contains date picker and time picker and button to confirm*/}
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Time
                    </label>
                    <input
                      type="time"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Confirm Appointment
                  </Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        </CardFooter>
    </Card>
  )
}