
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

const Blog: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'technical' | 'personal'>('all');

  const filteredBlogs = blogs.filter(blog => 
    filter === 'all' || blog.category === filter
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-20"
    >
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-6">The Blog</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Insights, tutorials, and reflections on code, technology, and the developer lifestyle.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-4 mb-16">
        {['all', 'technical', 'personal'].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category as any)}
            className={`px-6 py-2 rounded-full text-sm font-bold capitalize transition-all ${
              filter === category 
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredBlogs.map((blog, index) => (
            <motion.div
              layout
              key={blog.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link to={`/blog/${blog.id}`} className="group block h-full">
                <article className="h-full rounded-2xl bg-[#0a0a0a] border border-white/5 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-widest ${
                        blog.category === 'technical' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                      }`}>
                        {blog.category}
                      </span>
                      <span className="text-xs text-gray-500">{blog.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                      {blog.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                      <span>{blog.readTime}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-700" />
                      <span className="group-hover:text-blue-400 transition-colors">Read Article</span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredBlogs.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          No posts found in this category. Check back later!
        </div>
      )}
    </motion.div>
  );
};

export default Blog;
