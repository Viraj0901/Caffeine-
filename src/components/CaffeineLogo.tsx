import React from 'react';

interface CaffeineLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const CaffeineLogo: React.FC<CaffeineLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false
}) => {
  const iconSize = size === 'sm' ? 20 : size === 'lg' ? 32 : 24;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl font-extrabold' : 'text-xl font-bold';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Brand Icon: Warm Coffee Cup & Steam in Emerald & Amber */}
      <div className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-stone-900 p-2 text-white shadow-sm">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-300"
        >
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" y1="2" x2="6" y2="4" strokeWidth="2" />
          <line x1="10" y1="1" x2="10" y2="4" strokeWidth="2" />
          <line x1="14" y1="2" x2="14" y2="4" strokeWidth="2" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif tracking-tight text-stone-900 ${textSize}`}>
            Caffeine
          </span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
            Marris Rd
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] tracking-widest uppercase font-mono text-stone-500 font-medium">
            Coffee · Culture · Conversation
          </span>
        )}
      </div>
    </div>
  );
};
