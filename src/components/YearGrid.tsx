import React from "react";
import { generate2WeekChunks } from "../lib/date";
import { Stack } from '@mantine/core';
import YearRow from "./YearRow";
import WeekdayHeader from "./WeekdayHeader";

interface YearGridProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
  datesWithEntries: Set<string>;
}

const YearGrid: React.FC<YearGridProps> = ({ onDateSelect, selectedDate, datesWithEntries }) => {
  const rows = generate2WeekChunks(2025);

  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'short' });
  };

  return (
    <Stack gap="xs" style={{ 
      maxWidth: '100%',
      margin: '0 auto',
      padding: '1rem',
      overflowX: 'auto'
    }}>
      <WeekdayHeader />
      {rows.map((row, index) => {
        // Check if any date in the row is the first day of a month
        const firstDayOfMonth = row.find(entry => entry.date?.getDate() === 1)?.date;
        const monthName = firstDayOfMonth ? getMonthName(firstDayOfMonth) : undefined;

        return (
          <YearRow 
            key={index} 
            dates={row} 
            monthName={monthName}
            onDayClick={onDateSelect}
            selectedDate={selectedDate}
            datesWithEntries={datesWithEntries}
          />
        );
      })}
    </Stack>
  );
};

export default YearGrid; 