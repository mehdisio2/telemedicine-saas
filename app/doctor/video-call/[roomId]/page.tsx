import { createClient } from "@/lib/supabase/server";
import { VideoCall } from "@/components/video-call";
import { notFound } from "next/navigation";

export default async function DoctorVideoCallPage({
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

    // Fetch doctor info
    const { data: doctor, error: doctorError } = await supabase
        .from("doctors")
        .select("full_name")
        .eq("id", user.id)
        .single();

    if (doctorError || !doctor) {
        console.error("Error fetching doctor:", doctorError);
        notFound();
    }

    // Validate the room exists in an appointment for this doctor
    const { data: appointment, error: appointmentError } = await supabase
        .from("appointments")
        .select("id, room_id")
        .eq("room_id", roomId)
        .eq("doctor_id", user.id)
        .single();

    if (appointmentError || !appointment) {
        console.error("No valid appointment found for this room:", appointmentError);
        notFound();
    }

    return (
        <VideoCall
            roomName={roomId}
            userDisplayName={`Dr. ${doctor.full_name}`}
            userRole="doctor"
            returnPath={`/doctor/appointments/${appointment.id}`}
        />
    );
}
