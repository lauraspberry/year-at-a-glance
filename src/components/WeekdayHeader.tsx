import React from "react";
import { Group, Text, Box } from '@mantine/core';
import "../styles/YearRow.css";

const WeekdayHeader: React.FC = () => {
  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <Group gap="xs" style={{ flexWrap: 'nowrap' }}>
      <Text fw={500} w={64} ta="right" mr="xs"></Text>
      {weekdays.map((day, index) => (
        <Box
          key={index}
          style={{
            width: '3rem',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--mantine-color-gray-7)',
            borderRadius: '4px',
          }}
        >
          <Text fw={700} size="lg" c="white">
            {day}
          </Text>
        </Box>
      ))}
    </Group>
  );
};

export default WeekdayHeader; 