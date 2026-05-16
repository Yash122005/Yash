import { useContext, useRef, useEffect } from 'react';
import { Howl, HowlOptions } from 'howler';
import { AudioContext } from '../context/AudioContext';

export const useAudio = () => {
  const { isMuted, toggleMute } = useContext(AudioContext);
  
  // Cache Howl instances to prevent recreating them
  const soundsRef = useRef<Record<string, Howl>>({});

  const play = (soundId: string, src: string, options: Partial<HowlOptions> = {}) => {
    if (isMuted) return null;

    if (!soundsRef.current[soundId]) {
      soundsRef.current[soundId] = new Howl({ src: [src], ...options });
    }
    
    // Update mute state on the howl object just in case
    soundsRef.current[soundId].mute(isMuted);

    const id = soundsRef.current[soundId].play();
    return { howl: soundsRef.current[soundId], id };
  };

  const stop = (soundId: string) => {
    if (soundsRef.current[soundId]) {
      soundsRef.current[soundId].stop();
    }
  };

  // When mute state changes, update all instantiated sounds
  useEffect(() => {
    Object.values(soundsRef.current).forEach(howl => {
      howl.mute(isMuted);
    });
  }, [isMuted]);

  return { play, stop, isMuted, toggleMute };
};
