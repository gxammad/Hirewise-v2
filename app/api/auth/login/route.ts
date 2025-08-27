import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  // create session cookie
  await createSession({ id: user.id, role: user.role });

  return NextResponse.json({
    redirect: user.role === "ADMIN" ? "/admin/home" : "/user/home",
  });
}
