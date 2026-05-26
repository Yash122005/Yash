import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-square w-full overflow-hidden rounded-3xl ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y, height: "120%" }}
        className="absolute left-0 top-[-10%] w-full object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
      />
    </div>
  );
};

export default ParallaxImage;
