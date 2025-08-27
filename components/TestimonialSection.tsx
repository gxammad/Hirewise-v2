"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Star } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      text: "Hirewise’s AI shortlisting saved us weeks of manual work.",
      author: "Jane Doe, HR Manager, Microsoft",
      image: "/testi-author-1.jpg",
      rating: 5,
      companyLogo: "/logos/microsoft.png",
      companyUrl: "https://www.microsoft.com",
      companyName: "Microsoft",
    },
    {
      text: "The interview scheduler is a game-changer for our team.",
      author: "John Smith, Recruiter, Spotify",
      image: "/testi-author-3.jpg",
      rating: 4.5,
      companyLogo: "/logos/spotify.png",
      companyUrl: "https://www.spotify.com",
      companyName: "Spotify",
    },
    {
      text: "Incredible insights that improved our hiring process.",
      author: "Emily Johnson, Talent Lead, Stripe",
      image: "/team-four-4.jpg",
      rating: 5,
      companyLogo: "/logos/stripe.png",
      companyUrl: "https://stripe.com",
      companyName: "Stripe",
    },
    {
      text: "Seamless tracking from application to offer.",
      author: "Michael Brown, HR Director, Netflix",
      image: "/testi-author-4.jpg",
      rating: 4,
      companyLogo: "/logos/net1.png",
      companyUrl: "https://www.netflix.com",
      companyName: "Netflix",
    },
  ];

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scrollY = useSpring(rawY, { stiffness: 100, damping: 20 });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-5 h-5 text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      );
    }
    while (stars.length < 5) {
      stars.push(<Star key={`empty-${stars.length}`} className="w-5 h-5 text-gray-400" />);
    }
    return stars;
  };

  return (
    <section
      id="testimonials"
      className="py-20 px-4 md:px-12 bg-transparent"
      ref={targetRef}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          Loved by{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Top Teams
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12">
          See why HR leaders and recruiters choose HireWise to power their hiring.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              style={{ y: scrollY }}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl border flex flex-col items-center text-center
                         transition-shadow duration-300
                         bg-transparent border-gray-800 text-gray-800
                         dark:bg-transparent dark:border-gray-200 dark:text-gray-200
                         shadow-md hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] cursor-pointer"
            >
              {/* 👤 Author image with clickable company badge */}
              <div className="relative flex items-center justify-center mb-4">
                <motion.div
                  className="relative w-[90px] h-[90px] rounded-full overflow-hidden 
                             border-2 border-blue-500 shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover rounded-full"
                  />
                </motion.div>

                {testimonial.companyLogo && (
                  <a
                    href={testimonial.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute -right-6 w-10 h-10 rounded-full bg-white border shadow-md 
                               flex items-center justify-center z-20 group"
                  >
                    <Image
                      src={testimonial.companyLogo}
                      alt={`${testimonial.companyName} Logo`}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    {/* Tooltip */}
                    <span className="absolute bottom-full mb-2 px-2 py-1 text-xs rounded-md 
                                     bg-gray-900 text-white opacity-0 group-hover:opacity-100 
                                     transition-opacity whitespace-nowrap">
                      Visit {testimonial.companyName}
                    </span>
                  </a>
                )}
              </div>

              {/* Author name */}
              <p className="font-semibold mb-3">{testimonial.author}</p>

              {/* Quote text */}
              <p className="italic mb-4 text-gray-800 dark:text-gray-200">
                &quot;{testimonial.text}&quot;
              </p>

              {/* ⭐ Ratings with number */}
              <div className="flex items-center justify-center gap-2">
                <div className="flex gap-1">{renderStars(testimonial.rating)}</div>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {testimonial.rating} / 5
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
