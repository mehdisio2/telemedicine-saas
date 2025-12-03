import { createClient } from "@/lib/supabase/server";
import { DoctorSidebar } from "@/components/doctor/sidebar";
import { AppointmentsList } from "@/components/doctor/appointments-list";

export default async function DoctorAppointmentsPage() {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Handle unauthorized access (redirect or show error)
    return <div>Unauthorized</div>;
  }

  // Fetch appointments
  const { data: appointments, error: fetchError } = await supabase
    .from("appointments")
    .select("id, datetime, description, patient_id, status")
    .eq("doctor_id", user.id)
    .order("datetime", { ascending: false });

  if (fetchError) {
    console.error("Error fetching appointments:", fetchError);
    return <div>Error loading appointments</div>;
  }

  // Collect unique patient IDs
  const patientIds = [...new Set((appointments ?? []).map(apt => apt.patient_id))];

  // Fetch patient profiles
  const { data: patients, error: patientError } = await supabase
    .from("patients")
    .select("*")
    .in("id", patientIds);

  if (patientError) {
    console.error("Error fetching patients:", patientError);
    return <div>Error loading patient data</div>;
  }

  const patientMap = new Map((patients ?? []).map(p => [p.id, p]));

  const formattedAppointments = (appointments ?? []).map(apt => {
    const patient = patientMap.get(apt.patient_id);
    return {
      id: apt.id,
      patient: {
        name: patient?.full_name || "Unknown",
        age: patient?.age || 0,
        gender: patient?.gender || "Unknown"
      },
      date: new Date(apt.datetime).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: new Date(apt.datetime).toLocaleTimeString("en-US", {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      datetime: apt.datetime,
      status: apt.status || "scheduled",
      reason: apt.description || "General Consultation",
      duration: "30 minutes" // Default duration
    };
  });

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen">
      {/* Sidebar */}
      <DoctorSidebar />

      {/* Main content area */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#111111] mb-2">Appointments</h1>
            <p className="text-gray-600">Manage and view all your patient appointments.</p>
          </div>

          <AppointmentsList appointments={formattedAppointments} />
        </div>
      </main>
    </div>
  );
}