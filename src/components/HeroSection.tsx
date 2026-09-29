import React from 'react';
import { MapPin, Star, Clock, ArrowDown, MessageCircle, CheckCircle, PlusCircle } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface HeroSectionProps {
  restaurant: RestaurantInfo;
  onExploreMenu: () => void;
  onSelectOrderType: (type: 'delivery' | 'dine_in' | 'takeaway') => void;
  onOpenWhatsAppDirect: () => void;
  ownerWhatsApp: string;
  isOwnerLoggedIn: boolean;
  onOpenMenuManager: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  restaurant,
  onExploreMenu,
  onSelectOrderType,
  onOpenWhatsAppDirect,
  ownerWhatsApp,
  isOwnerLoggedIn,
  onOpenMenuManager
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf7f2] via-amber-50/40 to-white py-12 sm:py-20 border-b border-stone-200">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-200/30 via-orange-100/20 to-transparent blur-3xl opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5">
            {/* Location & Rating trust line */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-600 font-medium">
              <span className="flex items-center gap-1 text-amber-800 font-semibold bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-200">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>4.9 / 5 Google Rating</span>
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1 text-stone-700">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>Square Towers, Marris Rd, Begpur, Aligarh</span>
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1 text-stone-600">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                <span>11 AM – 11 PM</span>
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-stone-900 tracking-tight leading-[1.15] text-balance">
              Artisan Brews & Gourmet Kitchen at{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2">
                Caffeine
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
              Explore authentic Vietnamese drip cold brews, freshly baked 15cm gourmet subs, 
              crisp whole-wheat wraps, comforting gourmet rice bowls, stone-baked pizzas, and Korean bento cakes.
            </p>

            {/* Customer CTAs (Owner Portal is secluded for owner only) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenWhatsAppDirect}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Direct WhatsApp Order</span>
              </button>

              <button
                onClick={onExploreMenu}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm sm:text-base transition-all shadow-sm active:scale-95"
              >
                <span>Browse Menu & Order</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              {isOwnerLoggedIn && (
                <button
                  onClick={onOpenMenuManager}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-xs transition-all shadow-xs"
                >
                  <PlusCircle className="w-4 h-4 text-amber-700" />
                  <span>+ Add New Dish (Owner)</span>
                </button>
              )}
            </div>

            {/* Direct WhatsApp notification reassurance */}
            <div className="flex items-center gap-2 text-xs text-stone-600 bg-emerald-50 border border-emerald-200/80 px-3 py-2 rounded-lg max-w-xl">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Orders placed online instantly send an itemized bill directly to our restaurant WhatsApp for fast preparation.
              </span>
            </div>

            {/* Fulfillment Preferences */}
            <div className="pt-2 border-t border-stone-200 w-full max-w-lg">
              <span className="block text-xs uppercase tracking-wider text-stone-500 mb-2 font-mono font-semibold">
                Order Delivery or Table Service:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    onSelectOrderType('delivery');
                    onExploreMenu();
                  }}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all text-left shadow-2xs group"
                >
                  <span className="text-xs font-bold text-stone-800 group-hover:text-emerald-800">
                    🛵 Home Delivery
                  </span>
                  <span className="text-[10px] text-stone-500">Aligarh only · ₹30</span>
                </button>
                <button
                  onClick={() => {
                    onSelectOrderType('dine_in');
                    onExploreMenu();
                  }}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all text-left shadow-2xs group"
                >
                  <span className="text-xs font-bold text-stone-800 group-hover:text-emerald-800">
                    ☕ Dine-In Table
                  </span>
                  <span className="text-[10px] text-stone-500">Marris Rd cafe</span>
                </button>
                <button
                  onClick={() => {
                    onSelectOrderType('takeaway');
                    onExploreMenu();
                  }}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all text-left shadow-2xs group"
                >
                  <span className="text-xs font-bold text-stone-800 group-hover:text-emerald-800">
                    🛍️ Takeaway
                  </span>
                  <span className="text-[10px] text-stone-500">Quick pickup</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Menu Card Showcase Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-white p-6 border border-stone-200 shadow-xl overflow-hidden">
              <div className="rounded-xl bg-emerald-800 text-white p-4 text-center shadow-sm">
                <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-200 block">
                  Caffeine Aligarh
                </span>
                <h3 className="text-2xl font-serif font-extrabold tracking-wide uppercase mt-0.5">
                  SUBS & SALADS
                </h3>
                <span className="text-xs tracking-wider text-emerald-100 font-mono">
                  — GOURMET MENU & SIPS —
                </span>
              </div>

              {/* Menu Highlights with real photos */}
              <div className="py-4 space-y-3">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=120&q=80"
                      alt="Vietnamese Cold Coffee"
                      className="w-10 h-10 rounded-lg object-cover shadow-2xs"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">Vietnamese Cold Coffee</h4>
                      <p className="text-[11px] text-stone-500">Phin filter drip with condensed milk</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-900">₹199</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=120&q=80"
                      alt="Mix-Veg Crispy Sub"
                      className="w-10 h-10 rounded-lg object-cover shadow-2xs"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">Mix-Veg Crispy Sub (15cm)</h4>
                      <p className="text-[11px] text-stone-500">Freshly baked bread with herb patty</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-900">₹179</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=80"
                      alt="Peri-Peri Paneer Rice Bowl"
                      className="w-10 h-10 rounded-lg object-cover shadow-2xs"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">Peri-Peri Paneer Rice Bowl</h4>
                      <p className="text-[11px] text-stone-500">Garlic rice, paneer & fresh veggies</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-900">₹249</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=120&q=80"
                      alt="Bento Chocolate Truffle Cake"
                      className="w-10 h-10 rounded-lg object-cover shadow-2xs"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">Bento Chocolate Truffle Cake</h4>
                      <p className="text-[11px] text-stone-500">Trending Korean lunchbox cake</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-900">₹349</span>
                </div>
              </div>

              {/* Trust metrics */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-stone-200 text-center">
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-200/70">
                  <span className="block text-base font-bold font-mono text-amber-800">4.9★</span>
                  <span className="text-[10px] text-stone-600 font-medium">Google Rating</span>
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200/70">
                  <span className="block text-base font-bold font-mono text-emerald-800">1200+</span>
                  <span className="text-[10px] text-stone-600 font-medium">Happy Reviews</span>
                </div>
                <div className="p-2 rounded-lg bg-orange-50 border border-orange-200/70">
                  <span className="block text-base font-bold font-mono text-orange-800">WhatsApp</span>
                  <span className="text-[10px] text-stone-600 font-medium">Direct Orders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
