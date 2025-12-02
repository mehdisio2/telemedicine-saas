import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

type AppointmentListItem = {
  id: string;
  patientName: string;
  patientInitials: string;
  dateTimeLabel: string;
  status: 'scheduled' | 'completed';
  description: string | null;
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
  return (first + last).toUpperCase();
}

function formatDateTimeLabel(ts: string | Date) {
  const d = new Date(ts);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch latest appointments for this doctor (most recent first)
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        datetime,
        description,
        status,
        patients:patients!appointments_patient_id_fkey (
          full_name
        )
      `)
      .eq('doctor_id', user.id)
      .order('datetime', { ascending: false })
      .limit(20);

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
    }

    const items: AppointmentListItem[] = (data ?? []).map((a) => {
      const fullName = (a as any).patients?.full_name ?? 'Unknown Patient';
      return {
        id: a.id as string,
        patientName: fullName,
        patientInitials: getInitials(fullName),
        dateTimeLabel: formatDateTimeLabel(a.datetime as string),
        status: (a.status as 'scheduled' | 'completed') ?? 'scheduled',
        description: (a.description as string | null) ?? null,
      };
    });

    return NextResponse.json(items);
  } catch (e) {
    console.error('Error fetching latest appointments:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}