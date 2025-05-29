import React from "react";
import { generate2WeekChunks } from "../lib/date";
import YearRow from "./YearRow";

const YearGrid: React.FC = () => {
  const rows = generate2WeekChunks(2025);

  return (
    <>
      {/* <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px', padding: '10px', background: '#f5f5f5' }}>
        {JSON.stringify(rows, null, 2)}
      </pre> */}
      <div className="flex flex-col gap-1">
        {rows.map((row, index) => (
          <YearRow key={index} dates={row} />
        ))}
      </div>
    </>
  );
};

export default YearGrid; 