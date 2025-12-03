import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    const { doctor_id, datetime, description } = await req.json();

    // 1. Validate User Authentication
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Validate Input Fields
    if (!doctor_id || !datetime) {
      return NextResponse.json({ error: "Missing required fields: doctor_id and datetime are required." }, { status: 400 });
    }

    // 3. Validate Date (Must be in the future)
    const appointmentDate = new Date(datetime);
    const now = new Date();
    if (isNaN(appointmentDate.getTime())) {
      return NextResponse.json({ error: "Invalid datetime format." }, { status: 400 });
    }
    if (appointmentDate <= now) {
      return NextResponse.json({ error: "Appointment time must be in the future." }, { status: 400 });
    }

    const room_id = crypto.randomUUID();

    // 4. Insert Appointment
    const { data, error: insertError } = await supabase
      .from("appointments")
      .insert({
        patient_id: user.id,
        doctor_id,
        datetime,
        description: description || "", // Optional description
        room_id,
        status: "scheduled"
      })
      .select()
      .single();

    if (insertError) {
      console.error("Supabase Insert Error:", insertError);
      return NextResponse.json({ error: "Failed to create appointment. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ appointment: data });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
