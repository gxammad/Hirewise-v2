"use client";
import React from "react";
import { motion } from "framer-motion";

const Map = () => {
  return (
    <section className="contact-page-map py-20">
      <div className="container mx-auto px-4">
        {/* Heading with animation */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          📍 Find Us
        </motion.h2>

        {/* Map container with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d136834.1519573059!2d-74.0154445224086!3d40.7260256534837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1639991650837!5m2!1sen!2sbd"
            height="450"
            style={{ border: 0, width: "100%" }}
            allowFullScreen={true}
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Map;
