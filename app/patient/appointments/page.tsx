import { createClient } from "@/lib/supabase/server";
import { PatientSidebar } from "@/components/patient/sidebar";
import { PatientAppointmentsList } from "@/components/patient/appointments-list";

export default async function PatientAppointmentsPage() {
    const supabase = await createClient();

    // Get current user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        // Handle unauthorized access (redirect or show error)
        return <div>Unauthorized</div>;
    }

    // Fetch appointments for this patient
    const { data: appointments, error: fetchError } = await supabase
        .from("appointments")
        .select("id, datetime, description, doctor_id, status")
        .eq("patient_id", user.id)
        .order("datetime", { ascending: false });

    if (fetchError) {
        console.error("Error fetching appointments:", fetchError);
        return <div>Error loading appointments</div>;
    }

    // Collect unique doctor IDs
    const doctorIds = [...new Set((appointments ?? []).map(apt => apt.doctor_id))];

    // Fetch doctor profiles
    const { data: doctors, error: doctorError } = await supabase
        .from("doctors")
        .select("*")
        .in("id", doctorIds);

    if (doctorError) {
        console.error("Error fetching doctors:", doctorError);
        return <div>Error loading doctor data</div>;
    }

    const doctorMap = new Map((doctors ?? []).map(d => [d.id, d]));

    const formattedAppointments = (appointments ?? []).map(apt => {
        const doctor = doctorMap.get(apt.doctor_id);
        return {
            id: apt.id,
            doctor: {
                name: doctor?.full_name || "Unknown Doctor",
                specialty: doctor?.specialty || "General Practice"
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
            <PatientSidebar />

            {/* Main content area */}
            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold text-[#111111] mb-2">My Appointments</h1>
                        <p className="text-gray-600">View and manage all your upcoming and past appointments.</p>
                    </div>

                    <PatientAppointmentsList appointments={formattedAppointments} />
                </div>
            </main>
        </div>
    );
}
