import { createClient } from "@/lib/supabase/server";
import { DoctorSidebar } from "@/components/doctor/sidebar";
import { StartConsultationCard } from "@/components/doctor/start-consultation-card";
import { AppointmentOverviewCard } from "@/components/doctor/appointment-overview-card";
import { AddNotesSection } from "@/components/doctor/add-notes-section";
import { PastNotesSection } from "@/components/doctor/past-notes-section";
import { PatientInfoCard } from "@/components/doctor/patient-info-card";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DoctorAppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch appointment details
  const { data: appointment, error: appointmentError } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", id)
    .single();

  if (appointmentError || !appointment) {
    console.error("Error fetching appointment:", appointmentError);
    notFound();
  }

  // Fetch patient details
  const { data: patient, error: patientError } = await supabase
    .from("patients")
    .select("*")
    .eq("id", appointment.patient_id)
    .single();

  if (patientError || !patient) {
    console.error("Error fetching patient:", patientError);
    // Handle missing patient gracefully or 404
  }

  // Mock past notes for now as we don't have a notes table yet
  const pastNotes = [
    {
      date: "November 10, 2025",
      note: "Patient reported improvement in chest discomfort. Blood pressure stable at 118/78 mmHg. Continuing current medication regimen. Advised to maintain regular exercise routine."
    },
    {
      date: "September 5, 2025",
      note: "Initial consultation. Patient presents with occasional chest discomfort during physical activity. ECG performed - normal sinus rhythm. Recommended lifestyle modifications and scheduled follow-up."
    }
  ];

  const formattedDate = new Date(appointment.datetime).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = new Date(appointment.datetime).toLocaleTimeString("en-US", {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen">
      {/* Sidebar */}
      <DoctorSidebar />

      {/* Main content area */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/doctor/appointments"
              className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-block"
            >
              ← Back to Appointments
            </Link>
            <h1 className="text-3xl font-semibold text-[#111111] mb-2">Appointment Details</h1>
            <p className="text-gray-600">Manage your consultation and add medical notes.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Start Consultation Card */}
              <StartConsultationCard
                roomId={appointment.room_id || ""}
                isActive={appointment.status === "scheduled"} // Assuming scheduled means active for now
              />

              {/* Appointment Overview Card */}
              <AppointmentOverviewCard
                date={formattedDate}
                time={formattedTime}
                duration="30 minutes" // Default duration as it's not in DB
                reason={appointment.description || "General Consultation"}
                status={appointment.status as "confirmed" | "completed" | "cancelled"}
              />

              {/* Add Notes Section */}
              <AddNotesSection />

              {/* Past Notes Section */}
              <PastNotesSection notes={pastNotes} />
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {/* Patient Info Card */}
              <PatientInfoCard
                patient={{
                  name: patient?.full_name || "Unknown",
                  age: patient?.age || 0, // Assuming age exists or defaulting
                  gender: patient?.gender || "Unknown",
                  email: patient?.email || "Unknown",
                  phone: patient?.phone || "Unknown",
                  bloodType: patient?.blood_type || "Unknown" // Guessing column name
                }}
              />

              {/* Room ID Card */}
              <section className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Video Call Details</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Room ID</p>
                  <p className="text-base font-mono font-semibold text-gray-900 break-all">{appointment.room_id || "Not assigned"}</p>
                </div>
                <p className="text-xs text-gray-500 mt-3">Share this ID with the patient if needed</p>
              </section>

              {/* Actions Card */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>

                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <p className="text-sm font-medium text-gray-900">View Patient History</p>
                  </button>

                  <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <p className="text-sm font-medium text-gray-900">Download Report</p>
                  </button>

                  {appointment.status === "scheduled" && (
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors">
                      <p className="text-sm font-medium">Cancel Appointment</p>
                    </button>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}