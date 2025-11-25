import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseRoute";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: appointments, error: fetchError } = await supabase
    .from("appointments")
    .select("id, datetime, description, doctor_id, status")
    .eq("patient_id", user.id)
    .order("datetime", { ascending: true });

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 400 });
  }

  // Get all unique doctor IDs
  const doctorIds = [...new Set(appointments?.map(apt => apt.doctor_id))];

  // Fetch doctor profiles
  const { data: doctors, error: doctorError } = await supabase
    .from("profiles")
    .select("id, name, specialty")
    .in("id", doctorIds);

  if (doctorError) {
    return NextResponse.json({ error: doctorError.message }, { status: 400 });
  }

  // Create a map for quick lookup
  const doctorMap = new Map(doctors?.map(doc => [doc.id, doc]));

  // Transform the data
  const formattedAppointments = appointments?.map(apt => ({
    id: apt.id,
    date: new Date(apt.datetime).toLocaleDateString(),
    time: new Date(apt.datetime).toLocaleTimeString(),
    description: apt.description,
    doctorName: doctorMap.get(apt.doctor_id)?.name || "Unknown",
    doctorSpecialty: doctorMap.get(apt.doctor_id)?.specialty || "",
    status: apt.status || "scheduled" // Adjust based on your schema
  }));

  return NextResponse.json({ appointments: formattedAppointments });
}