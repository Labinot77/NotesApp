"use client";

import { useState, useEffect } from 'react';
import { monthNames, WeekdayNames } from '@/constants/CalendarInfo';
import CalendayDayModal from './CalendayDayModal';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface CalendarProps {
  initialDays: { 
    day: number; 
    weekday: string; 
    notes: any[]; // Replace `any` with the actual type of notes
  }[];
  currentYear: number;
  currentMonth: number;
  currentDay: number;
}

const Calendar = ({ initialDays, currentYear, currentMonth, currentDay }: CalendarProps) => {
  const session = useSession()
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [days, setDays] = useState(initialDays);

  // Fetch days for the new month/year
  useEffect(() => {
    const fetchDays = async () => {
      try {
        const response = await fetch(`/api/calendar?userId=${session?.data?.user?.id}&year=${year}&month=${month}`);
        const data = await response.json();
        setDays(data.days);
      } catch (error) {
        console.error('Error fetching days:', error);
      } finally {
      }
    };

    fetchDays();
  }, [month, year]);

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0); // January (0)
      setYear(year + 1); // Move to next year
    } else {
      setMonth(month + 1); // Go to the next month
    }
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11); // December (11)
      setYear(year - 1); // Move to previous year
    } else {
      setMonth(month - 1); // Go to the previous month
    }
  };

  return (
    <div>
      {/* Header with navigation buttons */}
      <div className="flex justify-center gap-2 items-center mb-6">
        <button onClick={handlePrevMonth}>
          <ArrowLeft />
        </button>
        <h1 className="text-3xl font-bold text-center">
          {monthNames[month]} {year}
        </h1>
        <button onClick={handleNextMonth}>
          <ArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center font-bold mb-2">
        {WeekdayNames.map((label) => (
          <div key={label} className="p-2">
            {label}
          </div>
        ))}
      </div>


        <div className="grid grid-cols-7 gap-2">
          {days.map(({ day, weekday, notes }) => (
           <CalendayDayModal notes={notes} key={day}>
           <div
             className={`p-8 text-center border rounded cursor-pointer ${
               (day === currentDay && month === currentMonth && year === currentYear)
                 ? 'bg-blue-500 text-white font-bold'
                 : 'bg-gray-400'
             }`}
           >
             <div>{day}</div>
             <div className="mt-2 p-2 text-sm">
               {notes && notes.length > 0 ? (
                 <strong>
                   {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
                 </strong>
               ) : (
                 <div className="text-sm text-gray-600">No notes</div>
               )}
             </div>
           </div>
         </CalendayDayModal>         
          ))}
        </div>
    </div>
  );
};

export default Calendar;
