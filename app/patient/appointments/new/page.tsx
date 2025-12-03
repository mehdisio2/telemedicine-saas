'use client'
import SearchFilter from "@/components/search-filter"
import { PatientSidebar } from "@/components/patient/sidebar";
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { DoctorCard } from "@/components/doctor-card"
import { PaginationDemo } from "@/components/pagination"

type Doctor = {
  id: string;
  full_name: string;
  specialty: string;
  city?: string;
  duration?: string;
  fee?: number;
  photo_url?: string;
  rating?: number;
  is_available?: boolean;
}

const doctorImages = [
  "/images/doctors/doctor-1.jpg",
  "/images/doctors/doctor-2.jpg",
  "/images/doctors/doctor-3.jpg",
];

function assignRandomImages(list: Doctor[]) {
  return list.map(d => ({
    ...d,
    photo_url: d.photo_url || doctorImages[Math.floor(Math.random() * doctorImages.length)]
  }));
}

export default function NewAppointmentPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchInitialDoctors = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("doctors")
        .select("id, full_name, specialty")
        .limit(9);

      if (error) {
        console.error(error);
        return;
      }

      setDoctors(assignRandomImages((data ?? []) as Doctor[]));
    };

    fetchInitialDoctors();
  }, []);

  const handleSearch = async (filters: { specialty: string; date: string }) => {
    const supabase = createClient();
    let query = supabase
      .from("doctors")
      .select("id, full_name, specialty");

    if (filters.specialty) {
      query = query.eq("specialty", filters.specialty);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      return;
    }

    setDoctors(assignRandomImages((data ?? []) as Doctor[]));
  };

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen">
      <PatientSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
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
              <DoctorCard
                key={doctor.id}
                id={doctor.id}
                full_name={doctor.full_name}
                specialty={doctor.specialty}
                city={doctor.city ?? "Minneapolis, MN"}
                duration={doctor.duration ?? "30 Min"}
                fee={doctor.fee ?? 650}
                photoUrl={doctor.photo_url ?? "/images/doctor-placeholder.jpg"}
                rating={doctor.rating ?? 5.0}
                isAvailable={doctor.is_available ?? true}
              />
            ))}
          </div>

          {doctors.length > 3 && (
            <div className="flex justify-center mt-8">
              <PaginationDemo />
            </div>
          )}

          <div className="h-64 md:h-96" aria-hidden="true" />
        </div>
      </main>
    </div>
  )
}
