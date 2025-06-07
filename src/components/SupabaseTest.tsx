import React, { useState, useEffect } from 'react';
import { Button, TextInput, Stack, Text, Paper } from '@mantine/core';
import { saveEntry, getEntries } from '../../lib/db';

const SupabaseTest: React.FC = () => {
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<Record<string, { tag?: string; note?: string }>>({});
  const [status, setStatus] = useState<string>('');

  const handleSave = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const result = await saveEntry({ date: today, note });
      if (result.error) {
        setStatus(`Error: ${result.error.message}`);
      } else {
        setStatus('Saved successfully!');
        setNote('');
        loadEntries();
      }
    } catch (error) {
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const loadEntries = async () => {
    try {
      const data = await getEntries();
      setEntries(data);
      setStatus('Entries loaded successfully!');
      console.log(data);
    } catch (error) {
      setStatus(`Error loading entries: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <Stack>
      <Paper p="md" withBorder>
        <TextInput
          label="Test Note"
          placeholder="Enter a test note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          mb="md"
        />
        <Button onClick={handleSave}>Save Test Entry</Button>
      </Paper>

      <Paper p="md" withBorder>
        <Text fw={500} mb="md">Current Entries:</Text>
        {Object.entries(entries).map(([date, data]) => (
          <Text key={date}>
            {date}: {data.note || 'No note'}
          </Text>
        ))}
      </Paper>

      {status && (
        <Paper p="md" bg={status.includes('Error') ? 'red.1' : 'green.1'}>
          <Text c={status.includes('Error') ? 'red.9' : 'green.9'}>
            {status}
          </Text>
        </Paper>
      )}
    </Stack>
  );
};

export default SupabaseTest; 