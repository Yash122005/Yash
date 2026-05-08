
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs } from '../data/blogs';

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">Post not found</h1>
      <Link to="/blog" className="text-blue-400 hover:underline">Back to blog</Link>
    </div>
  );

  // Parse content into structured sections
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactElement[] = [];
    let listItems: React.ReactElement[] = [];
    let paragraphBuffer: string[] = [];

    const flushParagraph = () => {
      if (paragraphBuffer.length > 0) {
        const text = paragraphBuffer.join(' ').trim();
        if (text) {
          elements.push(
            <p key={`p-${elements.length}`} className="text-gray-300 text-lg leading-[1.85] mb-6">
              {renderInlineFormatting(text)}
            </p>
          );
        }
        paragraphBuffer = [];
      }
    };

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="space-y-3 mb-8 ml-1">
            {listItems}
          </ul>
        );
        listItems = [];
      }
    };

    const renderInlineFormatting = (text: string): React.ReactNode => {
      // Handle **bold** formatting
      const parts = text.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
        }
        // Handle *italic* formatting
        const italicParts = part.split(/(\*[^*]+\*)/g);
        return italicParts.map((ip, j) => {
          if (ip.startsWith('*') && ip.endsWith('*') && !ip.startsWith('**')) {
            return <em key={`${i}-${j}`} className="italic text-gray-200">{ip.slice(1, -1)}</em>;
          }
          return ip;
        });
      });
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Horizontal rule
      if (trimmed === '---') {
        flushParagraph();
        flushList();
        elements.push(
          <div key={`hr-${i}`} className="my-12 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/10" />
          </div>
        );
        continue;
      }

      // H2 headers
      if (trimmed.startsWith('## ')) {
        flushParagraph();
        flushList();
        const headerText = trimmed.replace('## ', '');
        elements.push(
          <motion.h2
            key={`h2-${i}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-black text-white mt-14 mb-6 flex items-center gap-3"
          >
            <span className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-500 to-purple-500 flex-shrink-0" />
            {headerText}
          </motion.h2>
        );
        continue;
      }

      // H3 headers
      if (trimmed.startsWith('### ')) {
        flushParagraph();
        flushList();
        const headerText = trimmed.replace('### ', '');
        elements.push(
          <h3 key={`h3-${i}`} className="text-xl md:text-2xl font-bold text-white mt-10 mb-4">
            {headerText}
          </h3>
        );
        continue;
      }

      // Numbered list items
      if (/^\d+\.\s/.test(trimmed)) {
        flushParagraph();
        const listText = trimmed.replace(/^\d+\.\s/, '');
        listItems.push(
          <li key={`li-${i}`} className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold mt-0.5">
              {trimmed.match(/^(\d+)\./)?.[1]}
            </span>
            <span className="text-gray-300 text-lg leading-relaxed">
              {renderInlineFormatting(listText)}
            </span>
          </li>
        );
        continue;
      }

      // Bullet list items
      if (trimmed.startsWith('- ')) {
        flushParagraph();
        const listText = trimmed.replace('- ', '');
        listItems.push(
          <li key={`li-${i}`} className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400 mt-3" />
            <span className="text-gray-300 text-lg leading-relaxed">
              {renderInlineFormatting(listText)}
            </span>
          </li>
        );
        continue;
      }

      // Empty line
      if (trimmed === '') {
        flushParagraph();
        flushList();
        continue;
      }

      // Regular text — accumulate into paragraph
      paragraphBuffer.push(trimmed);
    }

    flushParagraph();
    flushList();

    return elements;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="relative w-full">
        {/* Hero Image */}
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] max-h-[500px] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/40 to-transparent" />
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-12 md:pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 font-medium text-sm group"
              >
                <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>
                Back to blog
              </Link>
            </motion.div>

            {/* Badges & Meta */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-wrap gap-3 items-center mb-5"
            >
              {blog.featured && (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/20">
                  <span>🏆</span>
                  Hackathon Winner
                </span>
              )}
              <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest ${
                blog.category === 'technical' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
              }`}>
                {blog.category}
              </span>
              <span className="text-gray-400 text-sm font-medium">{blog.date}</span>
              <span className="text-gray-400 text-sm font-medium flex items-center gap-1">
                <i className="fa-regular fa-clock text-[10px]"></i>
                {blog.readTime}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] max-w-3xl"
            >
              {blog.title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">

        {/* Tags Bar */}
        {blog.tags && blog.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-white/5"
          >
            {blog.tags.map(tag => (
              <span
                key={tag}
                className="px-4 py-1.5 text-xs font-semibold rounded-full bg-white/5 text-gray-400 border border-white/5 hover:border-blue-500/30 hover:text-blue-400 transition-all"
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Excerpt / Lead */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 font-light italic border-l-2 border-blue-500/40 pl-6">
            {blog.excerpt}
          </p>
        </motion.div>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="prose-custom"
        >
          {renderContent(blog.content)}
        </motion.div>

        {/* Project Link CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Check out InterviewIQ</h3>
              <p className="text-gray-400 text-sm">See the hackathon-winning project in action — live demo and source code available.</p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://ai-interviewer-ayqc.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-bold hover:bg-blue-400 transition-colors"
              >
                <i className="fa-solid fa-rocket text-xs"></i>
                Live Demo
              </a>
              <a
                href="https://github.com/Yash122005/AI_INTERVIEWER"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
              >
                <i className="fa-brands fa-github text-xs"></i>
                Source Code
              </a>
            </div>
          </div>
        </motion.div>

        {/* Author Footer */}
        <footer className="mt-20 pt-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 p-0.5">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0a]">
                  <img
                    src="https://imgs.search.brave.com/BKW0rgl4FSiX-_yXyoRKc8Stixv9MUM-LMJsGvGzgc4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS1zdGF0aWMuY29s/bGVnZWR1bmlhLmNv/bS9wdWJsaWMvcmV2/aWV3UGhvdG9zLzEx/MjYyNjMvSU1HLTIw/MjUwNjExLVdBMDA2/MC5qcGc"
                    alt="Yash Gupta"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold text-lg">Yash Gupta</div>
                <div className="text-sm text-gray-500">Full-Stack Developer • BIT Mesra</div>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/yash-gupta-8a8594283/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 text-gray-400 transition-all border border-white/5 hover:border-blue-500/20"
              >
                <i className="fa-brands fa-linkedin text-lg"></i>
              </a>
              <a
                href="https://github.com/Yash122005"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 transition-all border border-white/5 hover:border-white/20"
              >
                <i className="fa-brands fa-github text-lg"></i>
              </a>
              <a
                href="mailto:yashvinodgupta6@gmail.com"
                className="p-3 rounded-xl bg-white/5 hover:bg-purple-500/20 hover:text-purple-400 text-gray-400 transition-all border border-white/5 hover:border-purple-500/20"
              >
                <i className="fa-solid fa-envelope text-lg"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

export default BlogDetail;
