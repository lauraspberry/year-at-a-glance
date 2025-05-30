import React from "react";
import "../styles/YearRow.css";
import type { DayEntry } from "../lib/date";
import DayCell from "./DayCell";

interface YearRowProps {
  dates: DayEntry[];
  monthName?: string;
  onDayClick?: (date: Date) => void;
}

const YearRow: React.FC<YearRowProps> = ({ dates, monthName, onDayClick }) => {
  return (
    <div className="year-row">
      <div className="month-cell">{monthName || ''}</div>
      {dates.map((entry, index) => (
        <DayCell 
          key={index} 
          entry={entry} 
          onClick={entry.date ? () => onDayClick?.(entry.date!) : undefined}
        />
      ))}
    </div>
  );
};

export default YearRow; 