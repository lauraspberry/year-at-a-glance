import { useEffect, useState } from 'react';
import { Paper, Stack, Text, Group, Badge, ScrollArea } from '@mantine/core';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/AuthContext';

interface Entry {
  id: string;
  date: string;
  note: string;
  tag: string | null;
  created_at: string;
}

export default function AllEntries() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) return;
      
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('entries')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false })
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
  }, [user]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    });
  };

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
        <Text c="dimmed">No entries yet</Text>
      </Paper>
    );
  }

  // Group entries by date
  const entriesByDate = entries.reduce((acc, entry) => {
    const date = entry.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, Entry[]>);

  return (
    <Paper p="md" withBorder>
      <Stack gap="md">
        <Text size="lg" fw={500}>All Entries</Text>
        <ScrollArea h={300}>
          <Stack gap="md">
            {Object.entries(entriesByDate).map(([date, dateEntries]) => (
              <Paper key={date} p="sm" withBorder>
                <Stack gap="xs">
                  <Text fw={500} size="sm">
                    {formatDate(date)}
                  </Text>
                  {dateEntries.map((entry) => (
                    <Paper key={entry.id} p="xs" withBorder>
                      <Stack gap="xs">
                        <Text size="sm">{entry.note}</Text>
                        {entry.tag && (
                          <Group>
                            <Badge size="sm">{entry.tag}</Badge>
                          </Group>
                        )}
                        <Text size="xs" c="dimmed">
                          Added {formatDateTime(entry.created_at)}
                        </Text>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </Paper>
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
    </Paper>
  );
} 