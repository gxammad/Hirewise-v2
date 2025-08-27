"use client";

import { motion } from "framer-motion";

// Section 1 Cards
const interviewCards = [
  { title: "✨ Technical Skills", desc: "Master core concepts", delay: 0 },
  { title: "✨ Salary Negotiation", desc: "Learn proven strategies", delay: 0.15 },
  { title: "✨ Behavioral Interview", desc: "Perfect your soft skills", delay: 0.3 },
];

// Section 2 Brands (dummy placeholders)
const brands = ["Google", "Microsoft", "Meta", "Airbnb", "Netflix"];

// Scroll animation variants
const listItemVariants = {
  offscreen: { opacity: 0, y: 20 },
  onscreen: { opacity: 1, y: 0, transition: { type: "spring" as const, duration: 0.6 } }
};


export default function HirewiseSections() {
  return (
    <div className="bg-transparent">
      {/* -------- SECTION ONE -------- */}
      <section className="relative w-full py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-6 lg:px-12">
          {/* Left Text Section */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            variants={listItemVariants}
            viewport={{ once: false, amount: 0.2 }}
          >
            {/* Pink line */}
            <span className="inline-block px-3 py-1 text-sm rounded-full border border-pink-500 text-pink-400 mb-4 hover:bg-pink-500 hover:text-white transition-colors duration-300">
              Interview Plan
            </span>
            <h2 className="relative text-4xl font-bold mb-4">
              <span className="absolute -left-6 top-0 h-full w-1 bg-pink-500 rounded-full"></span>
              Prepare with <span className="text-pink-500">confidence</span>
            </h2>
            <p className="text-lg text-gray-800 dark:text-gray-300 mb-6">
              Refine your interview skills and gain the edge you need with realistic, AI-driven mock interviews.
            </p>
            <ul className="space-y-3 text-gray-800 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                Practice in a pressure-free environment
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                Receive instant, constructive feedback
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                Build confidence through repetition
              </li>
            </ul>
          </motion.div>

          {/* Right Cards */}
          <div className="relative flex flex-col items-center perspective-1000">
            {interviewCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, rotateX: 0, rotateY: -40, rotateZ: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: -10, rotateZ: -20 }}
                transition={{ duration: 0.8, delay: card.delay }}
                viewport={{ once: false, amount: 0.2 }}
                whileHover={{ y: -20, rotateX: 20, rotateY: 20 , rotateZ: 20 }}
                className={`absolute w-80 h-28 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 p-5 shadow-lg cursor-pointer transform-gpu
                           ${index === 0 ? "z-30 top-0" : index === 1 ? "z-20 top-10" : "z-10 top-20"}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-gray-800 dark:text-gray-300">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------- SECTION TWO -------- */}
      <section className="relative w-full py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-6 lg:px-12">
          {/* Left Text Section */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            variants={listItemVariants}
            viewport={{ once: false, amount: 0.2 }}
          >
            {/* Blue line */}
            <span className="inline-block px-3 py-1 text-sm rounded-full border border-blue-500 text-blue-400 mb-4 hover:bg-blue-500 hover:text-white transition-colors duration-300">
              Company-specific
            </span>
            <h2 className="relative text-4xl font-bold mb-4">
              <span className="absolute -left-6 top-0 h-full w-1 bg-blue-500 rounded-full"></span>
              Tailored for <span className="text-blue-500">Your Dream Role</span>
            </h2>
            <p className="text-lg text-gray-800 dark:text-gray-300 mb-6">
              Experience personalized interview simulations designed specifically for your target position at top tech companies.
            </p>
            <ul className="space-y-3 text-gray-800 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Company-specific interview formats
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Role-based technical assessments
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Custom behavioral scenarios
              </li>
            </ul>
          </motion.div>

          {/* Right Brand Logos (Dummy Box) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.2 }}
            style={{
              backgroundImage: "url('./prepin pics/companies-Dabs7h16.svg')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="w-100 h-80 m-auto rounded-2xl shadow-lg flex items-center justify-center"
          >
            <div className="flex space-x-6 p-2 text-gray-800 dark:text-white text-2xl">
              {brands.map((brand, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  whileHover={{ scale: 1.2 }}
                  className="px-3 py-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10"
                >
                  {brand}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
