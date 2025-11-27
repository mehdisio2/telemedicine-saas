'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog";

export type DoctorCardProps = {
  full_name: string;
  specialty: string;
  doctorId: string;
};

export function AppointmentDialog({ full_name, specialty, doctorId }: DoctorCardProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const datetime = new Date(`${date}T${time}`).toISOString();
    
    try {
      const res = await fetch("/api/apointments/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctor_id: doctorId, datetime, description }),
      });

      const text = await res.text();
      console.log(text);
      
      if (!res.ok) {
        const errData = JSON.parse(text);
        throw new Error(errData.error || "Failed to book appointment");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/patient/dashboard");
      }, 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button className="max-w-full h-10 px-4 bg-[#2AB3A3] text-white font-medium rounded-lg hover:bg-[#1F8478] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:ring-offset-2 transition-colors">
            Book Appointment
          </Button>

      </DialogTrigger>
      <DialogContent className="bg-white border border-[#E5E5E5] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#111111]">
            Book Appointment with Dr. {full_name}
          </DialogTitle>
          <DialogDescription className="text-sm font-light text-[#888888]">
            Specialty: {specialty}
          </DialogDescription>
        </DialogHeader>

        {/* Appointment Form */}
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A]">Date</label>
            <input
              type="date"
              className="mt-1 block w-full border border-[#E5E5E5] rounded-lg px-3 py-2 h-10 bg-white text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:border-[#2AB3A3]"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A]">Time</label>
            <input
              type="time"
              className="mt-1 block w-full border border-[#E5E5E5] rounded-lg px-3 py-2 h-10 bg-white text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:border-[#2AB3A3]"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A]">Reason for Visit</label>
            <textarea
              className="mt-1 block w-full border border-[#E5E5E5] rounded-lg px-3 py-2 bg-white text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:border-[#2AB3A3] resize-none"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-[#D9534F] font-normal">{error}</p>}
          {success && <p className="text-sm text-[#4CAF50] font-normal">Appointment booked successfully!</p>}
        </div>

        <DialogFooter className="mt-4 flex gap-3">
          <DialogClose asChild>
            <Button className="h-10 px-4 border border-[#E5E5E5] bg-white text-[#4A4A4A] font-medium rounded-lg hover:bg-[#F9FAFB] transition-colors">
              Close
            </Button>
          </DialogClose>
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="h-10 px-4 bg-[#2AB3A3] text-white font-medium rounded-lg hover:bg-[#1F8478] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Booking..." : "Confirm Appointment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

