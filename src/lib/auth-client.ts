// src/lib/auth-client.ts - FIXED VERSION
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  // IMPORTANT: Pastikan credentials included
  fetchOptions: {
    credentials: "include"
  }
})

// Export individual methods dari authClient
export const { 
  signIn, 
  signUp, 
  signOut,
  useSession 
} = authClient