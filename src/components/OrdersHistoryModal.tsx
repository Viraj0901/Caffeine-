import React from 'react';
import { X, Clock, CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrdersHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onUpdateOrderStatus?: (orderId: string, status: OrderStatus) => void;
}

export const OrdersHistoryModal: React.FC<OrdersHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onSelectOrder,
  onUpdateOrderStatus
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden my-auto animate-fadeIn text-stone-900">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900">
              Live Orders & Order History
            </h3>
            <p className="text-xs text-stone-500">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed this session
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-3">
          {orders.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <Package className="w-12 h-12 mx-auto text-stone-300 mb-2 stroke-1" />
              <p className="text-sm font-semibold text-stone-700">No active orders yet</p>
              <p className="text-xs text-stone-500 mt-1">
                Explore the menu to order your favorite coffees, wraps, or bento cakes.
              </p>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-800">#{ord.id}</span>
                    <span className="text-xs text-stone-500">· {ord.createdAt}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-white text-stone-700 border border-stone-200 uppercase font-mono font-semibold">
                      {ord.orderType.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-extrabold text-stone-900">
                      ₹{ord.total}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                        ord.status === 'delivered' || ord.status === 'ready'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-stone-600 space-y-0.5">
                  <div>
                    <span className="text-stone-900 font-semibold">{ord.customerName}</span> ({ord.customerPhone})
                  </div>
                  {ord.tableNumber && <div>Table: {ord.tableNumber} (Marris Rd)</div>}
                  {ord.deliveryAddress && (
                    <div>Delivery: {ord.deliveryAddress}, {ord.deliveryArea}</div>
                  )}
                  <div className="text-stone-800 font-medium">
                    Dishes: {ord.items.map((i) => `${i.menuItem.name} (${i.quantity})`).join(', ')}
                  </div>
                </div>

                {/* Status Updater for Staff */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                  {onUpdateOrderStatus && (
                    <div className="flex items-center gap-1.5 text-xs text-stone-600">
                      <span>Kitchen Status:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="px-2 py-1 text-xs rounded-lg bg-white border border-stone-300 text-stone-800"
                      >
                        <option value="placed">Placed</option>
                        <option value="brewing">Brewing in Kitchen</option>
                        <option value="ready">Ready for Table / Pickup</option>
                        <option value="delivered">Delivered / Served</option>
                      </select>
                    </div>
                  )}

                  <button
                    onClick={() => onSelectOrder(ord)}
                    className="flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-bold ml-auto"
                  >
                    <span>View Receipt</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
