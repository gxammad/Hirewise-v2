"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  Clock,
  Tag,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";

const jobs = [
  {
    id: 1,
    logo: "/logos/google.png",
    company: "Google",
    posted: "14 hours ago",
    title: "Software Engineer",
    location: "Columbus, OH",
    type: "Full-time",
    remote: "Onsite",
    seniority: "Mid Level",
    salary: "$107K/yr - $178K/yr",
    exp: "3+ years exp",
    tags: ["Cloud", "Information Technology", "Engineering"],
    h1b: true,
    description:
      "Google’s Cloud team is seeking an experienced Software Engineer to build next-gen cloud solutions while working with a collaborative global team. You will design, implement, and optimize cloud-based systems that handle massive scale and demand reliability. This role involves building microservices, improving distributed computing performance, and ensuring security compliance for millions of global users.",
    role: "Design, build, and optimize scalable cloud infrastructure solutions while working closely with cross-functional teams to deliver enterprise-grade cloud services.",
    lookingFor:
      "Problem solver with solid programming experience in Go/Java/Python, strong understanding of cloud platforms, and a mindset for innovation.",
    eligibility: "Bachelor’s in Computer Science or related field. Master’s preferred.",
    link: "/login",
  },
  {
    id: 2,
    logo: "/logos/microsoft.png",
    company: "Microsoft",
    posted: "2 days ago",
    title: "AI Engineer",
    location: "Redmond, WA",
    type: "Internship",
    remote: "Onsite",
    seniority: "Entry Level",
    salary: "$80K/yr - $120K/yr",
    exp: "Fresher or 1+ year exp",
    tags: ["AI", "Research", "Machine Learning"],
    h1b: false,
    description:
      "Join Microsoft’s AI division to work on innovative AI-powered productivity tools and next-gen AI copilots. You will collaborate with world-class researchers, engineers, and product teams to develop prototypes that push the boundaries of large-scale AI applications. Expect to work on NLP, multimodal models, and applied research projects that directly impact Office, Azure, and Bing.",
    role: "Collaborate with AI researchers to build ML prototypes, fine-tune large models, and test real-world applications in Microsoft products.",
    lookingFor:
      "Strong Python skills, familiarity with ML frameworks (PyTorch/TensorFlow), and a strong mathematical foundation in probability and statistics.",
    eligibility:
      "Currently enrolled in Computer Science, AI, or Data Science program. Prior research experience is a plus.",
    link: "/login",
  },
  {
    id: 3,
    logo: "/logos/netflix.png",
    company: "Netflix",
    posted: "5 days ago",
    title: "UI/UX Designer",
    location: "Los Angeles, CA",
    type: "Part-time",
    remote: "Hybrid",
    seniority: "Mid Level",
    salary: "$95K/yr - $150K/yr",
    exp: "2+ years exp",
    tags: ["Design", "User Experience", "Creative"],
    h1b: true,
    description:
      "Netflix is seeking a passionate UI/UX Designer to create intuitive, engaging, and beautiful digital experiences for our global streaming platform. Your designs will influence how millions of users around the world discover and consume content. You will work with product managers, developers, and creative directors to craft interfaces that are both visually stunning and functionally seamless.",
    role: "Lead the design of user-centered experiences, create prototypes, conduct usability testing, and collaborate with engineers for implementation.",
    lookingFor:
      "Strong portfolio showcasing design systems, proficiency in Figma/Sketch, and ability to communicate design decisions effectively.",
    eligibility: "Bachelor’s in Design, HCI, or related field. Strong portfolio required.",
    link: "/login",
  },
  {
    id: 4,
    logo: "/logos/tesla.png",
    company: "Tesla",
    posted: "1 day ago",
    title: "Data Scientist",
    location: "Palo Alto, CA",
    type: "Internship",
    remote: "Onsite",
    seniority: "Entry Level",
    salary: "$85K/yr - $115K/yr",
    exp: "1+ years exp",
    tags: ["Data Science", "Energy", "Sustainability"],
    h1b: false,
    description:
      "Tesla’s mission of sustainable energy relies on data-driven insights. We are seeking a Data Scientist to support energy analytics, predictive maintenance, and advanced modeling across our vehicle and energy products. You will work with real-world IoT and sensor data to optimize battery performance, charging infrastructure, and self-driving technologies.",
    role: "Develop machine learning models, create scalable data pipelines, and collaborate with engineers to turn insights into real-world solutions.",
    lookingFor:
      "Proficiency in Python, SQL, and ML tools. Strong statistical knowledge and a passion for sustainability and clean energy.",
    eligibility: "Pursuing or completed degree in Data Science, Statistics, or Engineering.",
    link: "/login",
  },
  {
    id: 5,
    logo: "/logos/spotify.png",
    company: "Spotify",
    posted: "3 days ago",
    title: "Product Manager",
    location: "New York, NY",
    type: "Full-time",
    remote: "Hybrid",
    seniority: "Senior Level",
    salary: "$120K/yr - $190K/yr",
    exp: "5+ years exp",
    tags: ["Music", "Product", "Innovation"],
    h1b: true,
    description:
      "Spotify is seeking a Product Manager to lead innovation on our personalized recommendation systems. You will be responsible for defining product strategy, leading cross-functional teams, and building features that make Spotify the most personalized audio platform in the world.",
    role: "Define product roadmap, analyze usage data, collaborate with engineers and designers, and launch new features globally.",
    lookingFor:
      "Strong product sense, data-driven decision-making, and experience in leading multi-disciplinary teams.",
    eligibility: "Bachelor’s in Business, Computer Science, or equivalent experience.",
    link: "/login",
  },
  {
    id: 6,
    logo: "/logos/x.png",
    company: "X (Twitter)",
    posted: "4 days ago",
    title: "Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: "Hybrid",
    seniority: "Mid Level",
    salary: "$100K/yr - $160K/yr",
    exp: "3+ years exp",
    tags: ["Frontend", "React", "Web Development"],
    h1b: true,
    description:
      "X is looking for a skilled Frontend Developer to help shape the future of social media. You will be working on building highly interactive user interfaces that scale to millions of users daily. Expect to work with modern technologies such as React, TypeScript, and GraphQL in a fast-paced, high-impact environment.",
    role: "Build responsive UI features, optimize performance, and collaborate with backend engineers and designers.",
    lookingFor:
      "Experience with React, TypeScript, REST/GraphQL APIs, and performance optimization.",
    eligibility: "Bachelor’s in Computer Science or equivalent experience.",
    link: "/login",
  },
  {
    id: 7,
    logo: "/logos/nike.gif",
    company: "Nike",
    posted: "6 hours ago",
    title: "Risk Analyst",
    location: "Beaverton, OR",
    type: "Full-time",
    remote: "Remote",
    seniority: "Mid Level",
    salary: "$95K/yr - $140K/yr",
    exp: "2+ years exp",
    tags: ["Finance", "Risk Management", "E-commerce"],
    h1b: false,
    description:
      "Nike is hiring a Risk Analyst to protect our global e-commerce and digital platforms from fraud and financial risks. You will analyze large volumes of transaction data, design monitoring systems, and work closely with security teams to maintain trust in Nike’s digital ecosystem.",
    role: "Develop fraud detection models, monitor suspicious activity, and implement risk mitigation strategies.",
    lookingFor:
      "Strong analytical skills, SQL/Python knowledge, and prior experience in risk analysis or fintech.",
    eligibility: "Bachelor’s in Finance, Economics, or related field.",
    link: "/login",
  },
  {
    id: 8,
    logo: "/logos/amazon.png",
    company: "Amazon",
    posted: "8 hours ago",
    title: "Cloud Engineer",
    location: "Seattle, WA",
    type: "Full-time",
    remote: "Onsite",
    seniority: "Mid Level",
    salary: "$110K/yr - $175K/yr",
    exp: "3+ years exp",
    tags: ["AWS", "Cloud", "Infrastructure"],
    h1b: true,
    description:
      "Amazon Web Services is seeking a Cloud Engineer to design and maintain scalable, secure, and resilient cloud systems. You will work on mission-critical services that impact millions of businesses worldwide. This role requires strong problem-solving skills, cloud infrastructure expertise, and a passion for building high-performance systems.",
    role: "Design and implement cloud architectures, manage deployments, and troubleshoot system issues.",
    lookingFor:
      "Experience with AWS, Docker/Kubernetes, CI/CD pipelines, and infrastructure automation.",
    eligibility: "Bachelor’s in Computer Science, Engineering, or equivalent experience.",
    link: "/login",
  },
  {
    id: 9,
    logo: "/logos/openai.png",
    company: "OpenAI",
    posted: "1 week ago",
    title: "DevOps Engineer",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: "Remote",
    seniority: "Mid-Senior Level",
    salary: "$125K/yr - $200K/yr",
    exp: "4+ years exp",
    tags: ["AI", "DevOps", "Infrastructure"],
    h1b: true,
    description:
      "OpenAI is hiring a DevOps Engineer to help scale infrastructure that powers cutting-edge AI research and deployments. You will ensure reliability, performance, and scalability of our distributed systems that support millions of users and large-scale model training workloads.",
    role: "Automate deployment pipelines, manage cloud infrastructure, and ensure system resilience.",
    lookingFor:
      "Strong background in cloud infrastructure, monitoring, Kubernetes, and security best practices.",
    eligibility: "Bachelor’s in Computer Science, Engineering, or equivalent experience.",
    link: "/login",
  },
  {
    id: 10,
    logo: "/logos/meta.png",
    company: "Meta",
    posted: "3 days ago",
    title: "Human Resources",
    location: "Menlo Park, CA",
    type: "Full-time",
    remote: "Onsite",
    seniority: "Mid Level",
    salary: "$90K/yr - $135K/yr",
    exp: "3+ years exp",
    tags: ["HR", "People Ops", "Recruitment"],
    h1b: false,
    description:
      "Meta is hiring a Human Resources Partner to support our rapidly growing global teams. You will play a crucial role in recruitment, employee engagement, and organizational development. This role requires strong interpersonal skills, a deep understanding of HR practices, and the ability to operate in a fast-paced environment.",
    role: "Partner with leadership on workforce planning, manage employee relations, and ensure compliance with HR policies.",
    lookingFor:
      "Experience in recruitment, employee engagement programs, and HRIS tools.",
    eligibility: "Bachelor’s degree in HR, Business Administration, or related field.",
    link: "/login",
  },
  {
    id: 11,
    logo: "/airbnb.svg",
    company: "Airbnb",
    posted: "12 hours ago",
    title: "Frontend Developer",
    location: "Remote, USA",
    type: "Full-time",
    remote: "Remote",
    seniority: "Mid Level",
    salary: "$100K/yr - $165K/yr",
    exp: "3+ years exp",
    tags: ["Frontend", "React", "Next.js"],
    h1b: true,
    description:
      "Airbnb is looking for a Frontend Developer to build scalable and high-performing web applications that power our global travel marketplace. You will work with modern frontend technologies to deliver features that delight users and enhance the booking experience.",
    role: "Develop and maintain Airbnb’s web platform, optimize performance, and collaborate with designers and backend engineers.",
    lookingFor:
      "Proficiency in JavaScript/TypeScript, React, Next.js, and strong attention to detail in UI development.",
    eligibility: "Bachelor’s in Computer Science or equivalent experience.",
    link: "/login",
  },
];

export default function JobsSection() {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

  return (
    <section className="py-20 px-6 relative bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12"
        >
          Current Job{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Openings
          </span>
        </motion.h2>

        {/* Glass Table */}
        <div className="overflow-hidden rounded-2xl shadow-lg backdrop-blur-xl bg-white/60 dark:bg-white/10 border border-gray-200 dark:border-white/20">
          <div className="max-h-[28rem] overflow-y-auto">
            <table className="w-full text-left text-gray-700 dark:text-white">
              <thead className="bg-gray-200 dark:bg-black  border-b border-gray-200 dark:border-white/10 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Position</th>
                  <th className="px-6 py-4 hidden md:table-cell">Type</th>
                  <th className="px-6 py-4 hidden md:table-cell">Posted</th>
                  <th className="px-6 py-4 hidden md:table-cell">Location</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <motion.tr
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-gray-200 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-white/5 transition cursor-pointer"
                  >
                    {/* Company */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      <Image
                        src={job.logo}
                        alt={job.company}
                        width={40}
                        height={40}
                        className="rounded-sm"
                      />
                      <span className="font-semibold">{job.company}</span>
                    </td>

                    {/* Position */}
                    <td className="px-6 py-4">{job.title}</td>

                    {/* Type */}
                    <td className="px-6 py-4 hidden md:table-cell">{job.type}</td>

                    {/* Posted Date */}
                    <td className="px-6 py-4 hidden md:table-cell">{job.posted}</td>

                    {/* Location */}
                    <td className="px-6 py-4 hidden md:table-cell">{job.location}</td>

                    {/* Buttons */}
                    <td className="px-6 py-4 text-right flex gap-3 justify-end">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="px-4 py-2 text-white rounded-xl bg-purple-500 hover:bg-purple-700 transition shadow-lg text-sm font-medium"
                      >
                        See Description
                      </button>
                      <a
                        href={job.link}
                        className="px-4 py-2 text-white rounded-xl bg-blue-500 hover:bg-blue-700 transition shadow-lg text-sm font-medium"
                      >
                        Apply Now
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Description */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-black/40 backdrop-blur-xl p-8 rounded-2xl max-w-3xl w-full shadow-xl relative max-h-[85vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={selectedJob.logo}
                alt={selectedJob.company}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {selectedJob.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedJob.company}
                </p>
              </div>
            </div>

            {/* Job Details */}
            <ul className="space-y-2 text-gray-700 dark:text-gray-200 mb-6">
              <li className="flex items-center gap-2">
                <Calendar size={18} /> Posted: {selectedJob.posted}
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} /> Location: {selectedJob.location}
              </li>
              <li className="flex items-center gap-2">
                <Briefcase size={18} /> Type: {selectedJob.type} ({selectedJob.remote})
              </li>
              <li className="flex items-center gap-2">
                <Clock size={18} /> Seniority: {selectedJob.seniority}
              </li>
              <li className="flex items-center gap-2">
                <GraduationCap size={18} /> Exp: {selectedJob.exp}
              </li>
              <li className="flex items-center gap-2">
                <DollarSign size={18} /> Salary: {selectedJob.salary}
              </li>
              <li className="flex items-center gap-2 flex-wrap">
                <Tag size={18} />{" "}
                {selectedJob.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-blue-500 text-blue-500 text-xs font-medium mr-2 mb-2 hover:bg-blue-500 hover:text-white transition"
                  >
                    {tag}
                  </span>
                ))}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={18} /> H1B Sponsorship:{" "}
                {selectedJob.h1b ? "Available" : "Not Available"}
              </li>
            </ul>

            {/* Long Sections */}
            <div className="space-y-6 text-gray-700 dark:text-gray-100">
              <section>
                <h4 className="text-lg font-semibold mb-2">About the Role</h4>
                <p className="leading-relaxed">{selectedJob.description}</p>
              </section>

              <section>
                <h4 className="text-lg font-semibold mb-2">Responsibilities</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {selectedJob.role.split(". ").map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="text-lg font-semibold mb-2">What We’re Looking For</h4>
                <p>{selectedJob.lookingFor}</p>
              </section>

              <section>
                <h4 className="text-lg font-semibold mb-2">Eligibility</h4>
                <p>{selectedJob.eligibility}</p>
              </section>

              <section>
                <h4 className="text-lg font-semibold mb-2">Benefits</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Comprehensive health, dental, and vision insurance</li>
                  <li>401(k) with company match</li>
                  <li>Generous paid time off and holidays</li>
                  <li>Learning & development budget</li>
                  <li>Employee discounts and wellness programs</li>
                </ul>
              </section>
            </div>

            {/* Apply Button */}
            <div className="mt-8 text-center">
              <a
                href={selectedJob.link}
                className="px-6 py-3 text-white rounded-xl bg-blue-500 hover:bg-blue-700 transition shadow-lg font-medium"
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}