import { NextResponse } from 'next/server';
import { getCurrentMonthDays } from '@/lib/actions/CalendarActions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  if (!userId || !year || !month) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const days = await getCurrentMonthDays(userId, parseInt(year), parseInt(month));
    return NextResponse.json({ days });
  } catch (error) {
    console.error('Error in calendar API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
