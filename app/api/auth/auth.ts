import { getSession } from "@auth0/nextjs-auth0/edge";
import { redirect } from "next/navigation";

export async function authRequired() {
  try {
    const session = await getSession();
    if (!session) throw new Error("No session");
    return session;
  } catch {
    redirect("/api/auth/login");
  }
}

interface User {
  nickname: string; // "DominicFournier",
  name: string; // "Dominic",
  picture: string; // "https://avatars.githubusercontent.com/u/36671850?v=4",
  updated_at: string; // "2025-01-03T04:12:41.827Z",
  email: string; // "dominic@scintillar.com",
  email_verified: boolean; // true,
  sub: string; // "github|012345",
  sid: string; // "SID"
}

export async function getUser() {
  const session = await authRequired();
  return session.user as User;
}
