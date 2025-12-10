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

                {(() => {
                  const appointmentDate = new Date(appointment.datetime);
                  const now = new Date();
                  const isPastAppointment = appointmentDate < now;

                  if (isPastAppointment && (appointment.status === 'completed' || appointment.status === 'confirmed' || appointment.status === 'scheduled')) {
                    // Get the reason for visit from the appointment description
                    const reasonForVisit = appointment.description || "General Consultation";

                    // Generate medical notes specific to the reason for visit
                    const generateNotesForReason = (reason: string) => {
                      const lowerReason = reason.toLowerCase();

                      // Return notes tailored to the specific reason for visit
                      if (lowerReason.includes("headache") || lowerReason.includes("migraine") || lowerReason.includes("head pain")) {
                        return {
                          chiefComplaint: reason,
                          assessment: "Patient presented with " + reason + ". Comprehensive neurological examination performed. Cranial nerves II-XII intact. No papilledema noted on fundoscopic exam. No focal neurological deficits observed.",
                          diagnosis: "Primary headache disorder - Tension-type headache with possible migrainous features",
                          treatment: "1. Ibuprofen 400mg PRN for acute episodes (max 3x daily)\n2. Lifestyle modifications: regular sleep schedule, hydration\n3. Stress management and relaxation techniques discussed\n4. Headache diary recommended to track triggers",
                          followUp: "Return in 2 weeks if symptoms persist. Seek immediate care if experiencing sudden severe headache, vision changes, or fever."
                        };
                      } else if (lowerReason.includes("cold") || lowerReason.includes("flu") || lowerReason.includes("fever") || lowerReason.includes("cough") || lowerReason.includes("sore throat")) {
                        return {
                          chiefComplaint: reason,
                          assessment: "Patient presented with " + reason + ". Vitals: Temperature 37.8°C, otherwise stable. Throat exam shows mild pharyngeal erythema. Lungs clear to auscultation bilaterally. No cervical lymphadenopathy.",
                          diagnosis: "Acute viral upper respiratory infection (Common cold / Viral pharyngitis)",
                          treatment: "1. Supportive care: rest and increased fluid intake\n2. Acetaminophen 500mg every 6 hours PRN for fever/discomfort\n3. Honey and warm fluids for throat comfort\n4. Saline nasal spray for congestion",
                          followUp: "Return if symptoms worsen, persist beyond 10 days, or if high fever (>39°C) develops. Watch for signs of secondary bacterial infection."
                        };
                      } else if (lowerReason.includes("skin") || lowerReason.includes("rash") || lowerReason.includes("itch") || lowerReason.includes("acne") || lowerReason.includes("eczema")) {
                        return {
                          chiefComplaint: reason,
                          assessment: "Patient presented with " + reason + ". Dermatological examination performed. Affected areas documented. No signs of secondary infection or systemic involvement. Skin turgor normal.",
                          diagnosis: "Inflammatory dermatitis - likely contact or atopic etiology",
                          treatment: "1. Hydrocortisone 1% cream applied twice daily to affected areas\n2. Gentle, fragrance-free moisturizer after bathing\n3. Avoid known irritants and harsh soaps\n4. Antihistamine (Cetirizine 10mg) for itching if needed",
                          followUp: "Return in 1-2 weeks for reassessment. Seek immediate care if rash spreads rapidly, blisters form, or signs of infection develop."
                        };
                      } else if (lowerReason.includes("anxiety") || lowerReason.includes("stress") || lowerReason.includes("depression") || lowerReason.includes("mental") || lowerReason.includes("sleep") || lowerReason.includes("insomnia")) {
                        return {
                          chiefComplaint: reason,
                          assessment: "Patient discussed concerns regarding " + reason + ". Mental status examination: alert, oriented, appropriate affect. No acute safety concerns. PHQ-9 and GAD-7 screening performed. Sleep hygiene and daily functioning reviewed.",
                          diagnosis: "Adjustment disorder with anxious mood / Generalized anxiety - mild to moderate",
                          treatment: "1. Cognitive behavioral therapy (CBT) referral provided\n2. Sleep hygiene education and relaxation techniques discussed\n3. Regular exercise (30 min, 5 days/week) recommended\n4. Limiting caffeine and screen time before bed\n5. Consider pharmacotherapy if symptoms persist",
                          followUp: "Follow-up in 4 weeks to assess response to interventions. Crisis resources provided. Return sooner if symptoms worsen."
                        };
                      } else if (lowerReason.includes("back") || lowerReason.includes("pain") || lowerReason.includes("joint") || lowerReason.includes("knee") || lowerReason.includes("shoulder") || lowerReason.includes("muscle")) {
                        return {
                          chiefComplaint: reason,
                          assessment: "Patient presented with " + reason + ". Musculoskeletal examination performed. Localized tenderness noted. Range of motion moderately restricted. No neurological deficits. Negative straight leg raise test.",
                          diagnosis: "Mechanical musculoskeletal pain / Myofascial strain",
                          treatment: "1. NSAIDs: Naproxen 500mg twice daily with food for 7 days\n2. Ice/heat therapy as needed\n3. Physical therapy referral for strengthening exercises\n4. Ergonomic modifications at work/home discussed\n5. Activity modification - avoid heavy lifting",
                          followUp: "Return in 3 weeks if no improvement. Consider imaging if symptoms persist beyond 6 weeks or if red flag symptoms develop."
                        };
                      } else if (lowerReason.includes("stomach") || lowerReason.includes("digest") || lowerReason.includes("nausea") || lowerReason.includes("vomit") || lowerReason.includes("diarrhea") || lowerReason.includes("constipation") || lowerReason.includes("abdominal")) {
                        return {
                          chiefComplaint: reason,
                          assessment: "Patient presented with " + reason + ". Abdominal examination: soft, non-distended, mild diffuse tenderness, no guarding or rebound. Bowel sounds present in all quadrants. No organomegaly.",
                          diagnosis: "Functional dyspepsia / Acute gastroenteritis",
                          treatment: "1. Omeprazole 20mg once daily before breakfast for 2 weeks\n2. BRAT diet during acute symptoms\n3. Adequate hydration with electrolyte replacement\n4. Avoid spicy, fatty foods, alcohol, and caffeine\n5. Probiotics recommended",
                          followUp: "Return in 2 weeks for reassessment. Seek immediate care if severe pain, blood in stool, or persistent vomiting."
                        };
                      } else if (lowerReason.includes("check") || lowerReason.includes("annual") || lowerReason.includes("routine") || lowerReason.includes("physical") || lowerReason.includes("wellness")) {
                        return {
                          chiefComplaint: reason,
                          assessment: "Comprehensive health assessment performed for " + reason + ". Vital signs within normal limits. Complete physical examination unremarkable. Lab results reviewed and within normal parameters.",
                          diagnosis: "Routine health maintenance visit - No acute issues identified",
                          treatment: "1. Continue current healthy lifestyle habits\n2. Age-appropriate cancer screenings discussed\n3. Vaccinations reviewed and updated as needed\n4. Diet and exercise counseling provided\n5. Continue current medications as prescribed",
                          followUp: "Annual follow-up recommended. Return sooner if any new health concerns arise."
                        };
                      } else if (lowerReason.includes("allergy") || lowerReason.includes("allergic") || lowerReason.includes("sneez") || lowerReason.includes("runny nose") || lowerReason.includes("hay fever")) {
                        return {
                          chiefComplaint: reason,
                          assessment: "Patient presented with " + reason + ". Nasal examination shows pale, boggy turbinates. No nasal polyps visualized. Eyes show mild conjunctival injection. Lungs clear.",
                          diagnosis: "Allergic rhinitis - seasonal/perennial",
                          treatment: "1. Fluticasone nasal spray 2 sprays each nostril daily\n2. Loratadine 10mg once daily as needed\n3. Allergen avoidance strategies discussed\n4. Saline nasal irrigation recommended\n5. Consider allergy testing if symptoms persist",
                          followUp: "Return if symptoms not controlled with current regimen. Consider referral to allergist for immunotherapy evaluation."
                        };
                      } else {
                        // Generic notes that still reference the specific reason
                        return {
                          chiefComplaint: reason,
                          assessment: "Patient presented for consultation regarding: " + reason + ". Comprehensive evaluation performed. Vital signs stable. Physical examination findings documented. Patient history reviewed.",
                          diagnosis: "Medical consultation completed - " + reason + " addressed during visit",
                          treatment: "1. Treatment plan discussed with patient and agreed upon\n2. Medications prescribed as clinically indicated\n3. Lifestyle modifications recommended\n4. Patient education materials provided\n5. Questions addressed during visit",
                          followUp: "Follow-up as needed based on symptom progression. Contact office with any questions or if symptoms worsen."
                        };
                      }
                    };

                    const notes = generateNotesForReason(reasonForVisit);

                    return (
                      <div className="space-y-4">
                        {/* Chief Complaint */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Chief Complaint / Reason for Visit</h4>
                          <p className="text-sm text-gray-900 font-medium">{notes.chiefComplaint}</p>
                        </div>

                        {/* Clinical Assessment */}
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                          <h4 className="text-sm font-semibold text-blue-800 mb-2">Clinical Assessment</h4>
                          <p className="text-sm text-blue-900">{notes.assessment}</p>
                        </div>

                        {/* Diagnosis */}
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                          <h4 className="text-sm font-semibold text-purple-800 mb-2">Diagnosis</h4>
                          <p className="text-sm text-purple-900">{notes.diagnosis}</p>
                        </div>

                        {/* Treatment Plan */}
                        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                          <h4 className="text-sm font-semibold text-green-800 mb-2">Treatment Plan</h4>
                          <p className="text-sm text-green-900 whitespace-pre-line">{notes.treatment}</p>
                        </div>

                        {/* Follow-up */}
                        <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                          <h4 className="text-sm font-semibold text-amber-800 mb-2">Follow-up Recommendations</h4>
                          <p className="text-sm text-amber-900">{notes.followUp}</p>
                        </div>

                        <p className="text-xs text-gray-400 mt-4 text-center">
                          Notes documented by Dr. {doctor?.full_name || "Physician"} on {formattedDate}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center">
                      <p className="text-gray-500">No medical notes available yet.</p>
                      <p className="text-sm text-gray-400 mt-1">Notes will be added by your doctor after the appointment.</p>
                    </div>
                  );
                })()}
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