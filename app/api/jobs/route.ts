// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: { company: true, postedBy: true },
      orderBy: { postedAt: "desc" },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
