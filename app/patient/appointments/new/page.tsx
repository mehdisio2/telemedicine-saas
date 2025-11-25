'use client'
import SearchFilter from "@/components/search-filter"
import { createClient } from "@/lib/supabaseClient"
import { useState, useEffect } from "react"
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

    useEffect(() => {
        const fetchInitialDoctors = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("profiles")
                .select("id, name, email, specialty")
                .eq("role", "doctor")
                .limit(9);

            if (error) {
                console.error(error);
                return;
            }

            setDoctors((data ?? []) as Doctor[]);
        };

        fetchInitialDoctors();
    }, []);

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
        <div className="min-h-screen bg-[#F9FAFB] py-8">
            <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
                <header className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-[#111111]">Book a New Appointment</h1>
                    <p className="text-sm font-light text-[#888888]">Find available doctors matching your search.</p>
                </header>
                
                <div className="md:sticky md:top-0 z-50 bg-[#F9FAFB] -mx-4 md:-mx-6 px-4 md:px-6 py-4">
                    <SearchFilter onSearch={handleSearch} />
                </div>

                <hr className="border-t border-[#E5E5E5]" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doctor) => (
                        <DoctorCard key={doctor.id} {...doctor} />
                    ))}
                </div>
                
                {doctors.length > 3 && (
                    <div className="flex justify-center mt-8">
                        <PaginationDemo />
                    </div>
                )}
            
                {/* bottom spacer to create white space for scrolling tests */}
                <div className="h-64 md:h-96" aria-hidden="true" />
            </div>
        </div>
    )
}
