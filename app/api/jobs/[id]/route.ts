// app/api/jobs/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: { company: true, postedBy: true, candidates: true },
    });

    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

    return NextResponse.json(job);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching job" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const body = await req.json();
    const job = await prisma.job.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(job);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error updating job" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await prisma.job.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Job deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting job" }, { status: 500 });
  }
}
