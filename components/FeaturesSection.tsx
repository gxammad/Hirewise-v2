"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, BarChart3, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Executive Recruitment",
    description:
      "Hirewise connects you with top-level executives who drive organizational success.",
  },
  {
    icon: Users,
    title: "Talent Acquisition",
    description:
      "Streamline your hiring process and attract the best talent in the market.",
  },
  {
    icon: BarChart3,
    title: "Market Insights",
    description:
      "Gain valuable hiring and workforce insights to stay ahead of industry trends.",
  },
  {
    icon: CheckCircle,
    title: "Candidate Screening",
    description:
      "Ensure quality hires with thorough candidate evaluations and background checks.",
  },
];

// Scroll-in animation for cards
const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, bounce: 0.4, duration: 0.8 },
  },
};

export default function Features() {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/team-bg.jpg" // 🔹 replace with your actual bg image path
          alt="Background"
          className="w-full h-full object-cover blur-[8px]"
        />
        <div className="absolute inset-0 bg-white/70 dark:bg-black/60" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Why Choose <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Hirewise</span>?
        </motion.h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false, amount: 0.3 }}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.2, type: "spring", stiffness: 120 }}
                className="relative p-6 rounded-2xl bg-white/90 dark:bg-gray-800/90 shadow-md transition-shadow duration-300 backdrop-blur-sm cursor-pointer overflow-hidden"
              >
                {/* Blue Neon Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-blue-500 opacity-0 blur-3xl z-[-1]"
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.5, type: "spring" }}
                ></motion.div>

                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900 mb-5 relative z-10">
                  <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
