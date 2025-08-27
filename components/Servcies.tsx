"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Briefcase, Users, Search, LineChart } from "lucide-react";

const servicesData = [
  {
    id: 1,
    img: "/service-1.jpg",
    title: "Talent Acquisition",
    category: "Recruitment",
    desc: "AI-powered sourcing, screening, and shortlisting tailored to your hiring needs.",
    icon: <Users className="w-12 h-12 text-blue-500" />,
    color: "bg-blue-400/30",
    glow: "bg-blue-400/50",
  },
  {
    id: 2,
    img: "/service-2.jpg",
    title: "Executive Recruitment",
    category: "Leadership",
    desc: "Connecting you with top executives who can transform your business growth.",
    icon: <Briefcase className="w-12 h-12 text-purple-500" />,
    color: "bg-purple-400/30",
    glow: "bg-purple-400/50",
  },
  {
    id: 3,
    img: "/service-3.jpg",
    title: "Market Insights",
    category: "Analytics",
    desc: "Real-time hiring trends, salary benchmarks, and industry movement reports.",
    icon: <LineChart className="w-12 h-12 text-green-500" />,
    color: "bg-green-400/30",
    glow: "bg-green-400/50",
  },
  {
    id: 4,
    img: "/service-4.jpg",
    title: "Candidate Screening",
    category: "Evaluation",
    desc: "Advanced tools to assess technical, behavioral, and cultural fit.",
    icon: <Search className="w-12 h-12 text-pink-500" />,
    color: "bg-pink-400/30",
    glow: "bg-pink-400/50",
  },
];

// Scroll-in animation for cards and icon/title
const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, bounce: 0.4, duration: 0.8 },
  },
};

// Hover overlay animation
const overlayVariants = {
  initial: { y: 100, opacity: 0 },
  hoverState: {
    y: 0,
    opacity: 0.8,
    transition: { type: "spring" as const, bounce: 0.3, duration: 0.6 },
  },
};

export default function Services() {
  return (
    <section id="services" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl  font-bold text-gray-900 dark:text-white">
            Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
            At <span className="font-semibold text-blue-500">HireWise</span>, we
            provide data-driven recruitment solutions and insights to help you
            hire smarter and faster.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
          {servicesData.map((service) => (
            <div key={service.id} className="flex flex-col items-center">
              <motion.div
                className="group relative w-[240px] sm:w-[260px] md:w-[280px] lg:w-[290px] aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false, amount: 0.2 }}
                variants={cardVariants}
              >
                {/* Card Image */}
                <div className="relative w-full aspect-square">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
                    initial="initial"
                    whileHover="hoverState"
                    variants={overlayVariants}
                  />

                  {/* Card Content */}
                  <motion.div
                    className="absolute bottom-0 w-full p-6 text-center transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-5 group-hover:translate-y-0 bg-white/30 dark:bg-black/30 backdrop-blur-md"
                  >
                    <span className="text-sm font-bold text-white uppercase block">
                      {service.category}
                    </span>
                    <p className="mt-2 text-xs text-white/90 dark:text-gray-200">
                      {service.desc}
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Icon and Title */}
              <motion.div
                className="flex items-center gap-3 mt-4"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false, amount: 0.2 }}
                variants={cardVariants}
              >
                <motion.div
                  className="relative"
                  whileHover={{ rotate: 10, scale: 1.2 }}
                >
                  <span
                    className={`absolute w-16 h-16 rounded-full blur-xl transition duration-500 ${service.color}`}
                  ></span>
                  {service.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
