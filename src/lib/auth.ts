// src/lib/auth.ts - COMPLETE FIXED VERSION
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  
  // Email & Password configuration
  emailAndPassword: { 
    enabled: true,
    autoSignIn: true, // Auto sign in after signup
  },
  
  // Social providers (optional)
  socialProviders: { 
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID)
    }, 
  },
  
  // Session configuration - IMPORTANT!
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every 1 day
  },
  
  // Base URL - CRITICAL for cookie setting
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  
  // Trusted origins for CORS
  trustedOrigins: [
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_APP_URL || ""
  ],
  
  // Secret for signing tokens - REQUIRED
  secret: process.env.BETTER_AUTH_SECRET || "default-secret-please-change-in-production-min-32-chars",
  
  // Advanced cookie settings
  advanced: {
    cookiePrefix: "better-auth",
    generateId: () => crypto.randomUUID(),
  }
});

// Export types for TypeScript
export type Auth = typeof auth;