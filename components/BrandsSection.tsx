"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const brands = [
  { name: "AIRBNB", logo: "/client-logo-1.png" },
  { name: "HUBSPOT", logo: "/client-logo-2.png" },
  { name: "GOOGLE", logo: "/client-logo-3.png" },
  { name: "MICROSOFT", logo: "/client-logo-4.png" },
  { name: "WALMART", logo: "/client-logo-5.png" },
];

export default function BrandsSection() {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null); // Explicitly type as HTMLDivElement
  const [containerWidth, setContainerWidth] = useState(0);

  // Calculate width of one set of brands
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.scrollWidth / 2; // Divide by 2 since brands are duplicated
      setContainerWidth(width);
    }
  }, []);

  // Start animation once width is calculated
  useEffect(() => {
    if (containerWidth > 0) {
      controls.start({
        x: [0, -containerWidth], // Move by the width of one set of brands
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30, // Keep your speed
            ease: "linear",
          },
        },
      });
    }
  }, [controls, containerWidth]);

  // Duplicate brands once for seamless looping
  const loopedBrands = [...brands, ...brands];

  return (
    <section
      id="brands"
      className="py-16 px-4 w-full md:px-12 bg-transparent dark:bg-[url('/progress.png')] dark:bg-cover dark:bg-center"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Trusted</span> by
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-12">
          HIREWISE partners with leading brands to deliver exceptional services.
        </p>

        <div className="overflow-hidden relative">
          {/* Gradient masks for blur-like fade effect */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

          <motion.div
            ref={containerRef}
            className="flex p-8 w-max gap-10"
            animate={controls}
          >
            {loopedBrands.map((brand, index) => (
              <motion.div
                key={`${brand.name}-${index}`} // Unique key for each item
                whileHover={{
                  y: -5,
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(59,130,246,0.6)",
                }}
                className="flex justify-center items-center p-4 rounded-lg dark:bg-white"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}