"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function NotFound() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="flex pt-16 flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted dark:from-gray-950 dark:to-gray-900 text-center px-6">
      {/* Logo + Name */}
      <div
        className="flex items-center gap-2 mb-6"
        data-aos="fade-down"
      >
        <Image
          src="/logo.svg"
          alt="LOGO"
          width={40}
          height={40}
        />
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
          HIREWISE
        </h2>
      </div>

      {/* 404 Image */}
      <div className="mb-6" data-aos="zoom-in">
        <Image
          src="/404.png"
          alt="404 Not Found"
          width={600}
          height={600}
          className="mx-auto"
        />
      </div>

      {/* 404 Heading */}
      <h1
        className="text-7xl font-extrabold text-primary mb-4 animate-pulse"
        data-aos="fade-up"
      >
        404
      </h1>

      {/* Subtitle */}
      <h2
        className="text-2xl sm:text-3xl font-semibold text-foreground mb-2"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Page Not Found
      </h2>

      <p
        className="text-muted-foreground max-w-lg mb-8"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* CTA Buttons */}
      <div
        className="flex flex-col sm:flex-row gap-4"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-primary text-white dark:text-black dark:bg-white font-medium shadow hover:scale-105 transition"
        >
          Back to Home
        </Link>

        <Link
          href="/contact"
          className="px-6 py-3 rounded-2xl border border-primary text-primary dark:text-white dark:border-white hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-black transition"
        >
          Contact Support
        </Link>
      </div>
    </section>
  );
}
