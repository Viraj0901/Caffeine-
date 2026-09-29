import React, { useState } from 'react';
import { Star, ExternalLink, MessageSquareQuote } from 'lucide-react';
import { CAFFEINE_REVIEWS, CAFFEINE_RESTAURANT_INFO } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'coffee' | 'food' | 'cakes'>('all');

  const filteredReviews = CAFFEINE_REVIEWS.filter((r) => {
    if (filter === 'coffee') return r.text.toLowerCase().includes('coffee') || r.text.toLowerCase().includes('brew');
    if (filter === 'food') return r.text.toLowerCase().includes('pasta') || r.text.toLowerCase().includes('pizza') || r.text.toLowerCase().includes('sandwich') || r.text.toLowerCase().includes('sub');
    if (filter === 'cakes') return r.text.toLowerCase().includes('cake') || r.text.toLowerCase().includes('bento');
    return true;
  });

  return (
    <section id="reviews-section" className="py-12 sm:py-20 bg-[#faf7f2] text-stone-900 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-700 font-semibold mb-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Verified Patron Reviews</span>
            </div>
            <h2 className="text-3xl font-serif font-extrabold text-stone-900">
              Loved by Aligarh · 4.9★ on Google Maps
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Over 1,200 verified reviews praise our artisanal coffee extractions, gourmet subs, 
              fresh salads, pizzas, and trending Korean bento cakes.
            </p>
          </div>

          <a
            href={CAFFEINE_RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 self-start md:self-auto px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 text-xs font-semibold shadow-2xs transition-colors"
          >
            <span>Read 1,280+ Reviews on Google</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 py-5 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900'
            }`}
          >
            All Reviews ({CAFFEINE_REVIEWS.length})
          </button>
          <button
            onClick={() => setFilter('coffee')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'coffee'
                ? 'bg-amber-600 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900'
            }`}
          >
            Specialty Coffees
          </button>
          <button
            onClick={() => setFilter('food')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'food'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900'
            }`}
          >
            Subs & Bowls
          </button>
          <button
            onClick={() => setFilter('cakes')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'cakes'
                ? 'bg-pink-600 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900'
            }`}
          >
            Bento Cakes
          </button>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100">
                <h4 className="text-xs font-bold text-stone-900">{rev.author}</h4>
                <span className="text-[11px] text-stone-500 block">{rev.role}</span>
                {rev.dishMentioned && (
                  <span className="text-[11px] text-emerald-800 font-medium mt-1 block">
                    Favorites: {rev.dishMentioned}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
