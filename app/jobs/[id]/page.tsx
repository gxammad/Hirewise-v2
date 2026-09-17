"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Building, MapPin, Calendar, Briefcase } from "lucide-react";

interface Job {
  id: string;
  title: string;
  description: string;
  location?: string;
  status: string;
  postedAt?: string;
  company?: { name: string };
}

export default function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Job not found");
        return res.json();
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load job details");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Job Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">The job you are looking for does not exist or has been removed.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 text-blue-600 dark:text-blue-400 hover:underline"
      >
        <ArrowLeft size={16} /> Back to Jobs
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              {job.company?.name && (
                <span className="flex items-center gap-1">
                  <Building size={16} /> {job.company.name}
                </span>
              )}
              {job.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {job.location}
                </span>
              )}
              {job.postedAt && (
                <span className="flex items-center gap-1">
                  <Calendar size={16} /> Posted {new Date(job.postedAt).toLocaleDateString()}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Briefcase size={16} /> Status: {job.status}
              </span>
            </div>
          </div>

          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-center font-medium shadow"
          >
            Apply Now
          </Link>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">About the Role</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
            {job.description}
          </p>
        </div>
      </div>
    </div>
  );
}
