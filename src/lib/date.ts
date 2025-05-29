export interface DayEntry {
    date: Date | null;
    dayOfWeek: number; // 0-6 (Sunday-Saturday)
}  

export function generateYear(year: number): string[] {
  const days: string[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  let current = start;
  while (current <= end) {
    days.push(current.toISOString().split("T")[0]);
    current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
  }
  return days;
} 

export function generate2WeekChunks(year: number): DayEntry[][] {
    // Generate all dates for the year
    const allDates: DayEntry[] = [];
    const startDate = new Date(year, 0, 1); // January 1st
    const endDate = new Date(year, 11, 31); // December 31st
  
    // Add all dates for the year
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      allDates.push({
        date: new Date(date),
        dayOfWeek: date.getDay()
      });
    }
  
    // Calculate padding needed for the first chunk
    const firstDate = allDates[0].date!;
    const firstDayOfWeek = firstDate.getDay();
    const paddingNeeded = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Convert Sunday (0) to 6, others to 0-5
  
    // Create padded array with null entries for padding
    const paddedDates: DayEntry[] = [
      ...Array(paddingNeeded).fill({ date: null, dayOfWeek: -1 }),
      ...allDates
    ];
  
    // Group into chunks of 14 days
    const chunks: DayEntry[][] = [];
    for (let i = 0; i < paddedDates.length; i += 14) {
      let chunk = paddedDates.slice(i, i + 14);
      
      // If the last chunk is incomplete, pad it with null entries
      if (chunk.length < 14) {
        chunk = [
          ...chunk,
          ...Array(14 - chunk.length).fill({ date: null, dayOfWeek: -1 })
        ];
      }
      
      chunks.push(chunk);
    }
  
    return chunks;
  } 