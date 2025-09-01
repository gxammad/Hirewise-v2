"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-transparent py-20 px-4 md:px-12"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
       
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <Image
            src="/about-three-1.jpg"
            alt="About HIREWISE"
            width={450}
            height={450}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>


        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex flex-col gap-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            About <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Hirewise</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
            HIREWISE is your ultimate platform for connecting top talent with the right
            opportunities. We leverage intelligent algorithms and a user friendly
            interface to ensure that companies find qualified professionals quickly,
            and job seekers discover their dream roles effortlessly.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
            Our mission is to simplify hiring and career growth by providing an
            intuitive platform backed by data-driven insights. Whether you are a
            company looking for the perfect candidate or a professional seeking your
            next big opportunity, HIREWISE has you covered.
          </p>

          <div className="mt-4 flex gap-4">
            <a
              href="contact"
              className="bg-gradient-to-r from-blue-500 to-purple-500  text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
            >
              Get in Touch
            </a>
            <a
              href="#services"
              className="border border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Our Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
