import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get the authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Fetch doctor data from the database
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('full_name, license_number, specialty')
      .eq('id', user.id)
      .single();
    
    if (doctorError) {
      return NextResponse.json(
        { error: 'Failed to fetch doctor data' },
        { status: 500 }
      );
    }
    
    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }
    
    // Return the doctor data
    const doctorData = {
      name: doctor.full_name,
      degree: doctor.license_number || 'N/A',
      specialty: doctor.specialty || 'General Practice',
      avatar: "/images/doctor-avatar.jpg" // TODO: Add avatar field to database
    };
    
    return NextResponse.json(doctorData);
  } catch (error) {
    console.error('Error fetching doctor profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}