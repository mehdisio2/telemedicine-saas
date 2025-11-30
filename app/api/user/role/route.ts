import { NextResponse } from "next/server";
import { getUserRole } from "@/lib/auth/roleServer";

export async function GET() {
  try {
    const result = await getUserRole();

    // If no authenticated user or unrecognized role
    if (result.role === null) {
      return NextResponse.json(
        { role: null },
        { status: 200 }
      );
    }

    // Doctor with status
    if (result.role === "doctor") {
      return NextResponse.json(
        {
          role: "doctor",
          status: result.status, // "approved" | "pending"
        },
        { status: 200 }
      );
    }

    // Patient
    if (result.role === "patient") {
      return NextResponse.json(
        { role: "patient" },
        { status: 200 }
      );
    }

    // Fallback
    return NextResponse.json({ role: null }, { status: 200 });
  } catch (err) {
    console.error("Error fetching user role:", err);
    return NextResponse.json(
      { error: "Failed to fetch user role" },
      { status: 500 }
    );
  }
}