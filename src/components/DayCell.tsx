import React from "react";
import type { DayEntry } from "../lib/date";

interface DayCellProps {
  entry: DayEntry;
  onClick?: () => void;
}

const DayCell: React.FC<DayCellProps> = ({ entry, onClick }) => {
  return (
    <div 
      className="day-cell" 
      onClick={entry.date ? onClick : undefined}
      style={{ cursor: entry.date ? 'pointer' : 'default' }}
    >
      {entry.date ? entry.date.getDate() : ''}
    </div>
  );
};

export default DayCell; 