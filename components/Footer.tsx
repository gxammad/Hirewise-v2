"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  MapPin,
  Phone,
  Mail,
  Home,
  Users,
  BarChart3,
  LogIn,
  UserPlus,
  Briefcase,
  Settings,
  UserCircle,
  FileText,
  Calendar,
  MessageSquare,
  PieChart,
  LifeBuoy,
  Send,
  Copy,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const items = ["HIREWISE", "CONTACT US", "CREDITS", "SUBSCRIBE", "ME AMMAD :)"];

export default function Footer() {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const [email, setEmail] = useState("");
  const footerRef = useRef<HTMLDivElement | null>(null);

  // Ensure consistent theme background
  useEffect(() => {
    if (footerRef.current) {
      footerRef.current.className = `relative w-full transition-colors duration-700 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-200"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800"
      }`;
    }
  }, [theme]);

  // Intersection observer to trigger roller animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !showFooter) {
          let step = 0;
          const interval = setInterval(() => {
            setIndex((prev) => {
              if (prev === items.length - 1) {
                clearInterval(interval);
                setTimeout(() => setShowFooter(true), 800);
                return prev;
              }
              step++;
              return prev + 1;
            });
          }, 1000);
        }
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [showFooter]);

  // Copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: theme === "dark" ? "dark" : "light",
    });
  };

  // Subscribe email
  const handleSubscribe = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: theme === "dark" ? "dark" : "light",
      });
      return;
    }
    toast.success("Subscribed successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: theme === "dark" ? "dark" : "light",
    });
    setEmail("");
    // Force dismiss after a slight delay to ensure it closes
    setTimeout(() => toast.dismiss(), 1100);
  };

  // Handle Enter key press for email submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubscribe();
    }
  };

  return (
    <footer ref={footerRef}>
      {!showFooter ? (
        // Roller animation
        <div className="h-48 flex items-center justify-center bg-inherit">
          <div className="relative perspective-[1000px] h-24 w-full flex items-center justify-center">
            {items.map((item, i) => {
              const position = (i - index + items.length) % items.length;
              let transform = "";
              let opacity = 0.3;
              let scale = 0.8;

              if (position === 0) {
                transform = "translateY(0) rotateX(0deg)";
                opacity = 1;
                scale = 1.2;
              } else if (position === 1) {
                transform = "translateY(40px) rotateX(-45deg)";
              } else if (position === items.length - 1) {
                transform = "translateY(-40px) rotateX(45deg)";
              } else {
                transform = "translateY(80px) rotateX(90deg)";
                opacity = 0;
              }

              return (
                <div
                  key={i}
                  className="absolute text-2xl font-bold transition-all duration-700 ease-in-out"
                  style={{
                    transform,
                    opacity,
                    filter: position === 0 ? "blur(0px)" : "blur(3px)",
                    scale,
                    whiteSpace: "nowrap",
                    background: "inherit",
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Footer Content
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-6 py-12"
        >
          {/* Desktop layout */}
          <div className="hidden md:grid grid-cols-5 gap-8">
            {/* Hirewise Info */}
            <div>
              <Link href="/#">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Image
                    src="/logo.svg"
                    alt="Hirewise Logo"
                    width={32}
                    height={32}
                  />
                  <h2 className="text-2xl font-bold">Hirewise</h2>
                </div>
              </Link>
              <p className="mt-2 text-sm">
                Empowering smarter hiring with cutting-edge AI solutions for a
                seamless recruitment experience.
              </p>
              <div className="mt-4 text-sm space-y-2">
                <Link
                  href="https://maps.google.com/?q=123+Hiring+Lane,+Tech+City,+WA+98101"
                  className="flex items-center gap-2 cursor-pointer group hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="w-4 h-4" />
                  123 Hiring Lane, Tech City, WA
                  <Copy
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopy("123 Hiring Lane, Tech City, WA 98101");
                    }}
                  />
                </Link>
                <Link
                  href="tel:+1-800-555-1234"
                  className="flex items-center gap-2 cursor-pointer group hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  +1-800-555-1234
                  <Copy
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopy("+1-800-555-1234");
                    }}
                  />
                </Link>
                <Link
                  href="mailto:contact@hirewise.ai"
                  className="flex items-center gap-2 cursor-pointer group hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  contact@hirewise.ai
                  <Copy
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopy("contact@hirewise.ai");
                    }}
                  />
                </Link>
              </div>
            </div>

            {/* Pages */}
            <div>
              <h3 className="font-semibold mb-3">Pages</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Home", icon: Home, href: "/#" },
                  { label: "About Us", icon: Users, href: "/about" },
                  { label: "Stats", icon: BarChart3, href: "/stats" },
                  { label: "Our Clients", icon: Users, href: "/clients" },
                  { label: "Login", icon: LogIn, href: "/login" },
                  { label: "Signup", icon: UserPlus, href: "/signup" },
                ].map(({ label, icon: Icon, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="flex items-center gap-2 hover:underline underline-offset-4 transition-colors duration-300 hover:text-gray-800 dark:hover:text-white"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Job Listings", icon: Briefcase, href: "/jobs" },
                  {
                    label: "Recruitment Tools",
                    icon: Settings,
                    href: "/tools",
                  },
                  {
                    label: "Candidate Profiles",
                    icon: UserCircle,
                    href: "/candidates",
                  },
                  { label: "Interview Prep", icon: FileText, href: "/prep" },
                ].map(({ label, icon: Icon, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="flex items-center gap-2 hover:underline underline-offset-4 transition-colors duration-300 hover:text-gray-800 dark:hover:text-white"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-3">Our Services</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "AI Shortlisting", icon: Settings, href: "/ai" },
                  { label: "Scheduling", icon: Calendar, href: "/schedule" },
                  {
                    label: "Communication",
                    icon: MessageSquare,
                    href: "/communication",
                  },
                  { label: "Analytics", icon: PieChart, href: "/analytics" },
                  { label: "Support", icon: LifeBuoy, href: "/support" },
                ].map(({ label, icon: Icon, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="flex items-center gap-2 hover:underline underline-offset-4 transition-colors duration-300 hover:text-gray-800 dark:hover:text-white"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe */}
            <div>
              <h3 className="font-semibold mb-3">Subscribe</h3>
              <p className="text-sm mb-3">
                Stay updated with the latest hiring trends and offers.
              </p>
              <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-md overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow px-3 py-2 text-sm bg-transparent outline-none"
                />
                <button
                  onClick={handleSubscribe}
                  className="p-2 transition-transform"
                  title="Subscribe"
                  aria-label="Subscribe"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="grid md:hidden grid-cols-2 gap-6">
            {/* Left column */}
            <div>
              <Link href="/#">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Image
                    src="/logo.svg"
                    alt="Hirewise Logo"
                    width={24}
                    height={24}
                  />
                  <h2 className="text-lg font-bold">Hirewise</h2>
                </div>
              </Link>
              <p className="mt-2 text-xs">
                Empowering smarter hiring with AI solutions.
              </p>
              <div className="mt-3 text-xs space-y-1">
                <Link
                  href="https://maps.google.com/?q=123+Hiring+Lane,+Tech+City,+WA+98101"
                  className="flex items-center gap-2 cursor-pointer group hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="w-3 h-3" />
                  123 Hiring Lane, Tech City, WA
                  <Copy
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopy("123 Hiring Lane, Tech City, WA 98101");
                    }}
                  />
                </Link>
                <Link
                  href="tel:+1-800-555-1234"
                  className="flex items-center gap-2 cursor-pointer group hover:underline"
                >
                  <Phone className="w-3 h-3" />
                  +1-800-555-1234
                  <Copy
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopy("+1-800-555-1234");
                    }}
                  />
                </Link>
                <Link
                  href="mailto:contact@hirewise.ai"
                  className="flex items-center gap-2 cursor-pointer group hover:underline"
                >
                  <Mail className="w-3 h-3" />
                  contact@hirewise.ai
                  <Copy
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopy("contact@hirewise.ai");
                    }}
                  />
                </Link>
              </div>

              <h3 className="mt-5 font-semibold">Pages</h3>
              <ul className="space-y-1 text-xs mt-2">
                <li className="hover:underline">
                  <Link href="/#">Home</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/about">About Us</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/stats">Stats</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/clients">Our Clients</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/login">Login</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/signup">Signup</Link>
                </li>
              </ul>
            </div>

            {/* Right column */}
            <div>
              <h3 className="font-semibold">Categories</h3>
              <ul className="space-y-1 text-xs mt-2">
                <li className="hover:underline">
                  <Link href="/jobs">Job Listings</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/tools">Recruitment Tools</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/candidates">Candidate Profiles</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/prep">Interview Prep</Link>
                </li>
              </ul>

              <h3 className="mt-5 font-semibold">Our Services</h3>
              <ul className="space-y-1 text-xs mt-2">
                <li className="hover:underline">
                  <Link href="/ai">AI Shortlisting</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/schedule">Scheduling</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/communication">Communication</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/analytics">Analytics</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/support">Support</Link>
                </li>
              </ul>
            </div>

            {/* Subscribe section */}
            <div className="col-span-2 mt-5 text-center">
              <h3 className="font-semibold mb-2">Subscribe</h3>
              <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-md overflow-hidden max-w-xs mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow px-3 py-2 text-xs bg-transparent outline-none"
                />
                <button
                  onClick={handleSubscribe}
                  className="p-2 transition-transform"
                  title="Subscribe"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
         
          {/* Copyright */}
          <div className="mt-8 text-center text-xs border-t border-gray-400 dark:border-gray-700 pt-4">
            © 2025 Hirewise — All Rights Reserved. Crafted for Smarter Hiring.
          </div>
          
        </motion.div>
        
      )}
    </footer>
  );
}