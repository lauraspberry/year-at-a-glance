import React, { useState, useEffect } from 'react'
import { TextInput, PasswordInput, Button, Stack, Text, Group, Paper } from '@mantine/core'
import { signIn, signUp, signOut } from '../../lib/auth'
import { useAuth } from '../../lib/AuthContext'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { data, error } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password)

      if (error) {
        console.error('Auth error:', error)
        throw error
      }

      // If signup was successful, automatically sign in
      if (isSignUp && data?.user) {
        const { error: signInError } = await signIn(email, password)
        if (signInError) throw signInError
      }
    } catch (err) {
      console.error('Full error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      const { error } = await signOut()
      if (error) throw error
    } catch (err) {
      console.error('Sign out error:', err)
      setError(err instanceof Error ? err.message : 'Error signing out')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/',
        },
      });
    } catch {
      setError('Google sign-in failed');
    }
  };

  if (user) {
    return (
      <Paper p="md" withBorder>
        <Stack align="center" gap="md">
          <Text size="lg" fw={500}>Welcome, {user.email}</Text>
          <Text size="sm" c="dimmed">User ID: {user.id}</Text>
          <Button onClick={handleSignOut} variant="light" color="red">
            Sign Out
          </Button>
        </Stack>
      </Paper>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Text color="red" size="sm">
            Error: {error}
          </Text>
        )}
        <Group justify="space-between">
          <Button type="submit" loading={loading}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button variant="subtle" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Button>
        </Group>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={handleGoogleSignIn} color="blue" variant="outline">
            Sign in with Google
          </Button>
        </div>
      </Stack>
    </form>
  )
}

export default Auth 