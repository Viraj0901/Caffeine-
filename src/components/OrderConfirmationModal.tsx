import React from 'react';
import { X, CheckCircle, Clock, Printer, Share2, MapPin, Coffee, PhoneCall, MessageCircle } from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  ownerWhatsApp: string;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  isOpen,
  onClose,
  ownerWhatsApp
}) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const generateWhatsAppMessage = () => {
    let msg = `*NEW CAFFEINE ORDER - #${order.id}*\n`;
    msg += `Customer: *${order.customerName}* (${order.customerPhone})\n`;
    msg += `Fulfillment: *${order.orderType.toUpperCase()}* ${
      order.tableNumber ? `(Table: ${order.tableNumber} - Marris Rd)` : ''
    }\n`;
    if (order.deliveryAddress) {
      msg += `Delivery Address: ${order.deliveryAddress}, ${order.deliveryArea}\n`;
    }
    msg += `Payment: ${order.paymentMethod.toUpperCase()} (${order.paymentStatus})\n\n`;
    msg += `*ORDERED DISHES:*\n`;
    order.items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.menuItem.name}* x ${item.quantity} - ₹${item.itemTotal}\n`;
      if (item.selectedSize) msg += `   - Size: ${item.selectedSize.label}\n`;
      if (item.selectedMilk) msg += `   - Milk: ${item.selectedMilk}\n`;
      if (item.selectedExtras.length > 0)
        msg += `   - Extras: ${item.selectedExtras.map((e) => e.name).join(', ')}\n`;
    });
    msg += `\nSubtotal: ₹${order.subtotal}\n`;
    if (order.deliveryFee > 0) msg += `Delivery Fee: ₹${order.deliveryFee}\n`;
    msg += `GST (5%): ₹${order.tax}\n`;
    msg += `*Total Amount: ₹${order.total}*\n`;
    if (order.specialNotes) msg += `Note: "${order.specialNotes}"\n`;

    const encoded = encodeURIComponent(msg);
    const phone = ownerWhatsApp || '916396408445';
    const waUrl = `https://wa.me/${phone}?text=${encoded}`;

    // Reliable link click
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden my-auto animate-fadeIn text-stone-900">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-emerald-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto mb-2 border border-white/30">
            <CheckCircle className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-serif font-bold">
            Order Confirmed!
          </h3>
          <p className="text-xs font-mono text-emerald-200 mt-0.5">
            Order #{order.id} · Transmitted to Caffeine Kitchen
          </p>
        </div>

        {/* Live Order Tracker Step Bar */}
        <div className="p-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center justify-between text-[11px] font-mono text-stone-600 mb-2">
            <span>Status: Brewing in Kitchen</span>
            <span>Est. ~{order.estimatedMinutes} Mins</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            <div className="h-1.5 rounded-full bg-emerald-600" />
            <div className="h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <div className="h-1.5 rounded-full bg-stone-200" />
            <div className="h-1.5 rounded-full bg-stone-200" />
          </div>

          <div className="grid grid-cols-4 gap-1 text-[10px] text-stone-500 text-center mt-2 font-mono">
            <span className="text-emerald-700 font-bold">Received</span>
            <span className="text-amber-600 font-bold">Brewing</span>
            <span>Quality Check</span>
            <span>{order.orderType === 'dine_in' ? 'Served' : 'Delivered'}</span>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto text-xs">
          {/* Order Details */}
          <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-stone-50 border border-stone-200">
            <div>
              <span className="text-stone-500 block">Customer</span>
              <span className="font-bold text-stone-900">{order.customerName}</span>
              <span className="text-stone-600 block">{order.customerPhone}</span>
            </div>
            <div>
              <span className="text-stone-500 block">Fulfillment</span>
              <span className="font-bold text-emerald-800 uppercase font-mono">
                {order.orderType}
              </span>
              {order.tableNumber && (
                <span className="text-stone-700 block">{order.tableNumber}</span>
              )}
              {order.deliveryArea && (
                <span className="text-stone-700 block">{order.deliveryArea}</span>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-2 border-t border-stone-200 pt-3">
            <span className="font-mono text-stone-500 uppercase text-[11px] font-semibold block">
              Items Summary
            </span>
            {order.items.map((item) => (
              <div key={item.cartLineId} className="flex justify-between items-start py-1">
                <div>
                  <span className="font-medium text-stone-900">
                    {item.menuItem.name} <span className="text-stone-500">× {item.quantity}</span>
                  </span>
                  {item.selectedSize && (
                    <span className="block text-[10px] text-emerald-800 font-semibold">
                      Size: {item.selectedSize.label}
                    </span>
                  )}
                  {item.selectedMilk && (
                    <span className="block text-[10px] text-amber-800">
                      Milk: {item.selectedMilk}
                    </span>
                  )}
                  {item.selectedExtras.length > 0 && (
                    <span className="block text-[10px] text-stone-500">
                      Extras: {item.selectedExtras.map((e) => e.name).join(', ')}
                    </span>
                  )}
                </div>
                <span className="font-mono text-stone-900 font-bold tabular-nums">
                  ₹{item.itemTotal}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-1 border-t border-stone-200 pt-3 text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-stone-900 font-bold tabular-nums">₹{order.subtotal}</span>
            </div>
            {order.deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-mono text-stone-900 tabular-nums">₹{order.deliveryFee}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span className="font-mono text-stone-900 tabular-nums">₹{order.tax}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-extrabold text-stone-900">
              <span>Total Payable</span>
              <span className="font-mono text-emerald-800 tabular-nums">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={generateWhatsAppMessage}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Send Order on WhatsApp</span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-300 transition-colors flex items-center justify-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
