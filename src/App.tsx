import { MantineProvider, Title, Container, Grid, Stack, Group, Button, Text } from '@mantine/core';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import YearGrid from "./components/YearGrid";
import SupabaseTest from "./components/SupabaseTest";
import EntryList from "./components/EntryList";
import AllEntries from "./components/AllEntries";
import EntryDatesProvider from "./components/EntryDatesProvider";
import '@mantine/core/styles.css';
import { AuthProvider, useAuth } from '../lib/AuthContext'
import Auth from './components/Auth'
import AuthCallback from './components/AuthCallback'
import { signOut } from '../lib/auth'

function AppContent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { user } = useAuth();

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
              <SupabaseTest selectedDate={selectedDate} />
              <EntryList selectedDate={selectedDate} />
              <AllEntries />
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 9 }}>
            <EntryDatesProvider>
              {(datesWithEntries) => (
                <YearGrid 
                  onDateSelect={setSelectedDate} 
                  selectedDate={selectedDate}
                  datesWithEntries={datesWithEntries}
                />
              )}
            </EntryDatesProvider>
          </Grid.Col>
        </Grid>
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
            <Route path="*" element={<AppContent />} />
          </Routes>
        </MantineProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
