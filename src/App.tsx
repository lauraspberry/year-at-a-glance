import { MantineProvider, Title, Container } from '@mantine/core';
import YearGrid from "./components/YearGrid";
import '@mantine/core/styles.css';

export default function App() {
  return (
    <MantineProvider>
      <Container size="lg" py="md">
        <Title order={1} mb="md">Year at a Glance – 2025</Title>
        <YearGrid />
      </Container>
    </MantineProvider>
  );
}
