"use client"
import { authClient } from '@/lib/auth-client';
import React from 'react'

export default function page() {
    const handleSignup = async() => {
        const { data, error } = await authClient.signUp.email({
        name: "John Doe", // required
        email: "john.doe@example.com", // required
        password: "password1234", // required
        callbackURL: "http://localhost:3000",
});
    }
  return (
    <div>
        <button onClick={handleSignup}>signup</button>
    </div>
  )
}
