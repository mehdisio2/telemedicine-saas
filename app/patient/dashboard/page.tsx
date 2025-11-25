"use client"

import { useEffect, useState } from "react"
import UpcomingAppointment from "@/components/upcoming-apointment"
import PastAppointment from "@/components/past-apointment"

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  doctorSpecialty: string;
  description: string;
  status?: string;
}

export default function PatientPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const getAppointments = async () => {
        const res = await fetch('/api/apointments/view', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error('Failed to fetch appointments');
        }
        const data = await res.json();
        console.log(data);
        setAppointments(data.appointments);
    }
    useEffect(() => {
        getAppointments();
    }, []);

    return (
        <div className="flex flex-col md:flex-row gap-6 py-6">

            <div className="md:w-1/2">
                <PastAppointment appointments={appointments} />
            </div>
            <div className="md:w-1/2">
                <UpcomingAppointment appointments={appointments} />
            </div>
        </div>
    )
}