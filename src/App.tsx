import { MantineProvider, Title, Container, Grid, Stack } from '@mantine/core';
import { useState } from 'react';
import YearGrid from "./components/YearGrid";
import SelectedDateDisplay from "./components/SelectedDateDisplay";
import '@mantine/core/styles.css';

export default function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <MantineProvider>
      <Container size="xl" py="xl" style={{ minWidth: '100%' }}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Stack>
              <Title order={1} mb="xl">Year at a Glance – 2025</Title>
              <SelectedDateDisplay selectedDate={selectedDate} />
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 9 }}>
            <YearGrid onDateSelect={setSelectedDate} />
          </Grid.Col>
        </Grid>
      </Container>
    </MantineProvider>
  );
}
