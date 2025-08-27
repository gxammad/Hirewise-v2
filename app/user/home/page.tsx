"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, MapPin, Building, LogOut, Heart, X } from "lucide-react";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  company: { name: string; logo?: string };
  postedAt: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const JOBS_PER_PAGE = 6;

  // Fetch jobs with pagination
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data || []);
      setHasMore(data.length > JOBS_PER_PAGE);
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

  // Toggle saved job
  const toggleSaveJob = (id: string) => {
    setSavedJobs((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  // Filtered jobs
  const filteredJobs = jobs
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase()))
    )
    .slice(0, page * JOBS_PER_PAGE);

  // Load more jobs
  const loadMore = () => {
    if ((page + 1) * JOBS_PER_PAGE >= jobs.length) setHasMore(false);
    setPage(page + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 mt-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome, Job Seeker!</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none"
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="flex-1 p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none"
        />
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between p-6 cursor-pointer"
              onClick={() => setSelectedJob(job)}
            >
              <div className="flex items-center gap-3 mb-3">
                
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{job.title}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">{job.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <div className="flex gap-2 text-gray-500 dark:text-gray-400 text-xs items-center">
                  <Building size={14} /> 
                  <MapPin size={14} /> {job.location || "N/A"}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveJob(job.id);
                  }}
                  className={`p-2 rounded transition ${
                    savedJobs.has(job.id)
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                  title={savedJobs.has(job.id) ? "Unsave Job" : "Save Job"}
                >
                  <Heart size={16} />
                </button>
              </div>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                Posted: {new Date(job.postedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && filteredJobs.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 relative">
            <button
            title="Close"
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{selectedJob.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedJob.description}</p>
            <div className="flex gap-4 text-gray-500 dark:text-gray-400 text-sm mb-4">
              <span className="flex items-center gap-1">
                <Building size={14} /> {selectedJob.company.name}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {selectedJob.location || "N/A"}
              </span>
              <span>Posted: {new Date(selectedJob.postedAt).toLocaleDateString()}</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Apply Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
