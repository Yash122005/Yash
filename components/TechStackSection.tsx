import React from 'react';
import { motion } from 'framer-motion';
import InfiniteTechColumn, { TechItem } from './InfiniteTechColumn';

// Custom SVGs and styled elements for a premium feel

const NextIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 15.5L12 11V17.5H10.5V9.5h1.25l4.25 6V9.5H17.5v8z" />
  </svg>
);

const TSIcon = () => (
  <div className="w-6 h-6 bg-[#3178c6] rounded flex items-center justify-center text-white font-extrabold text-[9px] tracking-tighter select-none leading-none shadow-sm">
    TS
  </div>
);

const JSIcon = () => (
  <div className="w-6 h-6 bg-[#f7df1e] rounded flex items-center justify-center text-black font-extrabold text-[9px] tracking-tighter select-none leading-none shadow-sm">
    JS
  </div>
);

const ExpressIcon = () => (
  <span className="text-white font-heading font-black text-[13px] tracking-tighter select-none italic">
    ex
  </span>
);

const CppIcon = () => (
  <div className="w-6 h-6 bg-blue-600/10 border border-blue-500/20 rounded flex items-center justify-center text-blue-400 font-extrabold text-[9px] tracking-tight">
    C++
  </div>
);

const CIcon = () => (
  <div className="w-6 h-6 bg-blue-500/10 border border-blue-400/20 rounded flex items-center justify-center text-blue-400 font-extrabold text-[9px]">
    C
  </div>
);

export const TechStackSection: React.FC = () => {
  // Column 1: Next.js, TypeScript, JavaScript, Node.js, React
  const column1: TechItem[] = [
    { name: 'Next.js', icon: <NextIcon />, color: 'text-white' },
    { name: 'TypeScript', icon: <TSIcon />, color: 'text-[#3178c6]' },
    { name: 'JavaScript', icon: <JSIcon />, color: 'text-[#f7df1e]' },
    { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'text-green-500' },
    { name: 'React', icon: 'fa-brands fa-react', color: 'text-blue-400' },
  ];

  // Column 2: Express.js, Tailwind CSS, HTML5, CSS3, Bootstrap
  const column2: TechItem[] = [
    { name: 'Express.js', icon: <ExpressIcon />, color: 'text-white' },
    { name: 'Tailwind CSS', icon: 'fa-solid fa-wind', color: 'text-cyan-400' },
    { name: 'HTML5', icon: 'fa-brands fa-html5', color: 'text-orange-500' },
    { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: 'text-blue-500' },
    { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap', color: 'text-purple-500' },
  ];

  // Column 3: Git, Docker, MongoDB, Supabase, Redux Toolkit
  const column3: TechItem[] = [
    { name: 'Git', icon: 'fa-brands fa-git-alt', color: 'text-red-500' },
    { name: 'Docker', icon: 'fa-brands fa-docker', color: 'text-blue-500' },
    { name: 'MongoDB', icon: 'fa-solid fa-database', color: 'text-green-600' },
    { name: 'Supabase', icon: 'fa-solid fa-bolt', color: 'text-emerald-400' },
    { name: 'Redux Toolkit', icon: 'fa-solid fa-cubes', color: 'text-purple-400' },
  ];

  // Column 4: Postman, C++, C, Figma, React (Repeated to balance)
  const column4: TechItem[] = [
    { name: 'Postman', icon: 'fa-solid fa-rocket', color: 'text-orange-500' },
    { name: 'C++', icon: <CppIcon />, color: 'text-blue-600' },
    { name: 'C', icon: <CIcon />, color: 'text-blue-500' },
    { name: 'Figma', icon: 'fa-brands fa-figma', color: 'text-pink-400' },
    { name: 'React', icon: 'fa-brands fa-react', color: 'text-blue-400 animate-spin-slow' },
  ];

  const marqueeStyles = `
    @keyframes scroll-up {
      0% { transform: translateY(0); }
      100% { transform: translateY(-50%); }
    }
    @keyframes scroll-down {
      0% { transform: translateY(-50%); }
      100% { transform: translateY(0); }
    }
    .animate-marquee-up {
      animation: scroll-up var(--duration, 20s) linear infinite;
    }
    .animate-marquee-down {
      animation: scroll-down var(--duration, 20s) linear infinite;
    }
    .tech-mask {
      mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
      -webkit-mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
    }
    .animate-spin-slow {
      animation: spin 8s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @media (max-width: 768px) {
      .animate-marquee-up, .animate-marquee-down {
        animation-duration: calc(var(--duration, 20s) * 1.5) !important;
      }
    }
  `;

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 relative overflow-hidden">
      {/* Injected style tag for pure-CSS infinite scrolling marquee */}
      <style>{marqueeStyles}</style>

      {/* Background radial spotlight behind the tech stack section */}
      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/[0.02] rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-start"
        >
          {/* Tech Stack Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-gray-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-inner">
            <span className="text-[10px] text-blue-400">✦</span> Tech Stack
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter leading-[1.05] text-white">
            Key Technologies <br />
            <span className="text-gray-400/80 italic font-heading font-medium tracking-tight bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text text-transparent">
              & Platforms
            </span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            A curated set of modern tools I use to build fast, scalable, and production-ready applications.
          </p>
        </motion.div>

        {/* Right Side Scrolling Columns */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          {/* Glass Container enclosing columns */}
          <div className="relative rounded-3xl border border-white/5 bg-[#09090b]/40 backdrop-blur-xl p-6 md:p-8 h-[480px] overflow-hidden tech-mask shadow-2xl">
            {/* The columns layout grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full relative z-10">
              {/* Column 1: Upward */}
              <InfiniteTechColumn
                items={column1}
                direction="up"
                duration={18}
                className="flex"
              />

              {/* Column 2: Downward */}
              <InfiniteTechColumn
                items={column2}
                direction="down"
                duration={22}
                className="flex"
              />

              {/* Column 3: Upward - Hidden on mobile */}
              <InfiniteTechColumn
                items={column3}
                direction="up"
                duration={20}
                className="hidden md:flex"
              />

              {/* Column 4: Downward - Hidden on tablet/mobile */}
              <InfiniteTechColumn
                items={column4}
                direction="down"
                duration={24}
                className="hidden lg:flex"
              />
            </div>

            {/* Extra dark glowing border overlay */}
            <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none z-20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
