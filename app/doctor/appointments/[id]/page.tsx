"use client";
import { DoctorSidebar } from "@/components/doctor/sidebar";
import { StartConsultationCard } from "@/components/doctor/start-consultation-card";
import { AppointmentOverviewCard } from "@/components/doctor/appointment-overview-card";
import { AddNotesSection } from "@/components/doctor/add-notes-section";
import { PastNotesSection } from "@/components/doctor/past-notes-section";
import { PatientInfoCard } from "@/components/doctor/patient-info-card";
import Link from "next/link";

// Mock data - replace with actual data fetching
function getAppointmentDetails(id: string) {
  return {
    id,
    date: "December 15, 2025",
    time: "2:30 PM",
    datetime: "2025-12-15T14:30:00",
    status: "confirmed", // confirmed, completed, cancelled
    patient: {
      name: "John Anderson",
      age: 45,
      gender: "Male",
      email: "john.anderson@email.com",
      phone: "+1 (555) 987-6543",
      bloodType: "A+"
    },
    reason: "Cardiology Consultation",
    duration: "30 minutes",
    roomId: "apt-12345-abc",
    isActive: true, // Set to true to show start consultation button
    pastNotes: [
      {
        date: "November 10, 2025",
        note: "Patient reported improvement in chest discomfort. Blood pressure stable at 118/78 mmHg. Continuing current medication regimen. Advised to maintain regular exercise routine."
      },
      {
        date: "September 5, 2025",
        note: "Initial consultation. Patient presents with occasional chest discomfort during physical activity. ECG performed - normal sinus rhythm. Recommended lifestyle modifications and scheduled follow-up."
      }
    ]
  };
}

export default function DoctorAppointmentDetailPage({ params }: { params: { id: string } }) {
  const appointment = getAppointmentDetails(params.id);

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
                roomId={appointment.roomId}
                isActive={appointment.isActive}
              />

              {/* Appointment Overview Card */}
              <AppointmentOverviewCard
                date={appointment.date}
                time={appointment.time}
                duration={appointment.duration}
                reason={appointment.reason}
                status={appointment.status as "confirmed" | "completed" | "cancelled"}
              />

              {/* Add Notes Section */}
              <AddNotesSection />

              {/* Past Notes Section */}
              <PastNotesSection notes={appointment.pastNotes} />
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {/* Patient Info Card */}
              <PatientInfoCard patient={appointment.patient} />

              {/* Room ID Card */}
              <section className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Video Call Details</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Room ID</p>
                  <p className="text-base font-mono font-semibold text-gray-900 break-all">{appointment.roomId}</p>
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

                  {appointment.status === "confirmed" && (
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