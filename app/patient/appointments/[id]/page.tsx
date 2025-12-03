import { PatientSidebar } from "@/components/patient/sidebar";
import { Calendar, Clock, User, Stethoscope, FileText, Video, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function AppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;

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

  // Fetch doctor details
  const { data: doctor, error: doctorError } = await supabase
    .from("doctors")
    .select("*")
    .eq("id", appointment.doctor_id)
    .single();

  if (doctorError) {
    console.error("Error fetching doctor:", doctorError);
    // We can continue without doctor details, or handle it differently
  }

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
      },
      scheduled: {
        icon: <Clock className="w-4 h-4" />,
        text: "Scheduled",
        className: "bg-teal-50 text-teal-700 border-teal-200"
      },
      upcoming: {
        icon: <Clock className="w-4 h-4" />,
        text: "Upcoming",
        className: "bg-amber-50 text-amber-700 border-amber-200"
      }
    };

    const badge = badges[status as keyof typeof badges] || badges.upcoming;

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
      <PatientSidebar />

      {/* Main content area */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/patient/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-semibold text-[#111111] mb-2">Appointment Details</h1>
            <p className="text-gray-600">View your appointment information and join the video call when ready.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Appointment Overview Card */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Appointment Overview</h2>
                  {getStatusBadge(appointment.status)}
                </div>

                <div className="space-y-4">
                  {/* Date & Time */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="text-base font-semibold text-gray-900">
                        {formattedDate} at {formattedTime}
                      </p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-base font-semibold text-gray-900">30 minutes</p>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Stethoscope className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reason for Visit</p>
                      <p className="text-base font-semibold text-gray-900">{appointment.description || "General Consultation"}</p>
                    </div>
                  </div>

                  {/* Room ID */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <Video className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Room ID</p>
                      <p className="text-base font-mono font-semibold text-gray-900">{appointment.room_id || "Not assigned"}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Medical Notes Card */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-900">Medical Notes</h2>
                </div>

                {/* Notes are not yet in the DB schema provided, so we'll show a placeholder or empty state */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center">
                  <p className="text-gray-500">No medical notes available yet.</p>
                  <p className="text-sm text-gray-400 mt-1">Notes will be added by your doctor after the appointment.</p>
                </div>
              </section>
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {/* Join Call Button */}
              {appointment.status === 'scheduled' && (
                <section className="bg-gradient-to-br from-[#2AB3A3] to-[#1F8478] rounded-2xl shadow-lg p-6 text-white">
                  <div className="text-center mb-4">
                    <Video className="w-12 h-12 mx-auto mb-3" />
                    <h3 className="text-lg font-bold mb-1">Your appointment is ready!</h3>
                    <p className="text-sm text-white/90">Click below to join the video call</p>
                  </div>
                  <Link
                    href={`/patient/video-call/${appointment.room_id}`}
                    className="block w-full bg-white text-[#2AB3A3] hover:bg-teal-50 font-semibold py-3 px-4 rounded-lg text-center transition-colors"
                  >
                    Join Video Call
                  </Link>
                </section>
              )}

              {/* Doctor Info Card */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Doctor Information</h3>

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{doctor?.full_name || "Unknown Doctor"}</p>
                    <p className="text-sm text-gray-600">{doctor?.specialty || "General Practice"}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm text-gray-900">{doctor?.email || "Not available"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="text-sm text-gray-900">{doctor?.phone || "Not available"}</p>
                  </div>
                </div>
              </section>

              {/* Actions Card */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>

                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <p className="text-sm font-medium text-gray-900">Download Summary</p>
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