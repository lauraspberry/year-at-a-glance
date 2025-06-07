import React, { useState } from 'react'
import { TextInput, PasswordInput, Button, Stack, Text, Group } from '@mantine/core'
import { signIn, signUp, signOut } from '../../lib/auth'
import { useAuth } from '../../lib/AuthContext'

const Auth: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      const { data, error } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password)

      if (error) {
        console.error('Auth error:', error)
        throw error
      }

      if (isSignUp && data?.user && !data.session) {
        setMessage('Please check your email for a confirmation link to complete your registration.')
        setEmail('')
        setPassword('')
        setIsSignUp(false)
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

  if (user) {
    return (
      <Stack align="center" gap="md">
        <Text>Welcome, {user.email}</Text>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </Stack>
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
        {message && (
          <Text color="green" size="sm">
            {message}
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
      </Stack>
    </form>
  )
}

export default Auth 