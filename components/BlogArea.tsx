"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Hiring with AI",
    desc: "Discover how AI is transforming recruitment and making hiring smarter.",
    img: "/news-1.jpg",
    author: "/team-four-1.jpg",
    authorName: "Jhon D.",
    date: "Aug 20, 2025",
    tag: "AI Recruitment",
  },
  {
    id: 2,
    title: "Top 5 Interviujew Trends in 2025",
    desc: "Learn about the new trends shaping candidate interviews this year.",
    img: "/news-2.jpg",
    author: "/news-author-2.jpg",
    authorName: "Emily Watson",
    date: "Aug 15, 2025",
    tag: "Career Growth",
  },
  {
    id: 3,
    title: "Why Soft Skills Matter in Hiring",
    desc: "Understand why emotional intelligence and communication are key.",
    img: "/news-3.jpg",
    author: "/news-author-3.jpg",
    authorName: "Michael Smith",
    date: "Aug 10, 2025",
    tag: "HR Insights",
  },
];

// Card animation variants
const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, bounce: 0.3, duration: 0.7 },
  },
};

export default function BlogSection() {
  return (
    <section className="py-16 bg-transparent ">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Latest <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Insights</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              className="bg-white dark:bg-[#1a2234] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
            >
              {/* Thumbnail */}
              <div className="relative h-52 w-full">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-gray-50 px-3 py-1 rounded-full">
                  {post.tag}
                </span>

                <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500 cursor-pointer transition">
                  {post.title}
                </h3>

                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  {post.desc}
                </p>

                {/* Author */}
                <div className="flex items-center mt-4 gap-3">
                  <Image
                    src={post.author}
                    alt={post.authorName}
                    width={35}
                    height={35}
                    className="rounded-full border"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {post.authorName}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {post.date}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
