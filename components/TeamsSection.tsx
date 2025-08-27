"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "CEO & Founder",
    image: "/team-1.jpg", // replace with actual path
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    name: "Mark Thompson",
    role: "CTO",
    image: "/team-three-1.jpg",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    name: "Sophia Lee",
    role: "Head of Marketing",
    image: "/team-2.jpg",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    name: "David Brown",
    role: "Lead Developer",
    image: "/team-three-2.jpg",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-20 px-4 md:px-12 bg-transparent">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Meet Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Team</span>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-12">
          The passionate minds behind HIREWISE. We strive for excellence and innovation in everything we do.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
           <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center relative hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
              >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{member.role}</p>

              {/* Social Icons with blur background */}
              <div className="flex gap-4 mt-2">
                {[{icon: FaLinkedin, url: member.linkedin},
                  {icon: FaTwitter, url: member.twitter},
                  {icon: FaGithub, url: member.github}].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-700/30
                                 backdrop-blur-md hover:text-gray-800 dark:hover:text-gray-200 text-gray-600 dark:text-gray-300
                                 transition-colors duration-300"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
