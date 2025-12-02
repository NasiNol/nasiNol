import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers
  });

  return Response.json(session ?? {});
}
