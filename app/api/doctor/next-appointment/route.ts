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
    
    // Fetch the next appointment for the doctor
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .select(`
        id,
        datetime,
        description,
        patients (
          full_name
        )
      `)
      .eq('doctor_id', user.id)
      .eq('status', 'scheduled')
      .gte('datetime', new Date().toISOString())
      .order('datetime', { ascending: true })
      .limit(1)
      .single();
    
    if (appointmentError) {
      // If no appointment found, return null instead of error
      if (appointmentError.code === 'PGRST116') {
        return NextResponse.json(null);
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch appointment' },
        { status: 500 }
      );
    }
    
    if (!appointment) {
      return NextResponse.json(null);
    }
    
    // Format the datetime
    const appointmentDate = new Date(appointment.datetime);
    const now = new Date();
    const isToday = appointmentDate.toDateString() === now.toDateString();
    const isTomorrow = appointmentDate.toDateString() === new Date(now.getTime() + 86400000).toDateString();
    
    let timeString = '';
    if (isToday) {
      timeString = `Today at ${appointmentDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })}`;
    } else if (isTomorrow) {
      timeString = `Tomorrow at ${appointmentDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })}`;
    } else {
      timeString = appointmentDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
    
    // Return formatted appointment data
    const nextAppointment = {
      id: appointment.id,
      patientName: appointment.patients?.[0]?.full_name || 'Unknown Patient',
      time: timeString,
      purpose: appointment.description || 'No description provided',
    };
    
    return NextResponse.json(nextAppointment);
  } catch (error) {
    console.error('Error fetching next appointment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}