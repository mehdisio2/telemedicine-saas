'use client'
import SearchFilter from "@/components/search-filter"
import { supabase } from "@/lib/supabaseClient"
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
            </main>
                {/* Page content goes here */}
                <div className="pt-6">
                    {doctors.length === 0 ? (
                        <p className="text-center text-gray-500">No doctors found. Please use the search filter above to find doctors.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                            {doctors.map((doctor) => (
                                <DoctorCard
                                    key={doctor.id}
                                    name={doctor.name}
                                    specialty={doctor.specialty}
                                    email={doctor.email}
                                />
                            ))}
                        </div>
                    )}
                </div>
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
