import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export interface FloatingBadgeProps {
  title: string;
  subtitle: string;
  className?: string;
  titleClassName?: string;
}

const springConfig = { damping: 20, stiffness: 200, mass: 0.4 };

const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  title,
  subtitle,
  className = "",
  titleClassName = "text-blue-400",
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className={`perspective-[1000px] ${className}`}>
      <motion.div
        ref={badgeRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="cursor-default select-none rounded-2xl border border-white/10 bg-[#0a0a0a]/80 px-6 py-5 shadow-2xl shadow-black/50 backdrop-blur-md"
      >
        <div className={`text-3xl font-black tracking-tight ${titleClassName}`}>
          {title}
        </div>
        <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          {subtitle}
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingBadge;
