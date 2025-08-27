"use client";
import React from "react";
import ContactForm from "../forms/contact-form";
import { MapPin, Mail, Phone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const ContactSection = () => {
  // Parallax background effect
  const { scrollY } = useScroll();

  return (
    <section className="relative text-center min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with zoom/parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/hero-one.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(3px)",
          zIndex: 0,
        }}
      ></motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }} // faster
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg max-w-4xl mx-auto"
        >
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, staggerChildren: 0.15 }, // faster
              },
            }}
            className="contact-info-area mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
                <p className="text-gray-600 dark:text-gray-300 flex items-center">
                  <MapPin className="text-gray-800 dark:text-gray-200 mr-2" size={20} />
                  123 Hiring Lane, Tech City, WA
                </p>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
                <p className="text-gray-600 dark:text-gray-300 flex items-center">
                  <Mail className="text-gray-800 dark:text-gray-200 mr-2" size={20} />
                  <a href="mailto:support@hirewise.com" className="hover:underline">contact@hirewise.ai</a>
                </p>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
                <p className="text-gray-600 dark:text-gray-300 flex items-center">
                  <Phone className="text-gray-800 dark:text-gray-200 mr-2" size={20} />
                  <a href="callto:+18001234567" className="hover:underline">+1 (800) 123-4567</a>
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side Image */}
          <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="md:w-1/3 flex justify-center md:justify-start"
                >
                  <div
                    className="
                      bg-gray-100 dark:bg-gray-800 
                      h-40 w-40 md:w-full md:h-full 
                      rounded-full md:rounded-lg 
                      overflow-hidden shadow-lg
                    "
                    style={{
                      backgroundImage: `url(/contact-page.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </motion.div>

            {/* Right Side Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }} // faster
              viewport={{ once: true }}
              className="md:w-2/3"
            >
              <div className="contact-form">
                <h3 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
                  Contact Us
                </h3>
                <p className="text-left text-gray-600 dark:text-gray-400 mb-6">
                  Connect with us to streamline your hiring process or explore job opportunities.
                </p>

                <ContactForm />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
