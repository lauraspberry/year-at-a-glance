import React from "react";

interface YearRowProps {
  dates: string[];
}

const YearRow: React.FC<YearRowProps> = ({ dates }) => {
  return (
    <div className="flex justify-start gap-1 bg-gray-100 p-2">
      {dates.map((date) => (
        <div key={date} className="border border-gray-300 p-1 text-center w-8 h-8">
          {new Date(date).getDate()}
        </div>
      ))}
    </div>
  );
};

export default YearRow; 