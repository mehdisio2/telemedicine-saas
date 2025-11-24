"use client";

import { useState } from "react";

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Reason for Visit</label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">Appointment booked successfully!</p>}
      </form>
    </div>
  );
}

