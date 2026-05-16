import React, { createContext, useState, useEffect } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
}

export const AudioContext = createContext<AudioContextType>({
  isMuted: false,
  toggleMute: () => {},
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Optionally save to local storage
    const savedMute = localStorage.getItem('isMuted');
    if (savedMute) {
      setIsMuted(savedMute === 'true');
    }
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newVal = !prev;
      localStorage.setItem('isMuted', String(newVal));
      return newVal;
    });
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};
