"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface Job {
  id: string;
  title: string;
  description: string;
  location?: string;
  status: "ACTIVE" | "CLOSED" | "DRAFT";
}

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<Job["status"]>("ACTIVE");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${jobId}`);
        if (!res.ok) throw new Error("Failed to fetch job");
        const data: Job = await res.json();
        setJob(data);
        setTitle(data.title);
        setDescription(data.description);
        setLocation(data.location || "");
        setStatus(data.status);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, location, status }),
      });
      if (!res.ok) throw new Error("Failed to update job");
      router.push("/admin/home"); // Navigate back to dashboard
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!job) return <p className="p-6 text-center">Loading job...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border rounded"
          required
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 border rounded"
          rows={5}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-3 border rounded"
        />
        <select
            title="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Job["status"])}
          className="p-3 border rounded"
        >
          <option value="ACTIVE">Active</option>
          <option value="CLOSED">Closed</option>
          <option value="DRAFT">Draft</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Job"}
        </button>
      </form>
    </div>
  );
}
