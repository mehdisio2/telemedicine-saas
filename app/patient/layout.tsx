import { ReactNode } from "react";
import { PatientNavBar } from "@/components/patient/nav-bar";
import { PatientProvider } from "@/components/patient/patient-context";
import { createClient } from "@/lib/supabase/server";

interface PatientLayoutProps {
  children: ReactNode;
}

export default async function PatientLayout({ children }: PatientLayoutProps) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let patientData = {
    name: "John Doe",
    id: "#12345",

  };

  if (user) {
    // Fetch patient profile
    const { data: profile } = await supabase
      .from("patients")
      .select("full_name, id")
      .eq("id", user.id)
      .single();

    if (profile) {
      patientData = {
        name: profile.full_name,
        id: `#${profile.id.substring(0, 5)}`, // Using first 5 chars of UUID as ID for display

      };
    }
  }

  return (
    <PatientProvider initialPatientData={patientData}>
      <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
        {/* Patient-specific top navbar (minimal, calm) */}
        <PatientNavBar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </PatientProvider>
  );
}
