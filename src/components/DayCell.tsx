import React from "react";
import type { DayEntry } from "../lib/date";
import { Text } from '@mantine/core';

interface DayCellProps {
  entry: DayEntry;
  onClick?: () => void;
}

const DayCell: React.FC<DayCellProps> = ({ entry, onClick }) => {
  return (
    <Text 
      className="day-cell"
      onClick={entry.date ? onClick : undefined}
      style={{ 
        cursor: entry.date ? 'pointer' : 'default',
      }}
      fw={700}
    >
      {entry.date ? entry.date.getDate() : ''}
    </Text>
  );
};

export default DayCell; 