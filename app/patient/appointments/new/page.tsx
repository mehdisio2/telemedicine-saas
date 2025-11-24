'use client'
import SearchFilter from "@/components/search-filter"
import { createClient } from "@/lib/supabaseClient"
import { useState } from "react"
import { DoctorCard } from "@/components/doctor-card"
import { PaginationDemo } from "@/components/pagination"

type Doctor = {
    id: string;
    name: string;
    email: string;
    specialty: string;
}

export default function NewAppointmentPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    const handleSearch = async (filters: { specialty: string; date: string }) => {
        const supabase = createClient();
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
        <div className="min-h-screen flex flex-col">
            {/* sticky centered area that stays under the layout navbar on scroll.
                The outer sticky wrapper is pointer-events-none so clicks pass through
                outside the filter — the inner container is pointer-events-auto so the
                SearchFilter itself remains interactive. Adjust `top-16` to match your NavBar height. */}
            <div className="sticky z-50 pointer-events-none">
                <div className="w-full max-w-3xl px-4 mx-auto pointer-events-auto">
                    <div className="bg-white shadow-md rounded-md">
                        <SearchFilter onSearch={handleSearch} className="!p-2 !gap-2" />
                    </div>
                </div>
            </div>

            {/* add top padding so page content doesn't sit under the sticky search (tune as needed) */}
            <main className="flex-1 p-4 pt-24">
                {doctors.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No doctors found. Please use the search filter above to find doctors.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                        {doctors.map((doctor) => (
                            <DoctorCard
                                id={doctor.id}
                                key={doctor.id}
                                name={doctor.name}
                                specialty={doctor.specialty}
                                email={doctor.email}
                            />
                        ))}
                    </div>
                )}
            </main>

            {typeof window !== 'undefined' && (() => {
                const width = window.innerWidth;
                const cols = width >= 1024 ? 4 : width >= 768 ? 3 : width >= 640 ? 2 : 1;
                const rows = Math.ceil(doctors.length / cols);
                return rows === 3 ? (
                    <div className="flex justify-center py-4">
                        <PaginationDemo />
                    </div>
                ) : null;
            })()}
        </div>
    )
}
