import React from "react";
import "../styles/YearRow.css";
import type { DayEntry } from "../lib/date";

interface YearRowProps {
  dates: DayEntry[];
}

const YearRow: React.FC<YearRowProps> = ({ dates }) => {
  return (
    <div className="year-row">
      {dates.map((entry, index) => (
        <div key={index} className="day-cell">
          {entry.date ? entry.date.getDate() : ''}
        </div>
      ))}
    </div>
  );
};

export default YearRow; 