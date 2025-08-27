"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const galleryItems = [
  { id: 1, title: "AI Resume Screening", img: "/g1.jpg" },
  { id: 2, title: "Candidate Insights", img: "/g2.jpg" },
  { id: 3, title: "Smart Job Matching", img: "/g3.jpg" },
  { id: 4, title: "Recruitment Dashboard", img: "/g4.jpg" },
];

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Check if mobile
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Helpers for looping
  const loopIndex = (index: number) => {
    const total = galleryItems.length;
    return (index + total) % total;
  };

  const nextSlide = useCallback(() => {
    setDirection("right");
    setCurrentIndex((prev) => loopIndex(prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setDirection("left");
    setCurrentIndex((prev) => loopIndex(prev - 1));
  }, []);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isMobile) {
        if (e.key === "ArrowUp") prevSlide();
        if (e.key === "ArrowDown") nextSlide();
      } else {
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMobile, nextSlide, prevSlide]);

  return (
    <section id="gallery" className="py-20 px-4 md:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Hirewise{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Gallery
          </span>
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Explore our AI-powered recruitment solutions through real screenshots
          and dashboards.
        </motion.p>

        <div className="relative">
          {/* Desktop Arrows */}
          {!isMobile && (
            <>
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="absolute left-[-32px] top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 dark:bg-gray-800/50"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="absolute right-[-32px] top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 dark:bg-gray-800/50"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          {/* Desktop Layout (PS4-style smooth with drag + snap-back) */}
          {!isMobile && (
            <div className="overflow-visible px-6 pb-4">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  className="flex justify-center space-x-6"
                  custom={direction}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = offset.x + velocity.x * 0.2;
                    if (swipe < -100) nextSlide();
                    else if (swipe > 100) prevSlide();
                    // else → snap-back automatically via spring
                  }}
                  initial={{ x: direction === "right" ? "30%" : "-30%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction === "right" ? "-30%" : "30%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                >
                  {[currentIndex - 1, currentIndex, currentIndex + 1].map(
                    (pos, i) => {
                      const index = loopIndex(pos);
                      const isCenter = i === 1;
                      return (
                        <motion.div
                          key={`${galleryItems[index].id}-${i}`}
                          className={`relative rounded-2xl shadow-lg backdrop-blur-md border border-white/10 ${
                            isCenter
                              ? "w-96 z-20"
                              : "w-72 opacity-60 blur-[2px] z-10"
                          }`}
                          animate={{
                            scale: isCenter ? 1.1 : 0.9,
                            y: isCenter ? 0 : 20,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 20,
                          }}
                        >
                          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden">
                            <Image
                              src={galleryItems[index].img}
                              alt={galleryItems[index].title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-2xl">
                            <h3 className="text-white text-lg font-semibold">
                              {galleryItems[index].title}
                            </h3>
                          </div>
                        </motion.div>
                      );
                    }
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Mobile Layout */}
          {isMobile && (
            <div className="relative h-80 w-full overflow-hidden flex items-center justify-center">
              {/* Up Arrow */}
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="absolute top-2 left-1/2 -translate-x-1/2 z-20 p-2 rounded-full bg-white/20 dark:bg-gray-800/50"
              >
                <ChevronUp size={28} />
              </button>

              {/* Current Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={galleryItems[currentIndex].id}
                  className="absolute w-80 h-64 rounded-2xl overflow-hidden shadow-lg bg-white/5 backdrop-blur-md border border-white/10"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={galleryItems[currentIndex].img}
                    alt={galleryItems[currentIndex].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-white text-lg font-semibold">
                      {galleryItems[currentIndex].title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Down Arrow */}
              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 p-2 rounded-full bg-white/20 dark:bg-gray-800/50"
              >
                <ChevronDown size={28} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
