import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const jobs = await prisma.job.findMany({ where: { postedById: session.id } });
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description } = await req.json();
  const job = await prisma.job.create({
    data: {
      title,
      description,
      postedById: session.id,
    },
  });

  return NextResponse.json(job);
}
