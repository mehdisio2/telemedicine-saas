import { createClient } from "../supabase/server";

export type UserRoleResult =
  | { role: "patient" }
  | { role: "doctor"; status: "approved" | "pending" }
  | { role: null };

export async function getUserRole(): Promise<UserRoleResult> {
  const supabase = await createClient();

  // Prefer getUser to avoid null sessions in some server contexts
  const { data: authData, error: sessionError } = await supabase.auth.getUser();
  if (sessionError) {
    console.warn("Session fetch error:", sessionError);
  }

  const userId =authData?.user?.id;

  console.log("Fetched user ID:", userId);

  if (!userId) return { role: null };

  // 1. Patient check (takes precedence)
  const { data: patientRows, error: patientError } = await supabase
    .from("patients")
    .select("id")
    .eq("id", userId)
    .limit(1);

  if (patientError) {
    console.warn("Patient lookup error:", patientError);
  } else if (patientRows && patientRows.length > 0) {
    return { role: "patient" };
  }

  // 2. Doctor check
  const { data: doctorRows, error: doctorError } = await supabase
    .from("doctors")
    .select("verification_status")
    .eq("id", userId)
    .limit(1);

  if (doctorError) {
    console.warn("Doctor lookup error:", doctorError);
    return { role: null };
  }

  if (!doctorRows || doctorRows.length === 0) {
    return { role: null };
  }

  const verification_status = doctorRows[0]?.verification_status;

  if (verification_status === "approved") {
    return { role: "doctor", status: "approved" };
  }
  if (verification_status === "pending") {
    return { role: "doctor", status: "pending" };
  }

  // rejected or any other unexpected status
  return { role: null };
}