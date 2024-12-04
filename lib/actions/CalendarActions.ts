import { db } from "@/db";

export const getCurrentMonthDays = async (userId: string, year: number, month: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month

  const startOfMonth = new Date(year, month, 1); // First day of the month
  const endOfMonth = new Date(year, month + 1, 0); // Last day of the month
  
  // Fetch notes from the database within the given date range
  const notesData = await db.note.findMany({
    where: {
      userId: userId,
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc', // Sort notes by creation date
    },
  });

  // Group the notes by day
  const notesByDate = notesData.reduce((acc, note) => {
    const day = note.createdAt.getDate(); // Get the day from createdAt
    if (!acc[day]) acc[day] = [];
    acc[day].push(note); // Add the note to the appropriate day
    return acc;
  }, {} as Record<number, typeof notesData>);

  // Return an array of days, each containing the weekday and associated notes
  return Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(year, month, index + 1); // Get the date for the current day
    const day = index + 1; // Day of the month
    const weekday = date.toLocaleString('en-US', { weekday: 'short' }); // Weekday abbreviation (e.g., "Mon", "Tue")
    const notes = notesByDate[day] || []; // Get notes for this day or an empty array if no notes exist
    
    return {
      day,
      weekday,
      notes,
    };
  });
};
