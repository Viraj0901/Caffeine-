import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppQuickWidgetProps {
  ownerWhatsApp: string;
  cartCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
}

export const WhatsAppQuickWidget: React.FC<WhatsAppQuickWidgetProps> = ({
  ownerWhatsApp,
  cartCount,
  cartSubtotal
}) => {
  const handleOpenWhatsAppChat = () => {
    const text = cartCount > 0
      ? `Hello Caffeine! I have ${cartCount} dishes in my tray (₹${cartSubtotal}). I would like to place my order.`
      : 'Hello Caffeine! I want to inquire about your menu and place an order for delivery/dine-in.';
    
    const phone = ownerWhatsApp || '916396408445';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    
    // Reliable anchor click that works in iframes
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Floating Tooltip Pill (No raw phone number displayed as requested) */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-emerald-950 font-bold text-xs shadow-lg border border-emerald-200 transition-all opacity-95 group-hover:opacity-100">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>Chat & Order on WhatsApp</span>
      </div>

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={handleOpenWhatsAppChat}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300"
        title="Chat or Order Directly on WhatsApp"
        aria-label="Direct WhatsApp Ordering"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </button>
    </div>
  );
};
