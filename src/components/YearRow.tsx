import React from "react";
import type { DayEntry } from "../lib/date";
import { Group, Text } from '@mantine/core';
import DayCell from "./DayCell";

interface YearRowProps {
  dates: DayEntry[];
  monthName?: string;
  onDayClick?: (date: Date) => void;
  selectedDate?: Date | null;
}

const YearRow: React.FC<YearRowProps> = ({ dates, monthName, onDayClick, selectedDate }) => {
  return (
    <Group gap="xs" style={{ flexWrap: 'nowrap' }}>
      <Text fw={500} w={64} ta="right" mr="xs">{monthName || ''}</Text>
      {dates.map((entry, index) => (
        <DayCell 
          key={index} 
          entry={entry} 
          onClick={entry.date ? () => onDayClick?.(entry.date!) : undefined}
          selected={entry.date && selectedDate ? 
            entry.date.getDate() === selectedDate.getDate() &&
            entry.date.getMonth() === selectedDate.getMonth() &&
            entry.date.getFullYear() === selectedDate.getFullYear()
            : false
          }
        />
      ))}
    </Group>
  );
};

export default YearRow; 