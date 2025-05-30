import React, { useState } from "react";
import { generate2WeekChunks } from "../lib/date";
import YearRow from "./YearRow";
import WeekdayHeader from "./WeekdayHeader";

const YearGrid: React.FC = () => {
  const rows = generate2WeekChunks(2025);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' });
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col gap-1">
      {selectedDate && (
        <div className="selected-date">
          Selected: {selectedDate.toLocaleDateString(undefined, { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      )}
      <WeekdayHeader />
      {/* <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px', padding: '10px', background: '#f5f5f5' }}>
        {JSON.stringify(rows, null, 2)}
      </pre> */}
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
    </div>
  );
};

export default YearGrid; 