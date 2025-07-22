import React from 'react';
import { useGoogleAuth } from '../lib/GoogleAuthContext';
import { Paper, Stack, Text, Button } from '@mantine/core';

const HomePage: React.FC = () => {
  const { isGoogleSignedIn, googleEvents, loginWithGoogle, googleError } = useGoogleAuth();

  return (
    <Paper p="md" withBorder>
      <Stack gap="md">
        <Text size="xl" fw={700}>Google Calendar Events</Text>
        {!isGoogleSignedIn ? (
          <>
            <Text>You are not signed in with Google.</Text>
            <Button onClick={loginWithGoogle} color="blue" variant="outline">
              Sign in with Google
            </Button>
            {googleError && <Text color="red">{googleError}</Text>}
          </>
        ) : (
          <>
            {googleEvents.length === 0 ? (
              <Text>No upcoming events found.</Text>
            ) : (
              <Stack>
                {googleEvents.map(event => (
                  <Paper key={event.id} p="sm" withBorder>
                    <Text fw={500}>{event.summary || '(No Title)'}</Text>
                    <Text size="sm" c="dimmed">
                      {event.start?.dateTime || event.start?.date}
                    </Text>
                  </Paper>
                ))}
              </Stack>
            )}
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default HomePage; 