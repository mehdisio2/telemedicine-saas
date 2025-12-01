import { PatientSidebar } from "@/components/patient/sidebar";
import { PatientHealthRecordsCard } from "@/components/patient/health-records-card";
import { BookAppointmentCTA } from "@/components/patient/book-appointment-cta";
import { UpcomingAppointmentsList } from "@/components/patient/upcoming-appointments-list";
import { PastAppointmentsList } from "@/components/patient/past-appointments-list";

export default function PatientDashboard() {
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
            {/* Upcoming Appointments List - Bottom Left (extracted) */}
            <UpcomingAppointmentsList
              items={[
                { doctor: "Dr. Sarah Smith", reason: "General Checkup", datetime: "December 5, 2025 - 10:00 AM" },
                { doctor: "Dr. Michael Johnson", reason: "Cardiology Consultation", datetime: "December 12, 2025 - 2:30 PM" },
                { doctor: "Dr. Emily Davis", reason: "Follow-up Visit", datetime: "December 18, 2025 - 11:00 AM" },
              ]}
            />

            {/* Past Appointments List - Bottom Right (extracted) */}
            <PastAppointmentsList
              items={[
                { doctor: "Dr. Robert Brown", reason: "Annual Physical", datetime: "November 20, 2025 - 9:00 AM" },
                { doctor: "Dr. Sarah Smith", reason: "Flu Vaccination", datetime: "October 15, 2025 - 3:00 PM" },
                { doctor: "Dr. Michael Johnson", reason: "Blood Work Review", datetime: "September 28, 2025 - 1:00 PM" },
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  );
}