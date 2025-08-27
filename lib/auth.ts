// lib/auth.ts
import { cookies } from "next/headers";

const COOKIE_NAME = "session";

export async function createSession(data: { id: string; role: string }) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: JSON.stringify(data),
    path: "/",          // accessible on all routes
    httpOnly: true,     // not accessible from JS in browser
    sameSite: "lax",    // basic CSRF protection
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME)?.value;

  if (!cookie) return null;

  try {
    return JSON.parse(cookie);
  } catch {
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  // Note: pass a single object with name + path
  cookieStore.delete({
    name: COOKIE_NAME,
    path: "/", // same path as cookie
  });
}
