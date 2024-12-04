import { auth } from '@/auth';
import { FindUserTickets } from '@/lib/actions/TicketActions';
import { redirect } from 'next/navigation';
import Callendar from './components/Calendar/Calendar';
import { getCurrentMonthDays } from '@/lib/actions/CalendarActions';
import Calendar from './components/Calendar/Calendar';


const page = async () => {
  const session = await auth();
  if (!session?.user) redirect('/authentication/sign-in?callbackUrl=/dashboard');

  const data = await FindUserTickets(session.user.id as string);
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-indexed: January = 0
  const currentDay = today.getDate();

  const days = await getCurrentMonthDays(session.user.id as string, currentYear, currentMonth);

  if (!data) {
    return <h1>No notes</h1>;
  }

  return (
    <Calendar 
      initialDays={days} 
      currentYear={currentYear} 
      currentMonth={currentMonth} 
      currentDay={currentDay} 
    />
  );
};

export default page;
