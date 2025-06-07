import { useState } from 'react';
import { Button, TextInput, Stack, Text, Paper } from '@mantine/core';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/AuthContext';

export default function SupabaseTest() {
  const [note, setNote] = useState('');
  const [tag, setTag] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await supabase
        .from('entries')
        .insert([
          {
            user_id: user?.id,
            date: date,
            note: note,
            tag: tag
          }
        ])
        .select()

      if (error) throw error;

      setSuccess('Entry saved successfully!');
      setNote('');
      setTag('');
      setDate('');
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
          <Text size="lg" fw={500}>Add New Entry</Text>
          
          <TextInput
            label="Date"
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
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
            placeholder="Enter a tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />

          {error && (
            <Text c="red" size="sm">
              Error: {error}
            </Text>
          )}

          {success && (
            <Text c="green" size="sm">
              {success}
            </Text>
          )}

          <Button type="submit" loading={loading}>
            Save Entry
          </Button>
        </Stack>
      </form>
    </Paper>
  );
} 