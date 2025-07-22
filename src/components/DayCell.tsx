import React from "react";
import { Paper, Text } from '@mantine/core';
import type { DayEntry } from "../lib/date";

interface DayCellProps {
  entry: DayEntry;
  isSelected: boolean;
  hasEntry: boolean;
  onClick: (date: Date) => void;
}

const DayCell: React.FC<DayCellProps> = ({ entry, isSelected, hasEntry, onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  let backgroundColor = 'transparent';
  if (isSelected) {
    backgroundColor = 'var(--mantine-color-blue-1)';
  } else if (isHovered) {
    backgroundColor = '#f1f3f5';
  }

  return (
    <Paper
      p="xs"
      style={{
        flex: 1,
        minWidth: 40,
        textAlign: 'center',
        cursor: entry.date ? 'pointer' : 'default',
        backgroundColor,
        position: 'relative',
      }}
      onClick={() => entry.date && onClick(entry.date)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
};

export default DayCell; 