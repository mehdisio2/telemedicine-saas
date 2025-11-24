'use client'
import SearchFilter from "@/components/search-filter"
import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"

type Doctor = {
    id: string;
    name: string;
    email: string;
    specialty: string;
}

export default function NewAppointmentPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    const handleSearch = async (filters: { specialty: string; date: string }) => {
        let query = supabase
            .from("profiles")
            .select("id, name, email, specialty")
            .eq("role", "doctor");

        if (filters.specialty) {
            query = query.eq("specialty", filters.specialty);
        }

        const { data, error } = await query;

        if (error) {
            console.error(error);
            return;
        }

        setDoctors((data ?? []) as Doctor[]);
    };

    return (
        <div className="min-h-screen">
            <main className="px-4 max-w-4xl mx-auto">
                {/* sticky filter that sits under the layout navbar.
                    Ad  just `top-16` if your NavBar height is different. */}
                <div className="sticky top-8 z-40">
                    <div className="w-full px-4">
                        <SearchFilter className="p-2! gap-2!" onSearch={handleSearch}/>
                    </div>
                </div>

                {/* Page content goes here */}
                <div className="pt-6">
                    {doctors.length === 0 ? (
                        <p className="text-center text-gray-500">No doctors found. Please use the search filter above to find doctors.</p>
                    ) : (
                        <ul className="space-y-4">
                            {doctors.map((doctor) => (
                                <li key={doctor.id} className="p-4 border rounded-md">
                                    <h3 className="text-lg font-semibold">{doctor.name}</h3>
                                    <p className="text-sm text-gray-600">Specialty: {doctor.specialty}</p>
                                    <p className="text-sm text-gray-600">Email: {doctor.email}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    )
}
