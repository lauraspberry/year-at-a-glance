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