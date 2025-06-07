import React from "react";
import type { DayEntry } from "../lib/date";
import { Text, Box } from '@mantine/core';

interface DayCellProps {
  entry: DayEntry;
  onClick?: () => void;
  selected?: boolean;
}

const DayCell: React.FC<DayCellProps> = ({ entry, onClick, selected }) => {
  return (
    <Box
      className="day-cell"
      onClick={entry.date ? onClick : undefined}
      style={{ 
        cursor: entry.date ? 'pointer' : 'default',
        backgroundColor: selected ? 'var(--mantine-color-blue-4)' : 'var(--mantine-color-gray-1)',
        borderRadius: '4px',
        transition: 'background-color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '3rem',
        height: '3rem',
      }}
    >
      <Text fw={700} size="lg">
        {entry.date ? entry.date.getDate() : ''}
      </Text>
    </Box>
  );
};

export default DayCell; 