
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const Home: React.FC = () => {
  const skills = [
    { name: 'React', icon: 'fa-brands fa-react', color: 'text-blue-400' },
    { name: 'JavaScript', icon: 'fa-brands fa-js', color: 'text-yellow-400' },
    { name: 'Tailwind CSS', icon: 'fa-solid fa-wind', color: 'text-cyan-400' },
    { name: 'TypeScript', icon: 'fa-brands fa-js-square', color: 'text-blue-600' },
    { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'text-green-500' },
    { name: 'C++', icon: 'fa-solid fa-code', color: 'text-blue-600' },
    { name: 'C', icon: 'fa-solid fa-c', color: 'text-blue-600' },
    { name: 'HTML5', icon: 'fa-brands fa-html5', color: 'text-orange-500' },
    { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: 'text-blue-500' },
    { name: 'Express.js', icon: 'fa-solid  fa-link', color: 'text-white' },
    { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap', color: 'text-blue-500' },
    { name: 'Git', icon: 'fa-brands fa-git', color: 'text-red-500' },
    { name: 'MongoDB', icon: 'fa-solid fa-database', color: 'text-green-800' },
    { name: 'Supabase', icon: 'fa-solid fa-bolt', color: 'text-green-800' },
    { name: 'Figma', icon: 'fa-brands fa-figma', color: 'text-red-400' },
    { name: 'Postman', icon: 'fas  fa-envelope', color: 'text-orange-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      <Hero />

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">About Me</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
             I'm a passionate Full-stack web Developer currently pursuing a Bachelor of Technology in Electronics and Communication Engineering at Birla Institute of Technology, Mesra, Ranchi.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              My journey in tech is driven by a love for creating clean, responsive, and accessible web interfaces. I believe in crafting code with precision and creativity, always focusing on solving real problems through thoughtful development.
            </p>
            <motion.a
                        href="https://drive.google.com/file/d/1oA254pXBMYTogFm1ZYdSkf8RVTZFIWPi/view?usp=sharing"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] mt-8 inline-block"
                      >
                        RESUME
                        <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"></i>
                      </motion.a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img src="https://picsum.photos/seed/yash/800/800" alt="Yash Profile" className="w-full h-full object-cover" />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl shadow-2xl">
              <div className="text-3xl font-black text-blue-400">1+</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Years Experience</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl shadow-2xl">
              <div className="text-3xl font-black text-purple-400">10+</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Projects Built</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Tech Stack</h2>
          <p className="text-gray-500">The tools and technologies I use to bring ideas to life.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
              className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col items-center gap-4 group transition-colors"
            >
              <i className={`${skill.icon} text-4xl ${skill.color} group-hover:scale-110 transition-transform`}></i>
              <span className="font-bold text-gray-300 group-hover:text-white">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

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

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-12 md:p-20 rounded-[40px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Have a project in mind?</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Let's collaborate and create something amazing together. Reach out via email or any of my social platforms.
          </p>
          <motion.a
            href="mailto:yashvinodgupta6@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-black text-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow"
          >
            Start a Conversation
            <i className="fa-solid fa-paper-plane text-lg"></i>
          </motion.a>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
