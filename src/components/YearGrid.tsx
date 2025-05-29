import React from "react";
import { generateYear } from "../lib/date";
import YearRow from "./YearRow";

const YearGrid: React.FC = () => {
  const yearDays = generateYear(2025);

  // Group days into chunks of 14 (2 weeks) so that each row is a horizontal row.
  const rows: string[][] = [];
  for (let i = 0; i < yearDays.length; i += 14) {
    const chunk = yearDays.slice(i, i + 14);
    if (chunk.length > 0) {
      rows.push(chunk);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      {rows.map((row, index) => (
        <YearRow key={index} dates={row} />
      ))}
    </div>
  );
};

export default YearGrid; 