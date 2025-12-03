import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PUT(req: Request) {
    const supabase = await createClient();

    try {
        const availability = await req.json(); // Expecting an array of availability objects

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Prepare data for upsert
        // Ensure doctor_id is set to current user for security
        const upsertData = availability.map((item: any) => ({
            doctor_id: user.id,
            day_of_week: item.day_of_week,
            start_time: item.start_time,
            end_time: item.end_time,
            is_active: item.is_active,
        }));

        const { data, error } = await supabase
            .from("doctor_availability")
            .upsert(upsertData, { onConflict: "doctor_id, day_of_week" })
            .select();

        if (error) {
            console.error("Error updating availability:", error);
            return NextResponse.json({ error: "Failed to update availability" }, { status: 500 });
        }

        return NextResponse.json({ availability: data });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
