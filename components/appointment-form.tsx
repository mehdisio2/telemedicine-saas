"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AppointmentFormProps {
  doctorId: string;
}

export function AppointmentForm({ doctorId }: AppointmentFormProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const datetime = new Date(`${date}T${time}`).toISOString();

    try {
      const res = await fetch("/api/appointments/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor_id: doctorId,
          datetime,
          description,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to book appointment");
      }

      setSuccess(true);
      router.push("/patient/dashboard");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="date-input" className="block text-sm font-medium text-[#4A4A4A]">
            Date
          </label>
          <input
            id="date-input"
            type="date"
            className="block w-full border border-[#E5E5E5] rounded-lg px-3 py-2 h-10 bg-white text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:border-[#2AB3A3]"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="time-input" className="block text-sm font-medium text-[#4A4A4A]">
            Time
          </label>
          <input
            id="time-input"
            type="time"
            className="block w-full border border-[#E5E5E5] rounded-lg px-3 py-2 h-10 bg-white text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:border-[#2AB3A3]"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description-input" className="block text-sm font-medium text-[#4A4A4A]">
            Reason for Visit
          </label>
          <textarea
            id="description-input"
            className="block w-full border border-[#E5E5E5] rounded-lg px-3 py-2 bg-white text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:border-[#2AB3A3] resize-none"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 h-10 bg-[#2AB3A3] text-white font-medium rounded-lg hover:bg-[#1F8478] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
        {error && (
          <p className="text-sm text-[#D9534F] font-normal mt-2">{error}</p>
        )}
        {success && (
          <p className="text-sm text-[#4CAF50] font-normal mt-2">Appointment booked successfully!</p>
        )}
      </form>
    </div>
  );
}

