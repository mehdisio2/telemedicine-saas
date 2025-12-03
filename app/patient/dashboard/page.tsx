import { createClient } from "@/lib/supabase/server";
import { PatientSidebar } from "@/components/patient/sidebar";
import { PatientHealthRecordsCard } from "@/components/patient/health-records-card";
import { BookAppointmentCTA } from "@/components/patient/book-appointment-cta";
import { UpcomingAppointmentsList } from "@/components/patient/upcoming-appointments-list";
import { PastAppointmentsList } from "@/components/patient/past-appointments-list";

export default async function PatientDashboard() {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  // Fetch appointments for the patient
  const { data: appointments, error: fetchError } = await supabase
    .from("appointments")
    .select("id, datetime, description, doctor_id, status")
    .eq("patient_id", user.id)
    .order("datetime", { ascending: false });

  if (fetchError) {
    console.error("Error fetching appointments:", fetchError);
  }

  // Collect unique doctor IDs
  const doctorIds = [...new Set((appointments ?? []).map(apt => apt.doctor_id))];

  // Fetch doctor profiles
  const { data: doctors, error: doctorError } = await supabase
    .from("doctors")
    .select("id, full_name, specialty")
    .in("id", doctorIds);

  if (doctorError) {
    console.error("Error fetching doctors:", doctorError);
  }

  const doctorMap = new Map((doctors ?? []).map(d => [d.id, d]));

  const now = new Date();

  const upcomingAppointments = (appointments ?? [])
    .filter(apt => {
      const aptDate = new Date(apt.datetime);
      return aptDate >= now && apt.status === 'scheduled';
    })
    .map(apt => {
      const doctor = doctorMap.get(apt.doctor_id);
      return {
        doctor: doctor?.full_name || "Unknown Doctor",
        reason: apt.description || "General Consultation",
        datetime: new Date(apt.datetime).toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        }) + (doctor?.specialty ? ` • ${doctor.specialty}` : ""),
        href: `/patient/appointments/${apt.id}`
      };
    })
    .reverse(); // Show closest upcoming first

  const pastAppointments = (appointments ?? [])
    .filter(apt => {
      const aptDate = new Date(apt.datetime);
      return aptDate < now || apt.status === 'completed';
    })
    .map(apt => {
      const doctor = doctorMap.get(apt.doctor_id);
      return {
        doctor: doctor?.full_name || "Unknown Doctor",
        reason: apt.description || "General Consultation",
        datetime: new Date(apt.datetime).toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        }),
        href: `/patient/appointments/${apt.id}`
      };
    });

  return (
    <div className="flex bg-[#F9FAFB]">
      {/* Sidebar - full height */}
      <PatientSidebar />

      {/* Main content area */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#111111] mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's an overview of your health and appointments.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <PatientHealthRecordsCard
                title="Health Records"
                records={[
                  {
                    label: "Heart Rate",
                    value: "140 Bpm",
                    icon: "heart",
                    percentage: "2%",
                    percentageColor: "text-green-600"
                  },
                  {
                    label: "Body Temperature",
                    value: "37.5 C",
                    icon: "thermometer"
                  },
                  {
                    label: "Glucose Level",
                    value: "70 - 90",
                    icon: "droplet",
                    percentage: "6%",
                    percentageColor: "text-red-600"
                  },
                  {
                    label: "SPo2",
                    value: "96%",
                    icon: "activity"
                  },
                  {
                    label: "Blood Pressure",
                    value: "100 mg/dl",
                    icon: "droplet",
                    percentage: "2%",
                    percentageColor: "text-green-600"
                  },
                  {
                    label: "BMI",
                    value: "20.1 kg/m2",
                    icon: "scale"
                  },
                ]}
                overallHealth={95}
                lastVisitDate="25 Mar 2025"
              />
            </div>
            <BookAppointmentCTA href="/patient/appointments/new" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Appointments List - Bottom Left */}
            <UpcomingAppointmentsList
              items={upcomingAppointments}
            />

            {/* Past Appointments List - Bottom Right */}
            <PastAppointmentsList
              items={pastAppointments}
            />
          </div>
        </div>
      </main>
    </div>
  );
}