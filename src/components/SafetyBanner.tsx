import React from 'react';
import { ShieldCheck, Truck, Sparkles, Lock, ChevronRight } from 'lucide-react';

interface SafetyBannerProps {
  onOpenSafetyModal: (tab?: 'safety' | 'security' | 'value' | 'policies') => void;
}

export const SafetyBanner: React.FC<SafetyBannerProps> = ({ onOpenSafetyModal }) => {
  return (
    <section className="bg-stone-900 text-white py-6 border-y border-stone-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Trust badges row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-auto flex-1">
            <div 
              onClick={() => onOpenSafetyModal('safety')}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-800/80 transition-colors cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30 transition-colors shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-100 group-hover:text-emerald-400 transition-colors">
                  FSSAI Safe Kitchen
                </h4>
                <p className="text-[11px] text-stone-400">
                  Daily sanitized & 100% pure veg
                </p>
              </div>
            </div>

            <div 
              onClick={() => onOpenSafetyModal('security')}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-800/80 transition-colors cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 transition-colors shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-100 group-hover:text-blue-400 transition-colors">
                  Cyber Safe & Encrypted
                </h4>
                <p className="text-[11px] text-stone-400">
                  Zero stored cards · Anti-fraud
                </p>
              </div>
            </div>

            <div 
              onClick={() => onOpenSafetyModal('policies')}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-800/80 transition-colors cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30 transition-colors shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-100 group-hover:text-purple-400 transition-colors">
                  Flat ₹30 Delivery
                </h4>
                <p className="text-[11px] text-stone-400">
                  Aligarh city only · Tamper-sealed
                </p>
              </div>
            </div>

            <div 
              onClick={() => onOpenSafetyModal('value')}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-800/80 transition-colors cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30 transition-colors shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                  Zero Surge Pricing
                </h4>
                <p className="text-[11px] text-stone-400">
                  True cafe rates, no 30% markups
                </p>
              </div>
            </div>
          </div>

          {/* Quick link button */}
          <div className="shrink-0 w-full md:w-auto text-right">
            <button
              onClick={() => onOpenSafetyModal('security')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold transition-colors border border-stone-700 shadow-2xs"
            >
              <span>Security & Safety Points</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
