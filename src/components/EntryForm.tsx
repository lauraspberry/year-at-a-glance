import { useState } from 'react';
import { Paper, TextInput, Button, Stack, Text } from '@mantine/core';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/AuthContext';

interface EntryFormProps {
  selectedDate: Date | null;
  onSuccess?: () => void;
}

export default function EntryForm({ selectedDate, onSuccess }: EntryFormProps) {
  const [note, setNote] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedDate) return;

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('entries')
        .insert([
          {
            user_id: user.id,
            date: selectedDate.toISOString().split('T')[0],
            note,
            tag: tag || null,
          },
        ]);

      if (error) throw error;
      setNote('');
      setTag('');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error saving entry:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper p="md" withBorder>
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Text size="lg" fw={500}>Add Entry</Text>
          
          <TextInput
            label="Date"
            value={selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
            disabled
          />

          <TextInput
            label="Note"
            placeholder="Enter your note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          />

          <TextInput
            label="Tag"
            placeholder="Optional tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />

          {error && (
            <Text c="red" size="sm">
              {error}
            </Text>
          )}

          <Button 
            type="submit" 
            loading={loading}
            disabled={!selectedDate || !note.trim()}
          >
            Save Entry
          </Button>
        </Stack>
      </form>
    </Paper>
  );
} 