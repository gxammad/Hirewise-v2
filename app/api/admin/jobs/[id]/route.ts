import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const job = await prisma.job.findFirst({
    where: { id: params.id, postedById: session.id },
  });

  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  return NextResponse.json(job);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description, status } = await req.json();

  const job = await prisma.job.updateMany({
    where: { id: params.id, postedById: session.id },
    data: { title, description, status },
  });

  return NextResponse.json(job);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.job.deleteMany({ where: { id: params.id, postedById: session.id } });

  return NextResponse.json({ success: true });
}
