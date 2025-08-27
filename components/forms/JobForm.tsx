// components/forms/JobForm.tsx
"use client";

import { useState } from "react";

export default function JobForm({ recruiterId }: { recruiterId: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/jobs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, postedById: recruiterId }),
    });

    setLoading(false);

    if (res.ok) {
      setTitle("");
      setDescription("");
      alert("Job created successfully!");
    } else {
      alert("Error creating job.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="block font-medium">Job Title</label>
        <input
          title="Job Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          title="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Job"}
      </button>
    </form>
  );
}
