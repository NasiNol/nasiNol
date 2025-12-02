// src/app/api/auth/[...all]/route.ts - WORKING VERSION
import { auth } from "@/lib/auth"
import type { NextRequest } from "next/server"

// Better Auth handler untuk Next.js App Router
async function handler(req: NextRequest) {
  return auth.handler(req)
}

export { handler as GET, handler as POST }