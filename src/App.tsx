import { MantineProvider, Title, Container, Grid, Stack, Group, Button, Text, Modal } from '@mantine/core';
import { useState } from 'react';
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

function AppContent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  // Open modal when selectedDate is set
  React.useEffect(() => {
    setModalOpen(!!selectedDate);
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
        <Modal opened={modalOpen} onClose={handleModalClose} title={selectedDate ? `Add Entry for ${selectedDate.toLocaleDateString()}` : ''}>
          <EntryForm selectedDate={selectedDate} />
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
            <Route path="*" element={<AppContent />} />
          </Routes>
        </MantineProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
