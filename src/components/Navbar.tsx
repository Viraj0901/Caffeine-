import React from 'react';
import { ShoppingBag, Lock, MapPin, Coffee, PhoneCall, ClipboardList, MessageCircle, PlusCircle, LogOut } from 'lucide-react';
import { CaffeineLogo } from './CaffeineLogo';

interface NavbarProps {
  cartItemCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  onOpenMenuManager: () => void;
  onOpenOrderHistory: () => void;
  onOpenWhatsAppDirect: () => void;
  activeSection: string;
  orderCount: number;
  ownerWhatsApp: string;
  isOwnerLoggedIn: boolean;
  onOwnerLogout: () => void;
  onOpenSafetyModal: (tab?: 'safety' | 'security' | 'value' | 'policies') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  cartSubtotal,
  onOpenCart,
  onOpenMenuManager,
  onOpenOrderHistory,
  onOpenWhatsAppDirect,
  orderCount,
  ownerWhatsApp,
  isOwnerLoggedIn,
  onOwnerLogout,
  onOpenSafetyModal
}) => {
  return (
    <>
      {/* Pinned Owner Status Bar (ONLY visible to the Owner when logged in) */}
      {isOwnerLoggedIn && (
        <div className="bg-emerald-900 text-white text-xs px-4 py-2 flex flex-wrap items-center justify-between border-b border-emerald-950 font-mono shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold">OWNER PORTAL ACTIVE</span>
            <span className="opacity-70 hidden sm:inline">· Caffeine Marris Rd</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMenuManager}
              className="flex items-center gap-1 text-emerald-200 hover:text-white underline underline-offset-2"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>+ Add Dish / Manage Menu</span>
            </button>
            <span className="opacity-40">|</span>
            <button
              onClick={onOwnerLogout}
              className="flex items-center gap-1 text-red-200 hover:text-white"
              title="Exit Owner Mode"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Owner Mode</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Public Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-stone-200/90 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Single Brand element */}
          <a href="#" className="flex items-center gap-2 group">
            <CaffeineLogo size="md" showSubtitle={true} />
          </a>

          {/* Zone 2: Customer Nav Links (clean, no owner clutter for public diners) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            <a
              href="#menu-section"
              className="hover:text-emerald-800 transition-colors whitespace-nowrap"
            >
              Menu Catalog
            </a>
            <a
              href="#location-hours"
              className="flex items-center gap-1 hover:text-emerald-800 transition-colors whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>Marris Road</span>
            </a>
            <a
              href="#reviews-section"
              className="hover:text-emerald-800 transition-colors whitespace-nowrap"
            >
              4.9★ Reviews
            </a>
            <button
              onClick={() => onOpenSafetyModal('safety')}
              className="hover:text-emerald-800 transition-colors whitespace-nowrap text-stone-700"
            >
              Safety & Standards
            </button>

            {/* Owner Shortcut ONLY if authenticated */}
            {isOwnerLoggedIn && (
              <button
                onClick={onOpenMenuManager}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-semibold"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>+ Add Dish</span>
              </button>
            )}

            {orderCount > 0 && (
              <button
                onClick={onOpenOrderHistory}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors whitespace-nowrap font-mono"
              >
                <ClipboardList className="w-3.5 h-3.5 text-emerald-600" />
                <span>Orders ({orderCount})</span>
              </button>
            )}
          </nav>

          {/* Zone 3: Actions (WhatsApp Direct Order + Cart) */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenWhatsAppDirect}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-95 whitespace-nowrap"
              title="Chat or Order Directly on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="hidden sm:inline">WhatsApp Order</span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3.5 py-2 text-xs sm:text-sm transition-all shadow-xs active:scale-95 whitespace-nowrap"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Tray</span>
              {cartItemCount > 0 ? (
                <span className="flex items-center gap-1 rounded bg-stone-900 text-white px-1.5 py-0.5 text-xs font-mono tabular-nums">
                  <span>{cartItemCount}</span>
                  <span className="opacity-60">·</span>
                  <span>₹{cartSubtotal}</span>
                </span>
              ) : (
                <span className="text-xs opacity-80 font-normal">₹0</span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
