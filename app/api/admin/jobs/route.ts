import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const FALLBACK_ADMIN_JOBS = [
  {
    id: "admin-job-1",
    title: "Senior Full Stack Engineer",
    description: "Build cutting-edge AI recruitment workflows with Next.js, TypeScript, and modern APIs.",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
  {
    id: "admin-job-2",
    title: "AI Research Engineer",
    description: "Design and implement custom machine learning pipelines for automated candidate scoring.",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
  {
    id: "admin-job-3",
    title: "Product Designer (UI/UX)",
    description: "Lead design systems and user experience across candidate and employer portals.",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const jobs = await prisma.job.findMany({ where: { postedById: session.id } });
    if (jobs && jobs.length > 0) {
      return NextResponse.json(jobs);
    }
    return NextResponse.json(FALLBACK_ADMIN_JOBS);
  } catch (err) {
    console.warn("DB not connected, returning demo admin jobs:", err);
    return NextResponse.json(FALLBACK_ADMIN_JOBS);
  }
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description } = await req.json();

  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        postedById: session.id,
      },
    });
    return NextResponse.json(job);
  } catch (err) {
    console.warn("DB error on create job, returning mock job:", err);
    return NextResponse.json({
      id: "job-" + Date.now(),
      title,
      description,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    });
  }
}
