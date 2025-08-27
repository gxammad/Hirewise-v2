"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Typewriter() {
  const lines = [
    "Your AI-Powered Hiring Partner",
    "Find the Perfect Fit",
    "Careers Without Borders",
  ];

  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIndex];

    if (!isDeleting && charIndex <= current.length) {
      const t = setTimeout(() => {
        setText(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, 80);
      return () => clearTimeout(t);
    }

    if (!isDeleting && charIndex > current.length) {
      const t = setTimeout(() => setIsDeleting(true), 1000);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIndex >= 0) {
      const t = setTimeout(() => {
        setText(current.slice(0, charIndex));
        setCharIndex((c) => c - 1);
      }, 40);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIndex < 0) {
      setIsDeleting(false);
      setLineIndex((i) => (i + 1) % lines.length);
      setCharIndex(0);
    }
  }, [charIndex, isDeleting, lineIndex]);

  return (
    <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-200 dark:text-white flex-wrap text-center">
      <span className="whitespace-pre">{text}</span>
      <span className="ml-1 text-gray-200 dark:text-gray-200 animate-pulse">●</span>
    </div>
  );
}

export default function HeroSection() {
  useEffect(() => {
    gsap.to(".hero-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="hero-section  relative text-center min-h-[90vh] sm:h-screen flex items-center mt-19 sm:mt-21 justify-center rounded-2xl sm:rounded-4xl w-full overflow-hidden">
      {/* Background */}
      <div
        className="hero-bg absolute inset-0"
        style={{
          backgroundImage: `url(/hero.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 px-4 max-w-5xl mx-auto text-center">
        {/* Brand */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-200 dark:text-white text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-3 sm:mb-4"
        >
          Hirewise
        </motion.h2>

        {/* Typewriter */}
        <div className="mb-6 sm:mb-8 leading-tight">
          <Typewriter />
        </div>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-200 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 px-2 sm:px-0"
        >
          Simplify recruitment, automate candidate shortlisting, and schedule
          interviews effortlessly — all in one sleek platform.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Link
            href="/signup"
            className="w-full sm:w-auto px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-lg shadow hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300 text-center"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition
              bg-transparent text-white border border-white hover:bg-white/10
              dark:text-white dark:bg-white/10 dark:backdrop-blur-md dark:border-transparent dark:hover:bg-white/20 text-center"
          >
            Login
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
