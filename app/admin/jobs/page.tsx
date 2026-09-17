"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit2, Plus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Job {
  id: string;
  title: string;
  description: string;
  status: "ACTIVE" | "CLOSED" | "DRAFT";
  postedAt?: string;
  createdAt?: string;
}

export default function AdminJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch jobs from API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : data.jobs || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDeleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");
      setJobs((prev) => prev.filter((job) => job.id !== id));
      toast.success("Job deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job");
    }
  };

  const handleEditJob = (id: string) => {
    router.push(`/admin/jobs/${id}/edit`);
  };

  const handleAddJob = () => {
    router.push("/admin/jobs/create");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto mt-16">
      <ToastContainer position="top-right" autoClose={2000} theme="light" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Jobs</h1>
        <button
          onClick={handleAddJob}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          title="Add Job"
          aria-label="Add Job"
        >
          <Plus size={18} /> Add Job
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No jobs found. Create your first job!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{job.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm">{job.description}</p>
              </div>
              <div>
                <p className="text-sm mb-4">
                  Status:{" "}
                  <span className={`font-medium ${job.status === "ACTIVE" ? "text-green-600" : "text-red-600"}`}>
                    {job.status}
                  </span>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditJob(job.id)}
                    title="Edit Job"
                    aria-label="Edit Job"
                    className="p-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-200"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    title="Delete Job"
                    aria-label="Delete Job"
                    className="p-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
