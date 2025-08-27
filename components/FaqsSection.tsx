"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    question: "What is HireWise?",
    answer:
      "HireWise is a smart recruitment platform that connects companies with top talent using AI-powered insights and streamlined hiring workflows.",
  },
  {
    question: "How can I post a job?",
    answer:
      "Simply sign up for an employer account, go to the dashboard, and click 'Post a Job'. Fill in the job details and publish instantly.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, HireWise offers a free trial for new employers so you can explore the platform before committing to a plan.",
  },
  {
    question: "How do candidates apply?",
    answer:
      "Candidates can browse jobs on HireWise and apply directly with their resume and profile in just a few clicks.",
  },
  {
    question: "Can I track applicants?",
    answer:
      "Absolutely! Employers get a dedicated dashboard with tracking, candidate profiles, and status updates.",
  },
];

export default function FAQsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="relative py-20 px-4 md:px-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Side Image with Blur Glow */}
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-full md:w-1/2 flex justify-center relative"
        >
          {/* Blur Gradient Glow */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 opacity-30 blur-3xl -z-10"></div>

          <Image
            src="/blog-five3.jpg"
            alt="HireWise FAQs"
            width={450}
            height={450}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Right Side FAQs */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <div className="divide-y divide-gray-300 dark:divide-gray-700">
            {faqs.map((faq, index) => (
              <div key={index} className="mt-3">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {faq.question}
                  </span>
                  <motion.div
                    initial={false}
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: openIndex === index ? 1 : 0,
                      height: openIndex === index ? "auto" : 0,
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden py-3 "
                  >
                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
