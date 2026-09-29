import React, { useState } from 'react';
import { X, ShieldCheck, Award, CheckCircle2, Clock, MapPin, Sparkles, FileText, RefreshCw, Lock, KeyRound, Cpu, ShieldAlert } from 'lucide-react';
import { CAFFEINE_RESTAURANT_INFO } from '../data/restaurantData';

interface PublishingSafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'safety' | 'security' | 'value' | 'policies';
  ownerWhatsApp: string;
}

export const PublishingSafetyModal: React.FC<PublishingSafetyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'safety',
  ownerWhatsApp
}) => {
  const [activeTab, setActiveTab] = useState<'safety' | 'security' | 'value' | 'policies'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>Caffeine Safety & Security Standards</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Full Protection Active
                </span>
              </h2>
              <p className="text-xs text-stone-500">
                Official cybersecurity, kitchen hygiene, and customer protection guidelines
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-100/60 px-6 pt-2 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('safety')}
            className={`flex items-center gap-2 pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all shrink-0 ${
              activeTab === 'safety'
                ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Kitchen Safety & FSSAI</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all shrink-0 ${
              activeTab === 'security'
                ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Cybersecurity & Privacy</span>
          </button>

          <button
            onClick={() => setActiveTab('value')}
            className={`flex items-center gap-2 pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all shrink-0 ${
              activeTab === 'value'
                ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Value & Honest Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab('policies')}
            className={`flex items-center gap-2 pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all shrink-0 ${
              activeTab === 'policies'
                ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Delivery & Refunds</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-stone-700">
          {activeTab === 'safety' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
                <Award className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-emerald-950 text-sm">FSSAI Certified Safe Kitchen</h3>
                  <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
                    Caffeine operates under Food Safety & Standards Authority of India (FSSAI) hygiene regulations 
                    (Registration No: 22723105000412). We enforce rigorous temperature monitoring, food-grade storage, 
                    and certified filtered water for all beverage and ice prep.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-xs mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Tamper-Proof Packaging</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    All deliveries are sealed with tamper-evident stickers. Never accept an order with a broken or open seal.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-xs mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Pure Vegetarian & Eggless</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    100% pure vegetarian preparation. Gourmet bento cakes and bakery selections are prepared 100% eggless.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-xs mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Daily Fresh Roast & Prep</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Arabica coffee beans freshly ground per cup; artisan paninis and wraps assembled with fresh daily vegetables.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-xs mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Sanitized Staff & Kitchen</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Strict hand-wash intervals, hair nets, clean culinary gloves, and continuous work surface sanitization.
                  </p>
                </div>
              </div>

              {/* Allergen Advisory */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs">
                <span className="font-bold block mb-1">⚠️ Allergen & Dietary Information:</span>
                Items may contain dairy, gluten, or nuts. If you have severe allergies or prefer Jain preparation (no onion, no garlic), 
                please specify in the special order notes at checkout or inform our chef on WhatsApp directly.
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950 text-white flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-emerald-200 text-sm">Full Cybersecurity & Zero-Financial-Risk Architecture</h3>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    Caffeine’s ordering infrastructure is built with enterprise privacy standards. We deliberately eliminate risk by never storing your debit cards, credit cards, or net banking passwords.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-xs mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>256-Bit SSL/TLS Encryption</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    All browser communication is encrypted over HTTPS with modern TLS 1.3 cryptographic suites.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-xs mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Anti-XSS & Input Sanitization</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Customer checkout inputs and dish manager controls are sanitized to prevent script injection and malicious payloads.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-xs mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Brute-Force Lockout Defense</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Owner administrative portal is guarded with PIN verification and automatic 60-second lockout after 5 failed attempts.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-xs mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Anti-Spam Rate Limiting</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Automated bots and duplicate submissions are actively throttled to protect restaurant operations and customer trays.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 text-xs">
                <span className="font-bold text-stone-900 block mb-1">🔒 Customer Privacy Commitment:</span>
                <p className="leading-relaxed">
                  Your phone number and delivery location are used strictly for active order dispatch on WhatsApp. We do not sell, license, or share user contacts with any advertising networks.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'value' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-stone-900 text-white flex items-start justify-between">
                <div>
                  <span className="text-amber-400 font-mono text-xs uppercase tracking-wider font-bold">
                    Caffeine Direct Guarantee
                  </span>
                  <h3 className="font-bold text-base mt-0.5">True Cafe Prices & Direct Service</h3>
                  <p className="text-xs text-stone-300 mt-1 max-w-md">
                    By ordering directly on this website, you skip third-party platform markups and help support local culinary artisans in Aligarh.
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-xl text-center shrink-0">
                  <span className="block text-xl font-bold font-mono text-amber-400">₹0</span>
                  <span className="text-[10px] text-stone-300">Surge Pricing</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 text-center">
                  <div className="text-xl font-mono font-bold text-emerald-800">₹30</div>
                  <div className="text-xs font-bold text-stone-900 mt-1">Flat Aligarh Delivery</div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Transparent ₹30 charge anywhere in Aligarh city. No rain surges or distance spikes.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 text-center">
                  <div className="text-xl font-mono font-bold text-emerald-800">30-40m</div>
                  <div className="text-xs font-bold text-stone-900 mt-1">Hot & Fresh Dispatch</div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Prepared on receipt and dispatched immediately from Square Towers, Marris Road.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 text-center">
                  <div className="text-xl font-mono font-bold text-emerald-800">100%</div>
                  <div className="text-xs font-bold text-stone-900 mt-1">WhatsApp Live Status</div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Direct communication with the restaurant team without automated bot barriers.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 text-xs">
                <span className="font-bold text-stone-900 block mb-1">🎁 Included Complimentary with Every Order:</span>
                <ul className="list-disc list-inside space-y-1 text-stone-600">
                  <li>Custom occasion candles and wooden spork with every Korean Bento Cake</li>
                  <li>Eco-friendly biodegradable beverage cups and sturdy leak-proof travel lids</li>
                  <li>Oregano, chili flakes, and paper napkins neatly packed</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="space-y-4">
              {/* Delivery Boundary */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>Delivery Coverage (Aligarh City Only)</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Delivery is currently restricted to Aligarh municipal bounds to ensure hot and fresh quality. 
                  Covered zones include Marris Road, Begpur, Civil Lines, Medical Road, Centre Point, AMU Campus, 
                  Ramghat Road, GT Road, and nearby sectors. A flat delivery fee of ₹30 is applied to every delivery order.
                </p>
              </div>

              {/* Cancellation & Refund Policy */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
                  <RefreshCw className="w-4 h-4 text-emerald-700" />
                  <span>Cancellation & Replacement Guarantee</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  - <strong>Cancellation:</strong> You may cancel an order by contacting us on WhatsApp within 5 minutes of placing it, before kitchen preparation begins.
                  <br />
                  - <strong>Quality Issues:</strong> If your order arrives damaged, missing, or compromised, please send a quick picture on WhatsApp within 30 minutes of receipt. We will dispatch an immediate replacement or issue a full refund.
                </p>
              </div>

              {/* Privacy and Security */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
                  <Lock className="w-4 h-4 text-emerald-700" />
                  <span>Customer Data Privacy</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Your phone number, name, and address are gathered exclusively for executing your food delivery. 
                  We never sell or disclose customer contact lists to any advertising brokers. 
                  WhatsApp communication is end-to-end encrypted.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Instant Contact Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-stone-200 bg-stone-50">
          <div className="text-xs text-stone-500">
            Have questions? Chat directly with our manager.
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                const waUrl = `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent('Hello Caffeine, I have a query regarding food safety and ordering.')}`;
                const link = document.createElement('a');
                link.href = waUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shadow-xs"
            >
              <span>Connect on WhatsApp</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
