"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AIJobsSection() {
  return (
    <section
      id="ai-jobs"
      className="relative bg-transparent py-20 px-4 md:px-12"
    >
      <div className="container mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
        {/* Image / Illustration with gradient shadow and floating effect */}
       <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: [0, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full md:w-1/2 flex justify-center relative"
            >
          {/* Gradient shadow */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-pink-400 to-blue-500 opacity-30 blur-3xl -z-10"></div>

          <Image
            src="/ai-image.png" // replace with your PNG path
            alt="AI Jobs Dashboard"
            width={450}
            height={450}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex flex-col gap-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Explore <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">AI-Powered Jobs</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
            Discover personalized AI-driven job recommendations that match your skills and experience. Get actionable insights and stay ahead in your career with intelligent job alerts.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
            Our platform leverages advanced algorithms to connect you with the right opportunities and help you make informed career decisions effortlessly.
          </p>

          <div className="mt-4 flex gap-4">
            <Link
              href="login"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
            >
              Apply Now
            </Link>
            <Link
              href="#about"
              className="border border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
