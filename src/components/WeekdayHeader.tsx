import React from "react";
import "../styles/YearRow.css";

const WeekdayHeader: React.FC = () => {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="year-row">
      <div className="month-cell"></div>
      {weekdays.map((day, index) => (
        <div key={index} className="day-cell">
          {day}
        </div>
      ))}
    </div>
  );
};

export default WeekdayHeader; 