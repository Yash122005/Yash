import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactElement;
  range?: number; // Radial threshold for attraction (px)
  strength?: number; // Strength factor of the magnetic pull
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  range = 80,
  strength = 0.35,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Underlying motion values for mouse-relative positions
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring physics configurations to make the movements smooth and elastic
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Compute the center coordinates of the button
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate distance vector from pointer to the center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Calculate absolute distance
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range) {
      setIsHovered(true);
      // Pulled towards the pointer offset, scaled by strength
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      setIsHovered(false);
      // Reset back to center
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className="inline-block cursor-pointer z-10"
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
