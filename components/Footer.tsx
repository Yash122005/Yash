
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const socials = [
    { name: 'GitHub', icon: 'fa-brands fa-github', url: 'https://github.com/Yash122005' },
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: 'https://www.linkedin.com/in/yash-gupta-8a8594283/' },
    { name: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://www.linkedin.com/in/yash-gupta-8a8594283/' },
    { name: 'Email', icon: 'fa-solid fa-envelope', url: 'mailto:yash122005@gmail.com' },
  ];

  return (
    <footer className="relative z-10 py-16 px-6 border-t border-white/5 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <Link to="/" className="text-3xl font-black tracking-tighter mb-4 inline-block">
            YASH<span className="text-blue-500">.</span>
          </Link>
          <p className="text-gray-500 max-w-xs leading-relaxed">
            Building the web of tomorrow with passion, precision, and modern tools.
          </p>
        </div>

        <div className="flex gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors text-2xl"
              title={social.name}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>

        <div className="text-center md:text-right">
          <div className="text-sm font-bold text-gray-400 mb-2">Quick Links</div>
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <Link to="/" className="text-gray-500 hover:text-white text-sm transition-colors">Home</Link>
            <Link to="/blog" className="text-gray-500 hover:text-white text-sm transition-colors">Blog</Link>
            <Link to="/games" className="text-gray-500 hover:text-white text-sm transition-colors">Games</Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-600 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} Yash. All rights reserved.</p>
        <p>Built with React & Framer Motion</p>
      </div>
    </footer>
  );
};

export default Footer;
