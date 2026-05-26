import React from "react";
import { motion } from "framer-motion";
import FloatingBadge from "./FloatingBadge";
import ParallaxImage from "./ParallaxImage";

const PROFILE_IMAGE =
  "https://imgs.search.brave.com/BKW0rgl4FSiX-_yXyoRKc8Stixv9MUM-LMJsGvGzgc4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS1zdGF0aWMuY29s/bGVnZWR1bmlhLmNv/bS9wdWJsaWMvcmV2/aWV3UGhvdG9zLzEx/MjYyNjMvSU1HLTIw/MjUwNjExLVdBMDA2/MC5qcGc";

const RESUME_URL =
  "https://drive.google.com/file/d/1WZaYpbm0SQVhPN-S4k4ihizEh8WqHaxi/view?usp=sharing";

const AboutSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl border-t border-white/5 px-6 py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">About Me</h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-400">
            I&apos;m a passionate full-stack developer who loves turning ideas
            into fast, polished web experiences—from responsive interfaces to
            reliable APIs and everything in between.
          </p>
          <p className="text-lg leading-relaxed text-gray-400">
            My journey in tech is driven by clean code, thoughtful UX, and
            solving real problems. I focus on building accessible, performant
            products with precision and creativity.
          </p>
          <motion.a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Resume
            <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <ParallaxImage src={PROFILE_IMAGE} alt="Profile" />

          <FloatingBadge
            title="10+"
            subtitle="Projects Built"
            titleClassName="text-purple-400"
            className="absolute -right-4 -top-4 z-10 md:-right-6 md:-top-6"
          />
          <FloatingBadge
            title="1+"
            subtitle="Years Experience"
            titleClassName="text-blue-400"
            className="absolute -bottom-4 -left-4 z-10 md:-bottom-6 md:-left-6"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
