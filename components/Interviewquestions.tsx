"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
const companies = [
  {
    name: "TikTok",
    logoPath: "/tiktok.png",
    color: "#4285F4",
    question:
      "Given the root of a binary tree, return the length of the diameter of the tree.",
  },
  {
    name: "Amazon",
    logoPath: "/aws.svg",
    color: "#FF9900",
    question: "Implement an LRU cache with O(1) get and put operations.",
  },
  {
    name: "Microsoft",
    logoPath: "/microsoft.png",
    color: "#ffffff",
    question:
      "How would you design a distributed file storage system like OneDrive?",
  },
  {
    name: "Airbnb",
    logoPath: "/airbnb.svg",
    color: "#FF5A5F",
    question:
      "Design a booking system that prevents double bookings across multiple users.",
  },
  {
    name: "Linkedin",
    logoPath: "/Linkedin.png",
    color: "#00BCF2",
    question:
      "Design a scalable cloud infrastructure for a high-traffic web application.",
  },
];

export default function Interviewquestions({ bgImage }: { bgImage?: string }) {
  const [currentCompany, setCurrentCompany] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  // ✅ Use next-themes
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ✅ Typewriter effect
  useEffect(() => {
    const handleTyping = () => {
      const current = companies[currentCompany];
      const fullText = `${current.question}`;

      if (!isDeleting) {
        if (textIndex < fullText.length) {
          setDisplayText(fullText.substring(0, textIndex + 1));
          setTextIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        if (textIndex > 0) {
          setDisplayText(fullText.substring(0, textIndex - 1));
          setTextIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentCompany((prev) => (prev + 1) % companies.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [textIndex, isDeleting, currentCompany]);

  if (!mounted) return null;

  // ✅ Background logic
  const backgroundImage =
    bgImage || (resolvedTheme === "dark" ? "/earth.png" : "/hills.png");

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative m-2 min-h-screen flex items-center rounded-2xl justify-start flex-col p-6 transition-colors duration-500"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
    >
      {/* ✅ Content always above bg */}
      <div className="relative z-10 mt-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Interview <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                   Question   </span> Bank </h1>
        <p className="text-gray-400 text-base mb-6">
          Access a comprehensive collection of interview questions sourced from
          top tech companies. <br />
          Explore relevant questions across various domains, designed to help
          you prepare thoroughly and succeed in your next big interview.
        </p>
        <Link
          href="#about"
          className="inline-block px-3 py-1 text-sm rounded-full border border-blue-500 text-blue-400 mb-4 hover:bg-blue-500 hover:text-white transition-colors duration-300 relative z-20"
        >
          Explore Now →
        </Link>
      </div>

      {/* ✅ Responsive typewriter box with glow */}
      <div className="relative z-10 flex justify-center w-full">
        {/* Wrapper for typewriter box + glow */}
        <div className="relative w-full sm:w-[700px] max-w-[90%]">
          {/* Glow effect (always behind, matches box size) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 blur-3xl opacity-50 z-0" />

          {/* Typewriter Box */}
          <div className="relative z-10 bg-transparent bg-opacity-80 backdrop-blur-md rounded-full shadow-lg border-3 border-blue-500 neon p-4 sm:p-6 flex items-center justify-start space-x-3 sm:space-x-4 h-[80px]">
            <Image
              src={companies[currentCompany].logoPath}
              alt={`${companies[currentCompany].name} Logo`}
              width={48}
              height={48}
              className="w-10 h-10 sm:w-12 sm:h-12"
              unoptimized
            />
            <p
              className="text-gray-800 dark:text-gray-200 text-sm sm:text-lg font-bold "
              style={{
                color: companies[currentCompany].color,
                minWidth: "0",
                maxWidth: "100%",
              }}
            >
              {displayText}
              <span className="animate-blink">|</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
