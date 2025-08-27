"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastDirection, setLastDirection] = useState<"up" | "down">("up");

  const [showNavbar, setShowNavbar] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [animateNavbar, setAnimateNavbar] = useState(false);

  useEffect(() => {
    setMounted(true);
    AOS.init({ duration: 600, once: true });
  }, []);

  // Show-once-per-direction-change (down→up) with threshold to avoid jitter
  useEffect(() => {
    const THRESHOLD = 10; // px

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8); // enable "scrolled" styling after slight move

      let newDirection: "up" | "down" = lastDirection;

      if (y > lastScrollY + THRESHOLD) newDirection = "down";
      else if (y < lastScrollY - THRESHOLD) newDirection = "up";

      // React only when direction actually changes
      if (newDirection !== lastDirection) {
        if (newDirection === "up") {
          // show once on change to up
          setShowNavbar(true);
          setAnimateNavbar(true);
          // remove animation class after it plays
          setTimeout(() => setAnimateNavbar(false), 650);
        } else {
          // change to down → hide
          setShowNavbar(false);
        }
        setLastDirection(newDirection);
      }

      setLastScrollY(y);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY, lastDirection]);

  return (
    <>
       {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }
        ${
          scrolled
            ? // Floating mode: rounded, shadow, narrower width, centered
              "backdrop-blur-md bg-white/70 top-3 dark:bg-gray-900/50 rounded-2xl ring-1 ring-black/5 shadow-2xl drop-shadow-xl w-[92%] max-w-6xl mx-auto"
            : // Default full-width mode
              "bg-[#f5f6fa] dark:bg-gray-800 shadow w-full"
        }
        ${animateNavbar ? "animate-slide-fade-in-down" : ""}`}
      >
        
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2"
            data-aos="fade-right"
          >
            <Image src="/logo.svg" alt="HIREWISE Logo" width={24} height={24} />
            HIREWISE
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6" data-aos="fade-down">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "#about" },
              { label: "Contact", href: "contact" },
              { label: "Login", href: "login" },
              { label: "Signup", href: "signup" },
            ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-800 dark:text-gray-200 hover:underline"
                >
                  {item.label}
                </Link>
              ))}

            {/* Dark/Light Pill Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle Dark/Light Mode"
                className="relative flex items-center bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full px-1 py-1 cursor-pointer w-[130px] transition-colors duration-300"
              >
                <div
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white dark:bg-gray-900 shadow-md transition-transform duration-300 ease-in-out`}
                  style={{
                    transform:
                      theme === "dark" ? "translateX(100%)" : "translateX(0%)",
                  }}
                ></div>
                <div className="relative flex items-center justify-center w-1/2 gap-1 z-10">
                  <SunIcon className="h-4 w-4 text-gray-800 dark:text-white" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Light
                  </span>
                </div>
                <div className="relative flex items-center justify-center w-1/2 gap-1 z-10">
                  <MoonIcon className="h-4 w-4 text-gray-800 dark:text-white" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Dark
                  </span>
                </div>
              </button>
            )}
          </div>

          {/* Mobile Right side: Dark/Light + Menu */}
          <div className="md:hidden flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle Dark/Light Mode"
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
              >
                {theme === "dark" ? (
                  <MoonIcon className="h-5 w-5 text-gray-200" />
                ) : (
                  <SunIcon className="h-5 w-5 text-gray-800" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-800 dark:text-gray-200"
              aria-label="Open menu"
            >
              <Bars3Icon className="h-7 w-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex justify-end">
          {/* Sidebar from right */}
          <div className="w-64 bg-white dark:bg-gray-900 h-full shadow-lg p-6 relative animate-slide-in-right">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-800 dark:text-gray-200"
              aria-label="Close menu"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Links with swipe animation */}
            <nav className="mt-10 flex flex-col gap-6">
              {["Home", "About", "Contact", "Login", "Signup"].map((item, i) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-800 dark:text-gray-200 hover:underline transform transition-all duration-500"
                  style={{
                    animation: `slideInLink 0.4s ease forwards`,
                    animationDelay: `${i * 0.15}s`,
                    opacity: 0,
                  }}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Clicking outside closes */}
          <div className="flex-1" onClick={() => setIsOpen(false)}></div>
        </div>
      )}

      {/* Extra CSS */}
      <style jsx>{`
        @keyframes slideInLink {
          from {
            transform: translateX(30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease forwards;
        }

        /* Navbar slide + fade */
        @keyframes slideFadeInDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-fade-in-down {
          animation: slideFadeInDown 0.65s ease forwards;
        }
      `}</style>
    </>
  );
}
