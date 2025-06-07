import React from "react";
import { Group, Text } from '@mantine/core';
import type { DayEntry } from "../lib/date";
import DayCell from "./DayCell";

interface YearRowProps {
  dates: DayEntry[];
  monthName?: string;
  onDayClick: (date: Date) => void;
  selectedDate: Date | null;
  datesWithEntries: Set<string>;
}

const YearRow: React.FC<YearRowProps> = ({ dates, monthName, onDayClick, selectedDate, datesWithEntries }) => {
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <Group gap="xs" wrap="nowrap">
      {monthName && (
        <Text size="sm" w={40} style={{ textAlign: 'right' }}>
          {monthName}
        </Text>
      )}
      {!monthName && <div style={{ width: 40 }} />}
      {dates.map((entry, index) => {
        const isSelected = Boolean(selectedDate && entry.date && 
          selectedDate.toDateString() === entry.date.toDateString());
        const hasEntry = Boolean(entry.date && datesWithEntries.has(formatDate(entry.date)));

        return (
          <DayCell
            key={index}
            entry={entry}
            isSelected={isSelected}
            hasEntry={hasEntry}
            onClick={onDayClick}
          />
        );
      })}
    </Group>
  );
};

export default YearRow; 