// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FALLBACK_JOBS = [
  {
    id: "job-1",
    title: "Senior Full Stack Engineer",
    description: "Build cutting-edge AI recruitment workflows with Next.js, TypeScript, PostgreSQL, and LLM integrations.",
    location: "Remote, US",
    status: "ACTIVE",
    postedAt: new Date().toISOString(),
    company: { name: "Hirewise AI", logo: "/logos/google.png" },
  },
  {
    id: "job-2",
    title: "AI Research Engineer",
    description: "Design and implement custom machine learning pipelines for automated candidate scoring and resume parsing.",
    location: "San Francisco, CA",
    status: "ACTIVE",
    postedAt: new Date().toISOString(),
    company: { name: "NextGen AI", logo: "/logos/openai.png" },
  },
  {
    id: "job-3",
    title: "Product Designer (UI/UX)",
    description: "Lead design systems and user experience across candidate and employer portals with modern Tailwind interfaces.",
    location: "New York, NY",
    status: "ACTIVE",
    postedAt: new Date().toISOString(),
    company: { name: "Designify", logo: "/logos/spotify.png" },
  },
  {
    id: "job-4",
    title: "Cloud Infrastructure Architect",
    description: "Architect high-availability Kubernetes clusters, serverless functions, and global monitoring on AWS.",
    location: "Austin, TX",
    status: "ACTIVE",
    postedAt: new Date().toISOString(),
    company: { name: "CloudScale", logo: "/logos/amazon.png" },
  },
  {
    id: "job-5",
    title: "Data Science Lead",
    description: "Analyze recruitment benchmarks, compensation models, and algorithmic fairness across hiring systems.",
    location: "Seattle, WA",
    status: "ACTIVE",
    postedAt: new Date().toISOString(),
    company: { name: "DataPulse", logo: "/logos/microsoft.png" },
  },
];

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: { company: true, postedBy: true },
      orderBy: { postedAt: "desc" },
    });
    if (jobs && jobs.length > 0) {
      return NextResponse.json(jobs);
    }
    return NextResponse.json(FALLBACK_JOBS);
  } catch (error) {
    console.warn("Database error or not configured, returning fallback dummy jobs:", error);
    return NextResponse.json(FALLBACK_JOBS);
  }
}
