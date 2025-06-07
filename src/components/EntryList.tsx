import { useEffect, useState } from 'react';
import { Paper, Stack, Text, Group, Badge } from '@mantine/core';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/AuthContext';

interface Entry {
  id: string;
  date: string;
  note: string;
  tag: string | null;
  created_at: string;
}

interface EntryListProps {
  selectedDate: Date | null;
}

export default function EntryList({ selectedDate }: EntryListProps) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEntries = async () => {
      if (!selectedDate || !user) return;
      
      setLoading(true);
      setError(null);

      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const { data, error } = await supabase
          .from('entries')
          .select('*')
          .eq('user_id', user.id)
          .eq('date', dateStr)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setEntries(data || []);
      } catch (err) {
        console.error('Error fetching entries:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [selectedDate, user]);

  if (!selectedDate) {
    return (
      <Paper p="md" withBorder>
        <Text c="dimmed">Select a date to view entries</Text>
      </Paper>
    );
  }

  if (loading) {
    return (
      <Paper p="md" withBorder>
        <Text>Loading entries...</Text>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper p="md" withBorder>
        <Text c="red">Error: {error}</Text>
      </Paper>
    );
  }

  if (entries.length === 0) {
    return (
      <Paper p="md" withBorder>
        <Text c="dimmed">No entries for this date</Text>
      </Paper>
    );
  }

  return (
    <Paper p="md" withBorder>
      <Stack gap="md">
        <Text size="lg" fw={500}>Entries for {selectedDate.toLocaleDateString()}</Text>
        {entries.map((entry) => (
          <Paper key={entry.id} p="sm" withBorder>
            <Stack gap="xs">
              <Text>{entry.note}</Text>
              {entry.tag && (
                <Group>
                  <Badge>{entry.tag}</Badge>
                </Group>
              )}
              <Text size="xs" c="dimmed">
                Added {new Date(entry.created_at).toLocaleString()}
              </Text>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
} 