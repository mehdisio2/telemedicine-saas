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
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 space-y-4">
                <h1 className="text-2xl font-bold mb-2 ml-2.5">Book a New Appointment</h1>
                <p className="text-sm text-gray-600 mb-4 ml-2.5">Find available doctors matching your search.</p>
                
                <div className="md:sticky md:top-0 z-50 bg-white dark:bg-gray-900 -mx-2 sm:-mx-3 lg:-mx-4 px-2 sm:px-3 lg:px-4">
                    <SearchFilter onSearch={handleSearch} />
                </div>

                <hr className="border-t border-gray-200 dark:border-gray-700" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctors.map((doctor) => (
                        <DoctorCard key={doctor.id} {...doctor} />
                    ))}
                </div>
                
                {doctors.length > 3 && (
                    <div className="flex justify-center mt-4">
                        <PaginationDemo />
                    </div>
                )}
            
                {/* bottom spacer to create white space for scrolling tests */}
                <div className="h-64 md:h-96" aria-hidden="true" />
            </div>
        </div>
    )
}
