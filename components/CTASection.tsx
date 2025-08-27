"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-16 bg-black dark:bg-white text-white dark:text-black text-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Transform Your Hiring Today
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link
            href="/signup"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition"
          >
            Sign Up Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}