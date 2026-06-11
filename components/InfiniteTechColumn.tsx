import React from 'react';

export interface TechItem {
  name: string;
  icon: string | React.ReactNode;
  color: string;
  bgClass?: string;
}

interface InfiniteTechColumnProps {
  items: TechItem[];
  direction: 'up' | 'down';
  duration?: number;
  className?: string;
}

export const InfiniteTechColumn: React.FC<InfiniteTechColumnProps> = ({
  items,
  direction,
  duration = 20,
  className = '',
}) => {
  // Duplicate items once to create a seamless infinite loop (0% to -50% translation)
  const duplicatedItems = [...items, ...items];

  const animationClass = direction === 'up' ? 'animate-marquee-up' : 'animate-marquee-down';

  return (
    <div className={`overflow-hidden h-full flex flex-col ${className}`}>
      <div
        className={`flex flex-col gap-4 py-2 ${animationClass} hover:[animation-play-state:paused] cursor-pointer`}
        style={{
          '--duration': `${duration}s`,
        } as React.CSSProperties}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex flex-col items-center justify-center p-4 rounded-[20px] border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.06] hover:border-white/15 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 group hover:scale-[1.05]"
          >
            {/* Icon Box */}
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 mb-2.5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              {typeof item.icon === 'string' ? (
                <i className={`${item.icon} text-2xl ${item.color} transition-colors`} />
              ) : (
                item.icon
              )}
            </div>
            {/* Name */}
            <span className="text-[11px] font-bold tracking-wider text-gray-400 group-hover:text-white transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteTechColumn;
