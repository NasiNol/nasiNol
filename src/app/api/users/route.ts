import { PrismaClient } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";


export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true },
  });
  return Response.json(users);
}
