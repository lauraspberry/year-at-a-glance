import React from "react";
import { Group, Text, Paper } from '@mantine/core';

const WeekdayHeader: React.FC = () => {
  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <Group gap="xs" wrap="nowrap">
      <div style={{ width: 40 }} />
      {weekdays.map((day, index) => (
        <Paper
          key={index}
          p="xs"
          style={{
            flex: 1,
            minWidth: 40,
            textAlign: 'center',
          }}
        >
          <Text size="sm" c="dimmed">
            {day}
          </Text>
        </Paper>
      ))}
    </Group>
  );
};

export default WeekdayHeader; 