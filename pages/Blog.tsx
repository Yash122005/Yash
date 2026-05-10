
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

const Blog: React.FC = () => {
  const featured = blogs.find(b => b.featured);
  const otherBlogs = blogs.filter(b => !b.featured);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-20"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
          <i className="fa-solid fa-pen-nib"></i>
          Stories & Experiences
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/60">
          The Blog
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Sharing my journey through hackathons, projects, and everything I learn along the way as a developer.
        </p>
      </motion.div>

      {/* Featured Blog Card */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          <Link to={`/blog/${featured.id}`} className="group block">
            <article className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#0d0d1a] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.1)]">

              {/* Featured Badge */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/30">
                  <span className="text-sm">🏆</span>
                  Hackathon Winner
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a] hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:hidden" />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {featured.category}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{featured.date}</span>
                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <i className="fa-regular fa-clock text-[10px]"></i>
                      {featured.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight group-hover:text-blue-400 transition-colors duration-300">
                    {featured.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-base leading-relaxed mb-8">
                    {featured.excerpt}
                  </p>

                  {/* Tags */}
                  {featured.tags && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {featured.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[11px] font-semibold rounded-full bg-white/5 text-gray-400 border border-white/5 hover:border-blue-500/30 hover:text-blue-400 transition-all"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                      Read Full Story
                      <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </motion.div>
      )}

      {/* Other Blog Cards Grid */}
      {otherBlogs.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Link to={`/blog/${blog.id}`} className="group block h-full">
                <article className="h-full rounded-2xl bg-[#0a0a0a] border border-white/5 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {blog.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase">
                          🏆 Winner
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-widest ${blog.category === 'technical' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
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
                    {blog.tags && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {blog.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-white/5 text-gray-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
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
        </div>
      )}

      {/* Empty state */}
      {blogs.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          No posts yet. Check back later!
        </div>
      )}

      {/* Coming Soon Teaser */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-20 text-center"
      >
        <div className="inline-flex flex-col items-center gap-4 p-10 rounded-3xl bg-white/[0.02] border border-white/5">
          <div className="text-4xl">✍️</div>
          <p className="text-gray-500 text-sm font-medium max-w-md">
            More stories coming soon — about open source, building in public, and the journey of a student developer.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Blog;
