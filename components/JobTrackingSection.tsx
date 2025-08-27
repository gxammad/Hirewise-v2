"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function JobTrackingSection() {
  return (
    <section className="py-16 bg-black dark:bg-white text-white dark:text-black">
      <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">Hirewise Job Tracking</h2>
          <p className="text-lg text-gray-400 dark:text-gray-600 mb-4">
            Manage your hiring pipeline with our intuitive tracking tool. Stay organized and make data-driven decisions.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-700 dark:border-gray-300 rounded-lg bg-gray-900 dark:bg-gray-100">
              <h3 className="font-bold">Candidate Pipeline</h3>
              <p className="text-sm text-gray-400 dark:text-gray-600">Track candidates from application to offer.</p>
            </div>
            <div className="p-4 border border-gray-700 dark:border-gray-300 rounded-lg bg-gray-900 dark:bg-gray-100">
              <h3 className="font-bold">Interview Status</h3>
              <p className="text-sm text-gray-400 dark:text-gray-600">Monitor interview stages in real-time.</p>
            </div>
            <div className="p-4 border border-gray-700 dark:border-gray-300 rounded-lg bg-gray-900 dark:bg-gray-100">
              <h3 className="font-bold">Analytics</h3>
              <p className="text-sm text-gray-400 dark:text-gray-600">Analyze hiring trends and performance.</p>
            </div>
            <div className="p-4 border border-gray-700 dark:border-gray-300 rounded-lg bg-gray-900 dark:bg-gray-100">
              <h3 className="font-bold">Notifications</h3>
              <p className="text-sm text-gray-400 dark:text-gray-600">Get alerts for key hiring milestones.</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image src="/prepin pics/Product-bkUGM6_X.png" alt="Job Tracking Tool" width={600} height={400} className="rounded-lg shadow-lg" />
        </motion.div>
      </div>
    </section>
  );
}