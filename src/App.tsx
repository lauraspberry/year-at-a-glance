import { MantineProvider, Title, Container, Grid, Stack, Group, Button, Text, Modal, Paper } from '@mantine/core';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import YearGrid from "./components/YearGrid";
import EntryList from "./components/EntryList";
import AllEntries from "./components/AllEntries";
import EntryDatesProvider from "./components/EntryDatesProvider";
import '@mantine/core/styles.css';
import { AuthProvider, useAuth } from '../lib/AuthContext'
import Auth from './components/Auth'
import AuthCallback from './components/AuthCallback'
import { signOut } from '../lib/auth'
import EntryForm from "./components/EntryForm";
import React from 'react';
import axios from 'axios';
import { supabase } from '../lib/supabase';

type GoogleCalendarEvent = {
  id: string;
  summary?: string;
  start?: { dateTime?: string; date?: string };
};

function useGoogleCalendarEvents() {
  const [events, setEvents] = useState<GoogleCalendarEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase.auth.getSession();
      const accessToken = data.session?.provider_token;
      if (!accessToken) return;

      try {
        const res = await axios.get(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: {
              maxResults: 10,
              orderBy: 'startTime',
              singleEvents: true,
              timeMin: new Date().toISOString(),
            },
          }
        );
        setEvents(res.data.items);
      } catch {
        setError('Failed to fetch events');
      }
    };
    fetchEvents();
  }, []);

  return { events, error };
}

function AppContent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const { events: googleEvents, error: googleEventsError } = useGoogleCalendarEvents();

  // Open modal when selectedDate is set and modalOpen is true
  React.useEffect(() => {
    if (!selectedDate) {
      setModalOpen(false);
    }
  }, [selectedDate]);

  if (!user) {
    return <Auth />;
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error('Sign out error:', err)
    }
  }

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  // Custom onDateSelect: open modal only if clicking already selected date
  const handleDateSelect = (date: Date) => {
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      setModalOpen(true);
    } else {
      setSelectedDate(date);
    }
  };

  return (
    <Container size="xl" py="xl" style={{ minWidth: '100%' }}>
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Title order={1}>Year at a Glance – 2025</Title>
          <Group gap="md">
            <Text size="sm" c="dimmed">{user.email}</Text>
            <Button variant="light" color="red" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Group>
        </Group>
        <Grid>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Stack>
              <EntryList selectedDate={selectedDate} />
              <AllEntries />
              <Paper p="md" withBorder>
                <Text fw={500} mb="sm">Google Calendar Events</Text>
                {googleEventsError && <Text color="red">{googleEventsError}</Text>}
                {googleEvents.length === 0 ? (
                  <Text size="sm" c="dimmed">No upcoming events</Text>
                ) : (
                  <Stack gap="xs">
                    {googleEvents.map(event => (
                      <Paper key={event.id} p="xs" withBorder>
                        <Text size="sm">{event.summary || '(No Title)'}</Text>
                        <Text size="xs" c="dimmed">{event.start?.dateTime || event.start?.date}</Text>
                      </Paper>
                    ))}
                  </Stack>
                )}
              </Paper>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 9 }}>
            <EntryDatesProvider>
              {(datesWithEntries) => (
                <YearGrid 
                  onDateSelect={handleDateSelect} 
                  selectedDate={selectedDate}
                  datesWithEntries={datesWithEntries}
                />
              )}
            </EntryDatesProvider>
          </Grid.Col>
        </Grid>
        <Modal opened={modalOpen} onClose={handleModalClose} title={selectedDate ? `Add Entry for ${selectedDate.toLocaleDateString()}` : ''}>
          <EntryForm selectedDate={selectedDate} onSuccess={handleModalClose} />
        </Modal>
      </Stack>
    </Container>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MantineProvider>
          <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />
            {/* <Route path="/home" element={<HomePage />} /> */}
            <Route path="*" element={<AppContent />} />
          </Routes>
        </MantineProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
