"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const stats = [
  { label: "Candidates Placed", value: 1200 },
  { label: "Companies Served", value: 300 },
  { label: "Interviews Scheduled", value: 5000 },
  { label: "Global Reach", value: 25 },
];

export default function Stats() {
  return (
    <section className="relative py-20 text-center">
      {/* ✅ Heading (only once, above the stats) */}
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-800 dark:text-gray-200">
        Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Impact</span> in <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Numbers</span>
      </h2>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((stat, index) => (
          <StatItem key={index} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Count up logic when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCount();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Function to animate counting
  const animateCount = () => {
    let start = 0;
    const duration = 2000; // 2 sec
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);
  };

  // Re-trigger on hover
  const handleHover = () => {
    setCount(0);
    animateCount();
  };

  return (
    <motion.div
      ref={ref}
      onHoverStart={handleHover}
      className="cursor-pointer"
    >
      <div className="text-4xl font-bold text-blue-500">{count}+</div>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{label}</p>
    </motion.div>
  );
}
