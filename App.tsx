
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import MouseFollower from './components/MouseFollower';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Games from './pages/Games';
import Footer from './components/Footer';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/games" element={<Games />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#030303] text-white selection:bg-purple-500/30">
        {/* Custom Mouse Follower */}
        <MouseFollower />
        
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
          style={{ 
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, 
            backgroundSize: '40px 40px' 
          }} 
        />
        <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-[#030303]/50 to-[#030303]" />

        <Navbar />
        
        <main className="relative z-10 pt-20">
          <AnimatedRoutes />
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
