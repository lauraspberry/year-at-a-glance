import React, { createContext, useContext, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

type GoogleEvent = {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
};

type GoogleAuthContextType = {
  isGoogleSignedIn: boolean;
  googleEvents: GoogleEvent[];
  googleError: string | null;
  loginWithGoogle: () => void;
};

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);

export const GoogleAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [googleEvents, setGoogleEvents] = useState<GoogleEvent[]>([]);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    flow: 'implicit',
    onSuccess: async (tokenResponse) => {
      setIsGoogleSignedIn(true);
      try {
        const res = await axios.get(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
            params: {
              maxResults: 100,
              orderBy: 'startTime',
              singleEvents: true,
              timeMin: new Date().toISOString(),
            },
          }
        );
        setGoogleEvents(res.data.items);
        setGoogleError(null);
      } catch {
        setGoogleError('Failed to fetch events');
      }
    },
    onError: () => setGoogleError('Google Login Failed'),
  });

  return (
    <GoogleAuthContext.Provider
      value={{
        isGoogleSignedIn,
        googleEvents,
        googleError,
        loginWithGoogle: login,
      }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => {
  const ctx = useContext(GoogleAuthContext);
  if (!ctx) throw new Error('useGoogleAuth must be used within GoogleAuthProvider');
  return ctx;
}; 