import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists with this email" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role: role || "USER" },
    });

    await createSession({ id: user.id, role: user.role });

    return NextResponse.json({ redirect: user.role === "ADMIN" ? "/admin/home" : "/user/home" });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 });
  }
}
