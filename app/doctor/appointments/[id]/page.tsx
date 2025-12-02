"use client";
import { useState } from "react";
import { DoctorSidebar } from "@/components/doctor/sidebar";
import { Calendar, Clock, User, Stethoscope, FileText, Video, CheckCircle, XCircle, Save, Edit3 } from "lucide-react";
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
  const [currentNotes, setCurrentNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveNotes = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Saving notes:", currentNotes);
    setIsSaving(false);
    // Show success message or redirect
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      confirmed: {
        icon: <CheckCircle className="w-4 h-4" />,
        text: "Confirmed",
        className: "bg-green-50 text-green-700 border-green-200"
      },
      completed: {
        icon: <CheckCircle className="w-4 h-4" />,
        text: "Completed",
        className: "bg-blue-50 text-blue-700 border-blue-200"
      },
      cancelled: {
        icon: <XCircle className="w-4 h-4" />,
        text: "Cancelled",
        className: "bg-red-50 text-red-700 border-red-200"
      }
    };

    const badge = badges[status as keyof typeof badges] || badges.confirmed;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${badge.className}`}>
        {badge.icon}
        {badge.text}
      </span>
    );
  };

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
              {appointment.isActive && (
                <section className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-lg">
                        <Video className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">Ready to Start Consultation</h3>
                        <p className="text-sm text-teal-100">Room ID: <span className="font-mono">{appointment.roomId}</span></p>
                      </div>
                    </div>
                    <Link
                      href={`/doctor/video-call/${appointment.roomId}`}
                      className="bg-white text-teal-600 hover:bg-teal-50 font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Start Consultation
                    </Link>
                  </div>
                </section>
              )}

              {/* Appointment Overview Card */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Appointment Overview</h2>
                  {getStatusBadge(appointment.status)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Date & Time */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="text-base font-semibold text-gray-900">
                        {appointment.date}
                      </p>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-base font-semibold text-gray-900">{appointment.duration}</p>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="flex items-start gap-3 col-span-2">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Stethoscope className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reason for Visit</p>
                      <p className="text-base font-semibold text-gray-900">{appointment.reason}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Add Notes Section */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Edit3 className="w-5 h-5 text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-900">Add Medical Notes</h2>
                </div>
                
                <div className="space-y-4">
                  <textarea
                    value={currentNotes}
                    onChange={(e) => setCurrentNotes(e.target.value)}
                    placeholder="Enter your medical notes here... Include observations, diagnosis, treatment plan, prescriptions, and follow-up recommendations."
                    className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y text-gray-900"
                  />
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {currentNotes.length} characters
                    </p>
                    <button
                      onClick={handleSaveNotes}
                      disabled={!currentNotes.trim() || isSaving}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? "Saving..." : "Save Notes"}
                    </button>
                  </div>
                </div>
              </section>

              {/* Past Notes Section */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="w-5 h-5 text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-900">Past Medical Notes</h2>
                </div>
                
                {appointment.pastNotes.length > 0 ? (
                  <div className="space-y-4">
                    {appointment.pastNotes.map((note, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <p className="text-sm font-semibold text-gray-900">{note.date}</p>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{note.note}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center">
                    <p className="text-gray-500">No previous notes available.</p>
                    <p className="text-sm text-gray-400 mt-1">This is the patient's first visit.</p>
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {/* Patient Info Card */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Patient Information</h3>
                
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{appointment.patient.name}</p>
                    <p className="text-sm text-gray-600">{appointment.patient.age} years • {appointment.patient.gender}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm text-gray-900">{appointment.patient.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="text-sm text-gray-900">{appointment.patient.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Blood Type</p>
                    <p className="text-sm font-semibold text-gray-900">{appointment.patient.bloodType}</p>
                  </div>
                </div>
              </section>

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