import React from "react";
import YearGrid from "./components/YearGrid";

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Year at a Glance – 2025</h1>
      <YearGrid />
    </div>
  );
}
