import { createClient } from "@/lib/supabase/server";
import { VideoCall } from "@/components/video-call";
import { notFound } from "next/navigation";

export default async function PatientVideoCallPage({
    params,
}: {
    params: Promise<{ roomId: string }>;
}) {
    const { roomId } = await params;
    const supabase = await createClient();

    // Get the authenticated user
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        notFound();
    }

    // Fetch patient info
    const { data: patient, error: patientError } = await supabase
        .from("patients")
        .select("full_name")
        .eq("id", user.id)
        .single();

    if (patientError || !patient) {
        console.error("Error fetching patient:", patientError);
        notFound();
    }

    // Validate the room exists in an appointment for this patient
    const { data: appointment, error: appointmentError } = await supabase
        .from("appointments")
        .select("id, room_id")
        .eq("room_id", roomId)
        .eq("patient_id", user.id)
        .single();

    if (appointmentError || !appointment) {
        console.error("No valid appointment found for this room:", appointmentError);
        notFound();
    }

    return (
        <VideoCall
            roomName={roomId}
            userDisplayName={patient.full_name}
            userRole="patient"
            returnPath={`/patient/appointments/${appointment.id}`}
        />
    );
}
