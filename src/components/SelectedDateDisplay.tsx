import React from 'react';
import { Paper, Text } from '@mantine/core';

interface SelectedDateDisplayProps {
  selectedDate: Date | null;
}

const SelectedDateDisplay: React.FC<SelectedDateDisplayProps> = ({ selectedDate }) => {
  if (!selectedDate) return null;

  return (
    <Paper p="md" bg="gray.0" radius="md">
      <Text size="lg" fw={500}>
        Selected: {selectedDate.toLocaleDateString(undefined, {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </Text>
    </Paper>
  );
};

export default SelectedDateDisplay; 