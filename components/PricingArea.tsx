"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const monthlyPlans = [
  {
    title: "Standard",
    price: 29,
    period: "per month",
    features: [
      "AI Resume Screening (basic)",
      "Candidate Insights (limited)",
      "10 Job Postings / month",
      "Basic Analytics Dashboard",
    ],
  },
  {
    title: "Business",
    price: 59,
    period: "per month",
    features: [
      "Smart Job Matching",
      "Candidate Insights (advanced)",
      "Unlimited Job Postings",
      "Recruitment Dashboard",
    ],
  },
  {
    title: "Premium",
    price: 99,
    period: "per month",
    features: [
      "AI Resume Screening (advanced)",
      "Full Candidate Insights Suite",
      "Unlimited Job Postings",
      "Dedicated Success Manager",
    ],
  },
];

const yearlyPlans = [
  {
    title: "Standard",
    price: 299,
    period: "per year",
    features: [
      "AI Resume Screening (basic)",
      "Candidate Insights (limited)",
      "120 Job Postings / year",
      "Basic Analytics Dashboard",
    ],
  },
  {
    title: "Business",
    price: 599,
    period: "per year",
    features: [
      "Smart Job Matching",
      "Candidate Insights (advanced)",
      "Unlimited Job Postings",
      "Recruitment Dashboard",
    ],
  },
  {
    title: "Premium",
    price: 999,
    period: "per year",
    features: [
      "AI Resume Screening (advanced)",
      "Full Candidate Insights Suite",
      "Unlimited Job Postings",
      "Dedicated Success Manager",
    ],
  },
];

export default function PricingArea() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const plans = billing === "monthly" ? monthlyPlans : yearlyPlans;

  return (
    <section
      id="pricing"
      className="py-20 relative"
      style={{
        backgroundImage: "url('/hero-three.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
          Choose Your Best Plan
          
        </h2>
        <p className="text-gray-100 mb-12">
          Simple, transparent pricing for every stage of your hiring journey.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              billing === "monthly"
                ? "bg-blue-500 text-white"
                : "bg-white/20 text-gray-200 hover:bg-white/30"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-6 py-2 rounded-full font-semibold transition relative ${
              billing === "yearly"
                ? "bg-blue-500 text-white"
                : "bg-white/20 text-gray-200 hover:bg-white/30"
            }`}
          >
            Yearly
            {billing === "yearly" && (
              <span className="absolute -top-3 -right-8 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full shadow">
                Save 20%
              </span>
            )}
          </button>
        </div>

        {/* Plans */}
        <AnimatePresence mode="wait">
          <motion.div
            key={billing}
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {plans.map((plan, i) => {
              const isPremium = plan.title === "Premium";
              return (
                <motion.div
                  key={i}
                  className={`relative rounded-2xl shadow-md p-8 backdrop-blur-md cursor-pointer border border-white/10 transition ${
                    isPremium
                      ? "bg-white/30 dark:bg-gray-800/40 scale-105 z-20"
                      : "bg-white/20 dark:bg-gray-800/30"
                  }`}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  {isPremium && (
                    <span className="absolute top-4 right-4 text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                  <h3
                    className={`font-semibold mb-4 ${
                      isPremium
                        ? "text-2xl md:text-3xl text-white"
                        : "text-xl text-gray-100"
                    }`}
                  >
                    {plan.title}
                  </h3>
                  <div
                    className={`font-bold mb-2 ${
                      isPremium
                        ? "text-5xl text-blue-400"
                        : "text-4xl text-blue-500"
                    }`}
                  >
                    ${plan.price}
                  </div>
                  <p className="text-gray-100 mb-6">{plan.period}</p>
                  <ul className="text-left space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-100"
                      >
                        <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full rounded-full bg-blue-500 text-white py-2 font-semibold hover:bg-blue-600 transition">
                    Choose {plan.title}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
