"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FeaturesSection() {
  const features = [
    { title: "AI Shortlisting", description: "Automate candidate screening with intelligent algorithms.", image: "/prepin pics/Product-bkUGM6_X.png" },
    { title: "Interview Scheduler", description: "Effortlessly schedule interviews with calendar integration.", image: "/prepin pics/video_placeholder3-C5Tapaz5.png" },
    { title: "Feedback Analysis", description: "Receive detailed feedback on candidate performance.", image: "/prepin pics/companies-Dabs7h16.svg" },
    { title: "Candidate Insights", description: "Gain deep insights into candidate skills and fit.", image: "/prepin pics/microsoft-DSm2qdQ_.png" },
    { title: "Real-Time Collaboration", description: "Collaborate with your team during the hiring process.", image: "/prepin pics/stripe-Bx1uWCGk.png" },
    { title: "Compliance Tracking", description: "Ensure hiring processes meet legal standards.", image: "/prepin pics/tiktok-CLC6Ypb7.png" },
  ];

  return (
    <section className="py-16 bg-black dark:bg-white text-white dark:text-black">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features for Smarter Hiring</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 border border-gray-700 dark:border-gray-300 rounded-lg bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Image src={feature.image} alt={feature.title} width={300} height={200} className="mb-4 rounded" />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-gray-400 dark:text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}