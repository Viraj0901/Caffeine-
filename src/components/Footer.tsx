import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Lock, MessageCircle, LogIn, LogOut } from 'lucide-react';
import { CAFFEINE_RESTAURANT_INFO } from '../data/restaurantData';
import { CaffeineLogo } from './CaffeineLogo';

interface FooterProps {
  onOpenMenuManager: () => void;
  onExploreMenu: () => void;
  ownerWhatsApp: string;
  isOwnerLoggedIn: boolean;
  onOwnerLogout: () => void;
  onOpenOwnerLogin: () => void;
  onOpenSafetyModal: (tab?: 'safety' | 'security' | 'value' | 'policies') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenMenuManager,
  onExploreMenu,
  ownerWhatsApp,
  isOwnerLoggedIn,
  onOwnerLogout,
  onOpenOwnerLogin,
  onOpenSafetyModal
}) => {
  return (
    <footer className="border-t border-stone-200 bg-stone-100/70 text-stone-600 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-200">
          {/* Brand & Bio */}
          <div className="md:col-span-4 space-y-4">
            <CaffeineLogo size="lg" showSubtitle={true} />
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md">
              {CAFFEINE_RESTAURANT_INFO.shortBio}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-800 font-semibold pt-1">
              <span>Google 4.9 ★</span>
              <span>·</span>
              <span>Direct WhatsApp Orders</span>
              <span>·</span>
              <span>Marris Rd, Aligarh</span>
            </div>
            {/* FSSAI Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-mono">
              <span className="font-bold">FSSAI Lic.</span>
              <span>22723105000412</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-sans font-semibold">100% Veg</span>
            </div>
          </div>

          {/* Customer Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-bold">
              Menu & Ordering
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#menu-section"
                  onClick={onExploreMenu}
                  className="hover:text-emerald-800 transition-colors"
                >
                  Browse Full Menu
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent('Hello Caffeine! I would like to place an order.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Order on WhatsApp</span>
                </a>
              </li>
              <li>
                <a href="#location-hours" className="hover:text-emerald-800 transition-colors">
                  Location & Timings
                </a>
              </li>
              <li>
                <a href="#reviews-section" className="hover:text-emerald-800 transition-colors">
                  Patron Reviews (4.9★)
                </a>
              </li>
            </ul>
          </div>

          {/* Safety & Policies */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-bold">
              Safety & Standards
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenSafetyModal('safety')}
                  className="hover:text-emerald-800 text-stone-600 transition-colors text-left flex items-center gap-1"
                >
                  <span>🛡️ FSSAI & Kitchen Hygiene</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenSafetyModal('security')}
                  className="hover:text-emerald-800 text-stone-600 transition-colors text-left flex items-center gap-1"
                >
                  <span>🔒 Cybersecurity & Privacy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenSafetyModal('value')}
                  className="hover:text-emerald-800 text-stone-600 transition-colors text-left flex items-center gap-1"
                >
                  <span>✨ Zero Surge & Direct Pricing</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenSafetyModal('policies')}
                  className="hover:text-emerald-800 text-stone-600 transition-colors text-left flex items-center gap-1"
                >
                  <span>🛵 Aligarh ₹30 Delivery Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenSafetyModal('policies')}
                  className="hover:text-emerald-800 text-stone-600 transition-colors text-left flex items-center gap-1"
                >
                  <span>🔄 Refunds & Replacement Terms</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-bold">
              Contact & Address
            </h4>
            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  {CAFFEINE_RESTAURANT_INFO.address.shop}, {CAFFEINE_RESTAURANT_INFO.address.building}, {CAFFEINE_RESTAURANT_INFO.address.street}, {CAFFEINE_RESTAURANT_INFO.address.area}, {CAFFEINE_RESTAURANT_INFO.address.city}, UP {CAFFEINE_RESTAURANT_INFO.address.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{CAFFEINE_RESTAURANT_INFO.timings}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <a href={`tel:${CAFFEINE_RESTAURANT_INFO.phone}`} className="hover:text-emerald-800 font-semibold">
                  Call Restaurant Hotline
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <a
                  href={`https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent('Hello Caffeine! I would like to place an order.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-800 font-semibold text-emerald-700 flex items-center gap-1"
                >
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line with secluded Owner Access */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} Caffeine Restaurant & Coffee Roastery, Aligarh. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-stone-500 hidden sm:inline">
              Square Towers, Marris Rd, Begpur
            </span>

            {/* Discreet Owner Login / Logout link */}
            {isOwnerLoggedIn ? (
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <button
                  onClick={onOpenMenuManager}
                  className="hover:underline flex items-center gap-1"
                >
                  <span>Portal Active</span>
                </button>
                <span>·</span>
                <button
                  onClick={onOwnerLogout}
                  className="text-stone-500 hover:text-red-700 flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenOwnerLogin}
                className="text-stone-400 hover:text-stone-700 transition-colors flex items-center gap-1 text-[11px]"
                title="Restaurant Staff & Owner Login"
              >
                <Lock className="w-3 h-3" />
                <span>Owner Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
