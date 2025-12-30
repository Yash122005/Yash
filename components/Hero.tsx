
import React from 'react';
import { motion } from 'framer-motion';

const Spotlight = () => (
  <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.1),transparent_50%)]" />
    <motion.div 
      animate={{
        opacity: [0.1, 0.15, 0.1],
      }}
      transition={{ duration: 5, repeat: Infinity }}
      className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%)]" 
    />
  </div>
);

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center items-center px-6 overflow-hidden">
      <Spotlight />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Available for new projects
        </motion.div>
        
        <h1 className="text-6xl md:text-[120px] font-black mb-6 tracking-tighter leading-[0.85] text-white">
          YASH <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-400 to-blue-700">
            GUPTA
          </span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl mb-12 font-medium leading-relaxed"
        >
          A Creative Developer pushing the boundaries of the modern web with high-performance animations and seamless user experiences.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Explore Projects
            <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"></i>
          </motion.a>
          
          <motion.a
            href="mailto:yash122005@gmail.com"
            whileHover={{ scale: 1.02, y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-black text-sm tracking-widest uppercase transition-all"
          >
            Contact Me
            <i className="fa-solid fa-paper-plane text-xs"></i>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Modern Mouse Cursor Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-blue-500/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
