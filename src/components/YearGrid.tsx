import React, { useState } from "react";
import { generate2WeekChunks } from "../lib/date";
import { Stack, Text } from '@mantine/core';
import YearRow from "./YearRow";
import WeekdayHeader from "./WeekdayHeader";

const YearGrid: React.FC = () => {
  const rows = generate2WeekChunks(2025);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'short' });
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <Stack gap="xs">
      {selectedDate && (
        <Text size="lg" fw={500} bg="gray.1" p="md" style={{ borderRadius: '8px' }}>
          Selected: {selectedDate.toLocaleDateString(undefined, { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
      )}
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
            onDayClick={handleDayClick}
          />
        );
      })}
    </Stack>
  );
};

export default YearGrid; 