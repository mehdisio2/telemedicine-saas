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
    .select("id, datetime, description, patient_id, status")
    .eq("doctor_id", user.id)
    .order("datetime", { ascending: true });

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 400 });
  }

  // Collect unique patient IDs
  const patientIds = [...new Set((appointments ?? []).map(apt => apt.patient_id))];

  // Fetch patient profiles
  const { data: patients, error: patientError } = await supabase
    .from("patients")
    .select("id, full_name")
    .in("id", patientIds);

  if (patientError) {
    return NextResponse.json({ error: patientError.message }, { status: 400 });
  }

  const patientMap = new Map((patients ?? []).map(p => [p.id, p]));

  const formattedAppointments = (appointments ?? []).map(apt => ({
    id: apt.id,
    date: new Date(apt.datetime).toLocaleDateString(),
    time: new Date(apt.datetime).toLocaleTimeString(),
    description: apt.description,
    patientName: patientMap.get(apt.patient_id)?.full_name || "Unknown",
    status: apt.status || "scheduled"
  }));

  return NextResponse.json({ appointments: formattedAppointments });
}