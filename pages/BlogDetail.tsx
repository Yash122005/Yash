
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs } from '../data/blogs';

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === id);

  if (!blog) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">Post not found</h1>
      <Link to="/blog" className="text-blue-400 hover:underline">Back to blog</Link>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-6 py-20"
    >
      <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 font-medium">
        <i className="fa-solid fa-arrow-left"></i>
        Back to blog
      </Link>

      <header className="mb-12">
        <div className="flex gap-4 items-center mb-6">
          <span className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-widest ${
            blog.category === 'technical' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
          }`}>
            {blog.category}
          </span>
          <span className="text-gray-500 text-sm font-medium">{blog.date}</span>
          <span className="text-gray-500 text-sm font-medium">• {blog.readTime}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{blog.title}</h1>
        <img src={blog.image} alt={blog.title} className="w-full aspect-video object-cover rounded-3xl shadow-2xl mb-12" />
      </header>

      <div className="prose prose-invert prose-lg max-w-none">
        <div className="text-gray-300 leading-relaxed space-y-6">
          {/* Simulation of markdown rendering */}
          {blog.content.split('\n').map((line, i) => {
            if (line.trim().startsWith('##')) {
              return <h2 key={i} className="text-3xl font-bold text-white mt-12 mb-6">{line.replace('##', '').trim()}</h2>;
            }
            if (line.trim().startsWith('###')) {
              return <h3 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('###', '').trim()}</h3>;
            }
            if (line.trim().startsWith('-')) {
              return <li key={i} className="ml-6 mb-2">{line.replace('-', '').trim()}</li>;
            }
            if (line.trim() === '') return <br key={i} />;
            return <p key={i}>{line.trim()}</p>;
          })}
        </div>
      </div>

      <footer className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800">
            <img src="https://picsum.photos/seed/yash/100/100" alt="Yash" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-bold">Yash</div>
            <div className="text-sm text-gray-500">Web Developer & Creator</div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 transition-all">
            <i className="fa-brands fa-twitter text-xl"></i>
          </a>
          <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 transition-all">
            <i className="fa-brands fa-linkedin text-xl"></i>
          </a>
        </div>
      </footer>
    </motion.div>
  );
};

export default BlogDetail;
