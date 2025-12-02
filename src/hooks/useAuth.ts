// src/hooks/useAuth.ts
"use client"

import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth-client'

export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession()
        if (session?.data?.user) {
          setUser({
            id: session.data.user.id,
            name: session.data.user.name || '',
            email: session.data.user.email || '',
            image: session.data.user.image || undefined
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const logout = async () => {
    try {
      await authClient.signOut()
      setUser(null)
      // Redirect to homepage after logout
      window.location.href = '/homepage'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout
  }
}