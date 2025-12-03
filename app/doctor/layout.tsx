import { ReactNode } from "react";
import { NavBar } from "@/components/nav-bar";
import { DoctorProvider } from "@/components/doctor/doctor-context";
import { createClient } from "@/lib/supabase/server";

interface DoctorLayoutProps {
  children: ReactNode;
}

export default async function DoctorLayout({ children }: DoctorLayoutProps) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let doctorData = {
    name: "Dr. John Doe",
    license_number: "BDS, MDS",
    specialty: "Cardiologist",
    avatar: undefined
  };

  if (user) {
    // Fetch doctor profile
    const { data: profile } = await supabase
      .from("doctors")
      .select("full_name, license_number, specialty, avatar_url")
      .eq("id", user.id)
      .single();

    if (profile) {
      doctorData = {
        name: profile.full_name,
        license_number: profile.license_number,
        specialty: profile.specialty,
        avatar: profile.avatar_url
      };
    }
  }

  return (
    <DoctorProvider initialDoctorData={doctorData}>
      <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
        <NavBar doctorName={doctorData.name} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </DoctorProvider>
  );
}
