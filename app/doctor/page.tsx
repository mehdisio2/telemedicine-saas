"use client"

import { useState } from "react"
import { SearchFilter } from "@/components/search-filter"

export default function DoctorPage() {
    const [searchQuery, setSearchQuery] = useState("")
    
    const appointments = [
        { id: "a1", patient: "John Smith", time: "09:00 AM", type: "General Checkup" },
        { id: "a2", patient: "Maria Garcia", time: "10:30 AM", type: "Follow-up" },
        { id: "a3", patient: "Liam Wong", time: "01:00 PM", type: "Consultation" },
        { id: "a4", patient: "Emma Johnson", time: "02:00 PM", type: "Lab Results Review" },
        { id: "a5", patient: "Oliver Brown", time: "02:30 PM", type: "General Checkup" },
        { id: "a6", patient: "Sophia Davis", time: "03:00 PM", type: "Follow-up" },
        { id: "a7", patient: "Noah Miller", time: "03:30 PM", type: "Consultation" },
        { id: "a8", patient: "Ava Wilson", time: "04:00 PM", type: "General Checkup" },
        { id: "a9", patient: "William Moore", time: "04:30 PM", type: "Lab Results Review" },
        { id: "a10", patient: "Isabella Taylor", time: "05:00 PM", type: "Follow-up" },
        { id: "a11", patient: "James Anderson", time: "05:30 PM", type: "Consultation" },
        { id: "a12", patient: "Charlotte Thomas", time: "06:00 PM", type: "General Checkup" },
        { id: "a13", patient: "Benjamin Jackson", time: "06:30 PM", type: "Follow-up" },
        { id: "a14", patient: "Amelia White", time: "07:00 PM", type: "Consultation" },
        { id: "a15", patient: "Lucas Harris", time: "07:30 PM", type: "Lab Results Review" },
    ];

    const filteredAppointments = appointments.filter(
        (appointment) =>
            appointment.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
            appointment.type.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <SearchFilter
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search appointments by patient name or type..."
            />
            
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Dr. Jane Doe</h1>
                    <p className="text-gray-600 mt-2">Telemedicine - General Practice</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Today&apos;s Appointments
                        {searchQuery && (
                            <span className="text-sm text-gray-500 ml-2">
                                ({filteredAppointments.length} of {appointments.length})
                            </span>
                        )}
                    </h2>
                    
                    {filteredAppointments.length > 0 ? (
                        <ul className="space-y-3">
                            {filteredAppointments.map((a) => (
                                <li
                                    key={a.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{a.patient}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{a.type}</p>
                                        </div>
                                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                            {a.time}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center py-8">
                            No appointments found matching &quot;{searchQuery}&quot;
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
}
