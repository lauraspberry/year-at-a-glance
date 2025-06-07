import React from "react";
import { Group, Text } from '@mantine/core';
import "../styles/YearRow.css";

const WeekdayHeader: React.FC = () => {
  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <Group gap="xs" style={{ flexWrap: 'nowrap' }}>
      <Text fw={500} w={64} ta="right" mr="xs"></Text>
      {weekdays.map((day, index) => (
        <Text key={index} className="day-cell" fw={700}>
          {day}
        </Text>
      ))}
    </Group>
  );
};

export default WeekdayHeader; 