
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import ContactTerminal from '../components/ContactTerminal';
import TechStackSection from '../components/TechStackSection';


const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      <Hero />

      <AboutSection />

      {/* Tech Stack Section (Redesigned) */}
      <TechStackSection />


      {/* Projects Grid */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
            <p className="text-gray-500">A selection of my recent projects and contributions.</p>
          </div>
          <a
            href="https://github.com/Yash122005"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 group"
          >
            View all on GitHub
            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Terminal Section */}
      <ContactTerminal />
    </motion.div>
  );
};

export default Home;
