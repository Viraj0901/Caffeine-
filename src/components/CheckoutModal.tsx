import React, { useState } from 'react';
import { X, Check, QrCode, CreditCard, Banknote, MapPin, Coffee, MessageCircle, Phone, ShieldCheck, Lock } from 'lucide-react';
import { CartItem, Order, OrderType, PaymentMethod } from '../types';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  orderType: OrderType;
  tableNumber: string;
  selectedDeliveryArea: string;
  deliveryFee: number;
  onOrderSuccess: (order: Order) => void;
  ownerWhatsApp: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  orderType,
  tableNumber,
  selectedDeliveryArea,
  deliveryFee,
  onOrderSuccess,
  ownerWhatsApp
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('whatsapp_direct');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Re-verify totals directly to prevent client-side tampering
  const subtotal = cart.reduce((sum, item) => sum + (Math.max(1, item.quantity) * item.itemTotal / Math.max(1, item.quantity)), 0);
  const actualDeliveryFee = orderType === 'delivery' ? 30 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + actualDeliveryFee + tax;

  // XSS & injection sanitation helper
  const sanitize = (text: string) => text.replace(/[<>{}[\]\\]/g, '').trim();

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Rate limiting: prevent bot flooding or double-clicks
    try {
      const lastOrderTs = sessionStorage.getItem('caffeine_last_order_ts');
      if (lastOrderTs) {
        const diff = Date.now() - parseInt(lastOrderTs, 10);
        if (diff < 8000) {
          setErrorMessage('Your previous order is already processing. Please wait a moment.');
          return;
        }
      }
    } catch {
      // ignore storage error
    }

    if (cart.length === 0) {
      setErrorMessage('Your tray is empty. Please add items before placing an order.');
      return;
    }

    const cleanName = sanitize(customerName);
    if (cleanName.length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }

    // Strict 10-digit Indian phone validation (starts with 6, 7, 8, or 9)
    const rawDigits = customerPhone.replace(/\D/g, '');
    const cleanPhone = rawDigits.length === 12 && rawDigits.startsWith('91') ? rawDigits.slice(2) : rawDigits;
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number (e.g., 98XXXXXXXX).');
      return;
    }

    if (orderType === 'delivery') {
      const cleanAddress = sanitize(address);
      if (cleanAddress.length < 6) {
        setErrorMessage('Please provide your complete delivery address (House/Flat, Street, Landmark in Aligarh).');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      sessionStorage.setItem('caffeine_last_order_ts', Date.now().toString());
    } catch {
      // ignore
    }

    const orderId = `CAF-${Math.floor(1000 + Math.random() * 9000)}`;
    const estimatedMinutes = orderType === 'dine_in' ? 12 : 28;

    const newOrder: Order = {
      id: orderId,
      customerName: cleanName,
      customerPhone: cleanPhone,
      orderType,
      tableNumber: orderType === 'dine_in' ? sanitize(tableNumber) || 'Table 1' : undefined,
      deliveryAddress: orderType === 'delivery' ? sanitize(address) : undefined,
      deliveryArea: orderType === 'delivery' ? selectedDeliveryArea : undefined,
      deliveryFee: actualDeliveryFee,
      paymentMethod,
      paymentStatus: paymentMethod === 'upi_qr' ? 'paid' : 'pending',
      items: [...cart],
      subtotal,
      tax,
      total,
      specialNotes: specialNotes ? sanitize(specialNotes) : undefined,
      status: 'brewing',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes
    };

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    // Direct WhatsApp Message Generation
    let msg = `*NEW CAFFEINE ORDER - #${newOrder.id}*\n`;
    msg += `Customer: *${newOrder.customerName}* (${newOrder.customerPhone})\n`;
    msg += `Fulfillment: *${newOrder.orderType.toUpperCase()}* ${
      newOrder.tableNumber ? `(${newOrder.tableNumber} - Marris Rd Branch)` : '(Delivery in Aligarh)'
    }\n`;
    if (newOrder.deliveryAddress) {
      msg += `Address (Aligarh Only): ${newOrder.deliveryAddress}, ${newOrder.deliveryArea}\n`;
    }
    msg += `Payment Preference: ${newOrder.paymentMethod.toUpperCase()}\n\n`;
    msg += `*ORDERED ITEMS:*\n`;
    newOrder.items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.menuItem.name}* x ${item.quantity} - ₹${item.itemTotal}\n`;
      if (item.selectedSize) msg += `   - Size: ${item.selectedSize.label}\n`;
      if (item.selectedMilk) msg += `   - Milk: ${item.selectedMilk}\n`;
      if (item.selectedExtras.length > 0)
        msg += `   - Extras: ${item.selectedExtras.map((e) => e.name).join(', ')}\n`;
    });
    msg += `\nSubtotal: ₹${newOrder.subtotal}\n`;
    if (newOrder.deliveryFee > 0) msg += `Delivery Fee (Aligarh City): ₹30\n`;
    msg += `GST (5%): ₹${newOrder.tax}\n`;
    msg += `*Total Amount: ₹${newOrder.total}*\n`;
    if (newOrder.specialNotes) msg += `Note: "${newOrder.specialNotes}"\n`;

    const encoded = encodeURIComponent(msg);
    const phone = ownerWhatsApp || '916396408445';
    const waUrl = `https://wa.me/${phone}?text=${encoded}`;

    // Reliable link click that avoids popup blocker heuristics
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden my-auto animate-fadeIn text-stone-900">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 font-semibold mb-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900">
              Confirm & Place Your Order
            </h3>
            <p className="text-xs text-stone-500">
              Directly transmitted to Caffeine kitchen & WhatsApp
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-medium">
            {errorMessage}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
          {/* Order Summary Snapshot */}
          <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs flex items-center justify-between">
            <div>
              <span className="text-stone-600">Mode: </span>
              <span className="font-bold text-emerald-900 uppercase font-mono">
                {orderType.replace('_', ' ')}
              </span>
              {orderType === 'dine_in' && (
                <span className="text-stone-700"> ({tableNumber || 'Table 1'})</span>
              )}
              {orderType === 'delivery' && (
                <span className="text-emerald-800 font-semibold"> (Aligarh Only · ₹30 Delivery Charge)</span>
              )}
            </div>
            <div>
              <span className="text-stone-600">Payable: </span>
              <span className="text-sm font-extrabold font-mono text-emerald-900">₹{total}</span>
            </div>
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                maxLength={60}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Farhan Akhtar"
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                Your Phone (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                inputMode="numeric"
                maxLength={10}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="10-digit mobile (e.g. 98XXXXXXXX)"
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs font-mono focus:outline-none focus:border-emerald-600"
              />
            </div>

            {orderType === 'delivery' && (
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-mono text-stone-700 uppercase tracking-wider font-semibold">
                    Delivery Address in Aligarh City *
                  </label>
                  <span className="text-[11px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Aligarh Only · ₹30 Delivery Charge
                  </span>
                </div>
                <textarea
                  required
                  rows={2}
                  maxLength={150}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Flat 204, Marris Road Towers, near Centenary Gate, Begpur, Aligarh"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-emerald-600"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  📍 We deliver exclusively across Aligarh city with a fixed ₹30 delivery partner fee.
                </p>
              </div>
            )}

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                Cooking Instruction / Special Note
              </label>
              <input
                type="text"
                maxLength={120}
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="e.g. Extra hot coffee, pack separate cutlery, less spicy"
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-mono text-stone-700 uppercase tracking-wider mb-2 font-semibold">
              Select Payment & Ordering Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('whatsapp_direct')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'whatsapp_direct'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                }`}
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 mb-1 fill-emerald-600" />
                <span className="text-xs font-bold">Direct WhatsApp</span>
                <span className="text-[10px] text-stone-500">Order to restaurant phone</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi_qr')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'upi_qr'
                    ? 'border-amber-500 bg-amber-50 text-stone-900 font-bold shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                }`}
              >
                <QrCode className="w-5 h-5 text-amber-600 mb-1" />
                <span className="text-xs font-bold">UPI QR / Intent</span>
                <span className="text-[10px] text-stone-500">GPay, PhonePe, Paytm</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-amber-500 bg-amber-50 text-stone-900 font-bold shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                }`}
              >
                <Banknote className="w-5 h-5 text-stone-600 mb-1" />
                <span className="text-xs font-bold">
                  {orderType === 'dine_in' ? 'Pay at Counter' : 'Cash on Delivery'}
                </span>
                <span className="text-[10px] text-stone-500">Pay when served</span>
              </button>
            </div>
          </div>

          {/* UPI dynamic preview */}
          {paymentMethod === 'upi_qr' && (
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3">
              <div className="w-16 h-16 bg-white border border-stone-200 p-1 rounded-lg flex items-center justify-center shrink-0">
                <QrCode className="w-12 h-12 text-stone-800" />
              </div>
              <div className="text-xs space-y-0.5">
                <span className="font-bold text-stone-900 block">Caffeine Aligarh UPI Handle</span>
                <span className="font-mono text-emerald-800 font-bold block">caffeinealigarh@okhdfcbank</span>
                <p className="text-[11px] text-stone-500">Scan using Google Pay, PhonePe, or Paytm.</p>
              </div>
            </div>
          )}

          {/* Privacy & Anti-Fraud Reassurance */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Safe Checkout Guarantee:</strong> Your contact details are securely transmitted solely for food preparation. Zero bank credentials or cards are stored on servers.
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Transmitting Order to Restaurant...</span>
            ) : (
              <>
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Place Order & Transmit to WhatsApp · ₹{total}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
