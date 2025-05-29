import React from "react";
import "../styles/YearRow.css";

interface YearRowProps {
  dates: string[];
}

const YearRow: React.FC<YearRowProps> = ({ dates }) => {
  return (
    <div className="year-row">
      {dates.map((date) => (
        <div key={date} className="day-cell">
          {new Date(date).getDate()}
        </div>
      ))}
    </div>
  );
};

export default YearRow; 