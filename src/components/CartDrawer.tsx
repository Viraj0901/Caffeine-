import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { CartItem, OrderType } from '../types';
import { ALIGARH_DELIVERY_AREAS } from '../data/restaurantData';
import { getDishImageUrl } from '../data/dishImages';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  orderType: OrderType;
  onSetOrderType: (type: OrderType) => void;
  tableNumber: string;
  onSetTableNumber: (table: string) => void;
  selectedDeliveryArea: string;
  onSetDeliveryArea: (area: string) => void;
  onUpdateCartItemQty: (cartLineId: string, delta: number) => void;
  onRemoveCartItem: (cartLineId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onDirectWhatsAppOrder: () => void;
  ownerWhatsApp: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  orderType,
  onSetOrderType,
  tableNumber,
  onSetTableNumber,
  selectedDeliveryArea,
  onSetDeliveryArea,
  onUpdateCartItemQty,
  onRemoveCartItem,
  onClearCart,
  onProceedToCheckout,
  onDirectWhatsAppOrder,
  ownerWhatsApp
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
  // Delivery exclusively in Aligarh at flat 30 rupees charge
  const deliveryFee = orderType === 'delivery' ? 30 : 0;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + deliveryFee + tax;
  const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-stone-900">
                  Your Order Tray
                </h3>
                <span className="text-xs font-mono text-stone-500">
                  {totalCount} {totalCount === 1 ? 'dish' : 'dishes'} selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fulfillment Toggle */}
          <div className="p-4 border-b border-stone-200 bg-stone-50/50">
            <span className="block text-xs font-mono text-stone-600 uppercase tracking-wider mb-2 font-semibold">
              Fulfillment Method:
            </span>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
              <button
                type="button"
                onClick={() => onSetOrderType('delivery')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  orderType === 'delivery'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Delivery
              </button>
              <button
                type="button"
                onClick={() => onSetOrderType('dine_in')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  orderType === 'dine_in'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Dine-In
              </button>
              <button
                type="button"
                onClick={() => onSetOrderType('takeaway')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  orderType === 'takeaway'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Takeaway
              </button>
            </div>

            {orderType === 'dine_in' && (
              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-xs text-stone-700 font-semibold">Table No:</span>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => onSetTableNumber(e.target.value)}
                  placeholder="e.g. Table 4"
                  className="px-2.5 py-1 text-xs rounded-lg bg-white border border-stone-300 text-stone-900 font-mono w-28 focus:outline-none focus:border-emerald-600"
                />
                <span className="text-[11px] text-stone-500">Marris Rd cafe</span>
              </div>
            )}

            {orderType === 'delivery' && (
              <div className="mt-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-stone-700 font-medium">
                  <span className="font-semibold text-emerald-900">Delivery in Aligarh Only:</span>
                  <span className="text-[11px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                    Flat ₹30 Delivery Charge
                  </span>
                </div>
                <select
                  value={selectedDeliveryArea}
                  onChange={(e) => onSetDeliveryArea(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-stone-300 text-stone-800 focus:outline-none focus:border-emerald-600"
                >
                  {ALIGARH_DELIVERY_AREAS.map((area) => (
                    <option key={area.name} value={area.name}>
                      {area.name} ({area.time}) · ₹30
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-stone-500">
                  ⚠️ Note: Delivery service is available exclusively within Aligarh city limits.
                </p>
              </div>
            )}
          </div>

          {/* Cart Itemized List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <ShoppingBag className="w-12 h-12 text-stone-300 mb-2 stroke-1" />
                <h4 className="text-base font-serif font-bold text-stone-700">
                  Your tray is empty
                </h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Select your favorite coffees, 15cm gourmet subs, or bento cakes to order.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-mono text-stone-500 uppercase font-semibold">
                    Items in Order
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-stone-400 hover:text-red-600 transition-colors"
                  >
                    Clear Tray
                  </button>
                </div>

                {cart.map((item) => {
                  const itemImg = item.menuItem.image || getDishImageUrl(item.menuItem.id, item.menuItem.name, item.menuItem.category);
                  return (
                    <div
                      key={item.cartLineId}
                      className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/90 flex flex-col gap-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <img
                          src={itemImg}
                          alt={item.menuItem.name}
                          className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0 shadow-2xs"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <div
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                item.menuItem.dietary === 'veg'
                                  ? 'bg-emerald-600'
                                  : item.menuItem.dietary === 'vegan'
                                  ? 'bg-teal-600'
                                  : 'bg-red-600'
                              }`}
                            />
                            <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                              {item.menuItem.name}
                            </h4>
                          </div>

                          {/* Customizations display */}
                          <div className="mt-1 space-y-0.5 text-[11px] text-stone-600">
                            {item.selectedSize && (
                              <span className="block text-emerald-800 font-semibold">
                                Size: {item.selectedSize.label}
                              </span>
                            )}
                            {item.selectedMilk && (
                              <span className="block text-amber-800">
                                Milk: {item.selectedMilk}
                              </span>
                            )}
                            {item.selectedSweetness && (
                              <span className="block text-stone-600">
                                Sweetness: {item.selectedSweetness}
                              </span>
                            )}
                            {item.selectedExtras && item.selectedExtras.length > 0 && (
                              <span className="block text-emerald-800">
                                Extras: {item.selectedExtras.map((e) => e.name).join(', ')}
                              </span>
                            )}
                            {item.specialInstructions && (
                              <span className="block italic text-stone-500">
                                "{item.specialInstructions}"
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-sm font-extrabold font-mono text-stone-900 tabular-nums">
                            ₹{item.itemTotal}
                          </span>
                        </div>
                      </div>

                    {/* Stepper & Delete */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                      <button
                        onClick={() => onRemoveCartItem(item.cartLineId)}
                        className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center rounded-lg bg-white border border-stone-300 p-0.5">
                        <button
                          onClick={() => onUpdateCartItemQty(item.cartLineId, -1)}
                          className="p-1 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-stone-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateCartItemQty(item.cartLineId, 1)}
                          className="p-1 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              </>
            )}
          </div>

          {/* Drawer Bottom Actions: Direct WhatsApp & Standard Checkout */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-stone-900 font-bold tabular-nums">₹{subtotal}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Charge (Aligarh City)</span>
                    <span className="font-mono text-stone-900 font-bold tabular-nums">
                      ₹30
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-mono text-stone-900 tabular-nums">₹{tax}</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-stone-200 text-sm font-extrabold text-stone-900">
                  <span>Grand Total</span>
                  <span className="font-mono text-emerald-800 text-base tabular-nums">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Order Primary CTA */}
              <button
                onClick={onDirectWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send Order Directly on WhatsApp</span>
              </button>

              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all shadow-xs"
              >
                <span>Complete Checkout on Web</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
