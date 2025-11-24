import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseRoute";
import crypto from "crypto";

export async function POST(req: Request) {
  const supabase = await createClient();

  const { doctor_id, datetime, description } = await req.json();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const room_id = crypto.randomUUID();

  const { data, error: insertError } = await supabase
    .from("appointments")
    .insert({
      patient_id: user.id,
      doctor_id,
      datetime,
      description,
      room_id,
      status: "scheduled"
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 400 });
  }

  return NextResponse.json({ appointment: data });
}
