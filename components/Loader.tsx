import React, { useState, useEffect } from 'react';

interface LoaderProps {
  children: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    // We want to simulate a loading sequence from 0 to 100.
    // The sequence takes about 2 to 3 seconds.
    const duration = 2400; // 2.4 seconds total duration
    const stepTime = 30; // interval update step in ms
    const totalSteps = duration / stepTime;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      
      // Calculate progress with a slight easing effect (slows down towards the end)
      // progress = 100 * (1 - (1 - step/totalSteps)^2) or similar
      const ratio = currentStep / totalSteps;
      const easedProgress = Math.min(100, Math.round(100 * (1 - Math.pow(1 - ratio, 2.5))));
      
      setProgress(easedProgress);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setProgress(100);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // 1. Once it hits 100%, wait for a brief delay (500ms)
      const delayTimeout = setTimeout(() => {
        setIsFadingOut(true);

        // 2. Smoothly fade out the entire loading screen (600ms transition)
        const fadeTimeout = setTimeout(() => {
          setIsLoadingComplete(true);
        }, 600);

        return () => clearTimeout(fadeTimeout);
      }, 500);

      return () => clearTimeout(delayTimeout);
    }
  }, [progress]);

  // If loading and fade out are fully complete, render the main content
  if (isLoadingComplete) {
    return <>{children}</>;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Sleek, Modern, Minimalist Container */}
      <div className="flex flex-col items-center select-none">
        {/* Logo Container */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Subtle slow spinning ambient outer ring to make it feel alive */}
          <div className="absolute w-24 h-24 rounded-full border border-white/[0.03] animate-[spin_20s_linear_infinite]" />
          
          <svg
            className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-transform duration-500 hover:scale-105"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="glow-y" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Outer Hexagon Frame */}
            <path
              d="M50 15 L80 32.3 V67.7 L50 85 L20 67.7 V32.3 Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className="opacity-20"
            />
            
            {/* Minimalist 'Y' Icon inside Hexagon */}
            <path
              d="M35 35 L50 50 L65 35"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow-y)"
            />
            <path
              d="M50 50 V70"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow-y)"
            />
          </svg>
        </div>

        {/* Progress Bar Container */}
        <div className="w-48 h-[2px] bg-neutral-800/80 rounded-full overflow-hidden mb-3 relative">
          <div
            className="h-full bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Text */}
        <span className="font-mono text-xs font-bold tracking-widest text-neutral-400">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default Loader;
