import React, { useState } from 'react';
import { MenuItem } from '../types';
import { getDishImageUrl } from '../data/dishImages';

interface DishIllustrationProps {
  item: MenuItem;
  className?: string;
}

export const DishIllustration: React.FC<DishIllustrationProps> = ({ item, className = '' }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageUrl = item.image || getDishImageUrl(item.id, item.name, item.category);

  // Category fallback themes if image cannot be rendered
  const getFallbackTheme = () => {
    switch (item.category) {
      case 'treats-sips':
        return {
          bg: 'from-amber-100 via-orange-50 to-stone-100',
          accent: 'text-amber-800',
          label: 'Specialty Coffee'
        };
      case 'subs-wraps':
        return {
          bg: 'from-emerald-100 via-green-50 to-stone-100',
          accent: 'text-emerald-800',
          label: 'Gourmet Sub & Wrap'
        };
      case 'bowls-salads':
        return {
          bg: 'from-green-100 via-lime-50 to-stone-100',
          accent: 'text-green-800',
          label: 'Fresh Bowl & Salad'
        };
      case 'pizzas-momos':
        return {
          bg: 'from-red-100 via-orange-50 to-stone-100',
          accent: 'text-rose-800',
          label: 'Wood-Fired & Momos'
        };
      case 'nachos-maggie':
        return {
          bg: 'from-yellow-100 via-amber-50 to-stone-100',
          accent: 'text-yellow-800',
          label: 'Loaded Nachos & Maggie'
        };
      case 'shakes-smoothies':
        return {
          bg: 'from-sky-100 via-teal-50 to-stone-100',
          accent: 'text-teal-800',
          label: 'Protein Shake & Smoothie'
        };
      case 'bento-cakes-specials':
        return {
          bg: 'from-pink-100 via-purple-50 to-stone-100',
          accent: 'text-rose-800',
          label: 'Bento Cake & Specials'
        };
      default:
        return {
          bg: 'from-stone-100 via-amber-50 to-stone-100',
          accent: 'text-amber-800',
          label: 'Caffeine Gourmet'
        };
    }
  };

  const fallback = getFallbackTheme();

  return (
    <div
      className={`relative w-full h-48 sm:h-52 overflow-hidden bg-stone-100 border-b border-stone-200/80 group ${className}`}
    >
      {/* 1. Real Dish Photographic Image matching item name */}
      {!imageError && imageUrl && (
        <img
          src={imageUrl}
          alt={item.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Subtle bottom gradient scrim so image transitions seamlessly to card text */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-black/20 pointer-events-none" />

      {/* 2. Styled CSS/SVG Fallback Container if image fails or while loading */}
      {(!imageLoaded || imageError) && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b ${fallback.bg} p-4 transition-opacity`}
        >
          <div className="w-12 h-12 rounded-full bg-white/80 shadow-xs flex items-center justify-center mb-1">
            <svg
              className={`w-7 h-7 ${fallback.accent}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="2" x2="6" y2="4" strokeLinecap="round" />
              <line x1="10" y1="2" x2="10" y2="5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[11px] font-mono font-semibold text-stone-700 uppercase tracking-wider">
            {fallback.label}
          </span>
        </div>
      )}

      {/* Dietary Indicator Corner Badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 shadow-sm">
        <div
          className={`flex items-center justify-center w-5 h-5 rounded-md border shadow-xs ${
            item.dietary === 'veg'
              ? 'border-emerald-600 bg-white/95'
              : item.dietary === 'vegan'
              ? 'border-teal-600 bg-white/95'
              : item.dietary === 'egg'
              ? 'border-amber-600 bg-white/95'
              : 'border-red-600 bg-white/95'
          }`}
          title={item.dietary.toUpperCase()}
        >
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              item.dietary === 'veg'
                ? 'bg-emerald-600'
                : item.dietary === 'vegan'
                ? 'bg-teal-600'
                : item.dietary === 'egg'
                ? 'bg-amber-600'
                : 'bg-red-600'
            }`}
          />
        </div>
      </div>

      {/* Preparation Time / Category Tag in top right with frosted glass effect */}
      <div className="absolute top-3 right-3 z-10 text-[11px] font-mono font-semibold text-stone-900 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/60 shadow-sm">
        {item.prepTime || 'Fresh Batch'}
      </div>
    </div>
  );
};
