"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, LogOut, Plus, Trash2, Edit } from "lucide-react";

interface Job {
  id: string;
  title: string;
  description: string;
  status: "ACTIVE" | "CLOSED" | "DRAFT";
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"createJob" | "manageJobs">("createJob");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const admin = { id: "ADM001", name: "Admin User" };

  // Fetch jobs from admin API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  // Create job
  const handleCreateJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);

    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;

    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Failed to create job");

      await fetchJobs();
      form.reset();
      setActiveTab("manageJobs");
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  // Delete job
  const handleDeleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");

      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Edit job
  const handleEditJob = (job: Job) => {
    const title = prompt("Edit job title", job.title);
    const description = prompt("Edit job description", job.description);

    if (!title || !description) return;

    fetch(`/api/admin/jobs/${job.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update job");
        fetchJobs();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex min-h-screen  mt-12 bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{admin.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">ID: {admin.id}</p>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("createJob")}
            className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
              activeTab === "createJob" ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
            }`}
          >
            <Plus size={18} /> Create Job
          </button>

          <button
            onClick={() => setActiveTab("manageJobs")}
            className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
              activeTab === "manageJobs" ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
            }`}
          >
            <Briefcase size={18} /> Manage Jobs
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 mt-auto px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Create Job Form */}
        {activeTab === "createJob" && (
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Create a Job</h1>
            <form className="flex flex-col gap-4" onSubmit={handleCreateJob}>
              <input
                name="title"
                type="text"
                placeholder="Job Title"
                required
                className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none"
              />
              <textarea
                name="description"
                placeholder="Job Description"
                required
                className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={formLoading}
                className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
                  formLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {formLoading ? "Posting..." : "Post Job"}
              </button>
            </form>
          </div>
        )}

        {/* Manage Jobs List */}
        {activeTab === "manageJobs" && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Posted Jobs</h1>
            {loading ? (
              <p className="text-gray-600 dark:text-gray-300">Loading...</p>
            ) : jobs.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">No jobs posted yet.</p>
            ) : (
              <ul className="flex flex-col gap-4">
                {jobs.map((job) => (
                  <li
                    key={job.id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center"
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{job.title}</h2>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{job.description}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                        Posted: {new Date(job.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                      title="Edit Job"
                        onClick={() => handleEditJob(job)}
                        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        title="Delete Job"
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 rounded hover:bg-red-200 dark:hover:bg-red-700 transition"
                      >
                        <Trash2 size={18} className="text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
