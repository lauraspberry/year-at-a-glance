import React from "react";
import { Group, Text, Paper } from '@mantine/core';
import type { DayEntry } from "../lib/date";

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
        const isSelected = selectedDate && entry.date && 
          selectedDate.toDateString() === entry.date.toDateString();
        const hasEntry = entry.date && datesWithEntries.has(formatDate(entry.date));

        return (
          <Paper
            key={index}
            p="xs"
            style={{
              flex: 1,
              minWidth: 40,
              textAlign: 'center',
              cursor: entry.date ? 'pointer' : 'default',
              backgroundColor: isSelected ? 'var(--mantine-color-blue-1)' : 'transparent',
              position: 'relative',
            }}
            onClick={() => entry.date && onDayClick(entry.date)}
          >
            {hasEntry && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: 'var(--mantine-color-blue-5)',
                  borderRadius: '2px 2px 0 0',
                }}
              />
            )}
            <Text size="sm" c={entry.date ? undefined : 'dimmed'}>
              {entry.date ? entry.date.getDate() : ''}
            </Text>
          </Paper>
        );
      })}
    </Group>
  );
};

export default YearRow; 