import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, role },
  });

  await createSession({ id: user.id, role: user.role });

  return NextResponse.json({ redirect: role === "ADMIN" ? "/admin/home" : "/user/home" });
}
