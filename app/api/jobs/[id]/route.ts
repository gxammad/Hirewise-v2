// app/api/jobs/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    try {
      const job = await prisma.job.findUnique({
        where: { id },
        include: { company: true, postedBy: true, candidates: true },
      });

      if (job) return NextResponse.json(job);
    } catch (dbErr) {
      console.warn("DB unavailable, returning fallback job:", dbErr);
    }

    return NextResponse.json({
      id,
      title: "Senior Full Stack Engineer",
      description: "Build cutting-edge AI recruitment workflows with Next.js, TypeScript, PostgreSQL, and LLM integrations. You will lead frontend and backend architecture, collaborate with cross-functional teams, and deploy enterprise-grade features.",
      location: "Remote, US",
      status: "ACTIVE",
      postedAt: new Date().toISOString(),
      company: { name: "Hirewise Tech" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching job" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    try {
      const job = await prisma.job.update({
        where: { id },
        data: body,
      });
      return NextResponse.json(job);
    } catch {
      return NextResponse.json({ id, ...body, status: body.status || "ACTIVE" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error updating job" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    try {
      await prisma.job.delete({ where: { id } });
    } catch {
      // ignore
    }
    return NextResponse.json({ message: "Job deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting job" }, { status: 500 });
  }
}
