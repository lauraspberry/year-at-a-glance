import { MantineProvider, Title, Container, Grid, Stack } from '@mantine/core';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import YearGrid from "./components/YearGrid";
import SelectedDateDisplay from "./components/SelectedDateDisplay";
import SupabaseTest from "./components/SupabaseTest";
import '@mantine/core/styles.css';
import { AuthProvider, useAuth } from '../lib/AuthContext'
import Auth from './components/Auth'
import AuthCallback from './components/AuthCallback'

function AppContent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { user } = useAuth();

  if (!user) {
    return <Auth />;
  }

  return (
    <Container size="xl" py="xl" style={{ minWidth: '100%' }}>
      <Grid>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Stack>
            <Title order={1} mb="xl">Year at a Glance – 2025</Title>
            <SelectedDateDisplay selectedDate={selectedDate} />
            <SupabaseTest />
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 9 }}>
          <YearGrid onDateSelect={setSelectedDate} selectedDate={selectedDate} />
        </Grid.Col>
      </Grid>
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
