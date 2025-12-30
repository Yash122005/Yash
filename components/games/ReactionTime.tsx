
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const ReactionTime: React.FC = () => {
  const [state, setState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const startTest = () => {
    setState('waiting');
    const delay = Math.floor(Math.random() * 3000) + 2000;
    timeoutRef.current = window.setTimeout(() => {
      setState('ready');
      setStartTime(performance.now());
    }, delay);
  };

  const handleClick = () => {
    if (state === 'waiting') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setState('idle');
      alert('Too early! Wait for the green screen.');
    } else if (state === 'ready') {
      const endTime = performance.now();
      setReactionTime(Math.floor(endTime - startTime));
      setState('result');
    } else if (state === 'idle' || state === 'result') {
      startTest();
    }
  };

  return (
    <div className="flex flex-col items-center h-full">
      <h2 className="text-3xl font-black mb-8">Reaction Time</h2>

      <motion.button
        onClick={handleClick}
        animate={{ 
          backgroundColor: 
            state === 'waiting' ? 'rgba(239, 68, 68, 0.2)' : 
            state === 'ready' ? 'rgba(34, 197, 94, 0.5)' : 
            'rgba(255, 255, 255, 0.05)' 
        }}
        className={`w-full aspect-video rounded-3xl border border-white/10 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 group relative overflow-hidden`}
      >
        {state === 'idle' && (
          <div className="text-center p-8">
            <i className="fa-solid fa-bolt text-5xl mb-6 text-yellow-400 group-hover:scale-110 transition-transform"></i>
            <h3 className="text-2xl font-bold mb-2">Wait for Green</h3>
            <p className="text-gray-400">Click anywhere to start</p>
          </div>
        )}

        {state === 'waiting' && (
          <div className="text-center p-8">
            <h3 className="text-3xl font-black animate-pulse">Wait...</h3>
          </div>
        )}

        {state === 'ready' && (
          <div className="text-center p-8">
            <h3 className="text-5xl font-black text-white">CLICK NOW!</h3>
          </div>
        )}

        {state === 'result' && (
          <div className="text-center p-8">
            <div className="text-6xl font-black text-blue-400 mb-4">{reactionTime}ms</div>
            <h3 className="text-2xl font-bold mb-6">Your Reaction Time</h3>
            <p className="text-gray-400">Click to try again</p>
          </div>
        )}
      </motion.button>

      <div className="mt-12 text-center text-sm text-gray-500 max-w-sm">
        <p>Average human reaction time is ~250ms. Can you beat it?</p>
      </div>
    </div>
  );
};

export default ReactionTime;
