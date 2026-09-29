import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { MenuManagerModal } from './components/MenuManagerModal';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrdersHistoryModal } from './components/OrdersHistoryModal';
import { LocationAndHoursSection } from './components/LocationAndHoursSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { WhatsAppQuickWidget } from './components/WhatsAppQuickWidget';
import { OwnerLoginModal } from './components/OwnerLoginModal';
import { SafetyBanner } from './components/SafetyBanner';
import { PublishingSafetyModal } from './components/PublishingSafetyModal';
import {
  CAFFEINE_RESTAURANT_INFO,
  INITIAL_CATEGORIES,
  INITIAL_MENU_ITEMS,
  ALIGARH_DELIVERY_AREAS
} from './data/restaurantData';
import {
  MenuItem,
  MenuCategory,
  CartItem,
  Order,
  OrderType,
  OrderStatus,
  CustomizationExtra,
  SizeOption
} from './types';
import { ShoppingBag, MessageCircle } from 'lucide-react';

export default function App() {
  // Owner Authentication State (Secures Owner Portal & Add Dish controls)
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('caffeine_is_owner_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [isOwnerLoginOpen, setIsOwnerLoginOpen] = useState(false);

  // Owner WhatsApp phone number state with persistence (+91 6396408445)
  const [ownerWhatsApp, setOwnerWhatsApp] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('caffeine_owner_whatsapp');
      if (saved && saved !== '919412378901') return saved;
      return '916396408445';
    } catch {
      return '916396408445';
    }
  });

  // Menu items state
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('caffeine_menu_items_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: any) => {
            const { macros, ...rest } = item;
            return rest as MenuItem;
          });
        }
      }
    } catch (e) {
      console.error('Error loading menu items:', e);
    }
    return INITIAL_MENU_ITEMS;
  });

  // Categories state
  const [categories, setCategories] = useState<MenuCategory[]>(() => {
    try {
      const saved = localStorage.getItem('caffeine_categories_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading categories:', e);
    }
    return INITIAL_CATEGORIES;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('caffeine_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('caffeine_orders_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Order fulfillment options
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [tableNumber, setTableNumber] = useState<string>('Table 2');
  const [selectedDeliveryArea, setSelectedDeliveryArea] = useState<string>(
    ALIGARH_DELIVERY_AREAS[0]?.name || 'Begpur & Marris Road'
  );

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuManagerOpen, setIsMenuManagerOpen] = useState(false);
  const [itemBeingEdited, setItemBeingEdited] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [itemToCustomize, setItemToCustomize] = useState<MenuItem | null>(null);
  const [isOrderConfirmOpen, setIsOrderConfirmOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isOrdersHistoryOpen, setIsOrdersHistoryOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [safetyModalTab, setSafetyModalTab] = useState<'safety' | 'security' | 'value' | 'policies'>('safety');

  const handleOpenSafetyModal = (tab: 'safety' | 'security' | 'value' | 'policies' = 'safety') => {
    setSafetyModalTab(tab);
    setIsSafetyModalOpen(true);
  };

  // Secret shortcut for owner: Ctrl+Shift+A opens Owner Login
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (isOwnerLoggedIn) {
          setIsMenuManagerOpen(true);
        } else {
          setIsOwnerLoginOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOwnerLoggedIn]);

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem('caffeine_owner_whatsapp', ownerWhatsApp);
    } catch (e) {
      console.error(e);
    }
  }, [ownerWhatsApp]);

  useEffect(() => {
    try {
      localStorage.setItem('caffeine_menu_items_v2', JSON.stringify(menuItems));
    } catch (e) {
      console.error(e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem('caffeine_categories_v2', JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('caffeine_cart_v2', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('caffeine_orders_v2', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Delivery fee is flat ₹30 strictly in Aligarh
  const currentDeliveryFee = orderType === 'delivery' ? 30 : 0;

  // Cart Handlers
  const handleAddToCart = (item: MenuItem, selectedSize?: SizeOption) => {
    if (item.milks && item.milks.length > 0) {
      setItemToCustomize(item);
      setIsCustomizeOpen(true);
      return;
    }

    const price = selectedSize ? selectedSize.price : item.price;

    setCart((prev) => {
      const existing = prev.find(
        (ci) =>
          ci.menuItem.id === item.id &&
          ci.selectedSize?.label === selectedSize?.label &&
          !ci.selectedMilk &&
          (!ci.selectedExtras || ci.selectedExtras.length === 0)
      );

      if (existing) {
        return prev.map((ci) =>
          ci.cartLineId === existing.cartLineId
            ? {
                ...ci,
                quantity: ci.quantity + 1,
                itemTotal: (ci.quantity + 1) * price
              }
            : ci
        );
      }

      const newLine: CartItem = {
        cartLineId: `line-${item.id}-${Date.now()}`,
        menuItem: item,
        quantity: 1,
        selectedSize,
        selectedExtras: [],
        itemTotal: price
      };
      return [...prev, newLine];
    });
  };

  const handleUpdateCartQuantity = (item: MenuItem, delta: number) => {
    setCart((prev) => {
      const target = prev.find((ci) => ci.menuItem.id === item.id);
      if (!target) return prev;

      const newQty = target.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((ci) => ci.cartLineId !== target.cartLineId);
      }

      const unitPrice = target.itemTotal / target.quantity;
      return prev.map((ci) =>
        ci.cartLineId === target.cartLineId
          ? {
              ...ci,
              quantity: newQty,
              itemTotal: newQty * unitPrice
            }
          : ci
      );
    });
  };

  const handleUpdateCartItemQtyById = (cartLineId: string, delta: number) => {
    setCart((prev) => {
      const target = prev.find((ci) => ci.cartLineId === cartLineId);
      if (!target) return prev;

      const newQty = target.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((ci) => ci.cartLineId !== cartLineId);
      }

      const unitPrice = target.itemTotal / target.quantity;
      return prev.map((ci) =>
        ci.cartLineId === cartLineId
          ? {
              ...ci,
              quantity: newQty,
              itemTotal: newQty * unitPrice
            }
          : ci
      );
    });
  };

  const handleRemoveCartItem = (cartLineId: string) => {
    setCart((prev) => prev.filter((ci) => ci.cartLineId !== cartLineId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCustomizeItem = (item: MenuItem) => {
    setItemToCustomize(item);
    setIsCustomizeOpen(true);
  };

  const handleConfirmCustomize = (
    item: MenuItem,
    selectedSize?: SizeOption,
    selectedMilk?: string,
    selectedSweetness?: string,
    selectedExtras?: CustomizationExtra[],
    specialInstructions?: string
  ) => {
    const basePrice = selectedSize ? selectedSize.price : item.price;
    const extrasPrice = (selectedExtras || []).reduce((acc, e) => acc + e.price, 0);
    const unitPrice = basePrice + extrasPrice;

    const newLine: CartItem = {
      cartLineId: `custom-line-${item.id}-${Date.now()}`,
      menuItem: item,
      quantity: 1,
      selectedSize,
      selectedMilk,
      selectedSweetness,
      selectedExtras: selectedExtras || [],
      specialInstructions,
      itemTotal: unitPrice
    };

    setCart((prev) => [...prev, newLine]);
    setIsCartOpen(true);
  };

  // Direct WhatsApp Order Trigger
  const handleDirectWhatsAppOrder = () => {
    const phone = ownerWhatsApp || '916396408445';
    if (cart.length === 0) {
      const text = encodeURIComponent('Hello Caffeine! I want to inquire about menu and order delivery/table.');
      const link = document.createElement('a');
      link.href = `https://wa.me/${phone}?text=${text}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
      return;
    }

    let msg = `*NEW CAFFEINE WHATSAPP ORDER*\n`;
    msg += `Fulfillment: *${orderType.toUpperCase()}* ${
      orderType === 'dine_in' ? `(${tableNumber} - Marris Rd Branch)` : '(Delivery in Aligarh Only)'
    }\n`;
    if (orderType === 'delivery') {
      msg += `Delivery Area (Aligarh City): ${selectedDeliveryArea}\n`;
    }
    msg += `\n*ITEMS ORDERED:*\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.menuItem.name}* x ${item.quantity} - ₹${item.itemTotal}\n`;
      if (item.selectedSize) msg += `   - Size: ${item.selectedSize.label}\n`;
      if (item.selectedMilk) msg += `   - Milk: ${item.selectedMilk}\n`;
      if (item.selectedExtras.length > 0)
        msg += `   - Extras: ${item.selectedExtras.map((e) => e.name).join(', ')}\n`;
    });
    msg += `\nSubtotal: ₹${cartSubtotal}\n`;
    if (currentDeliveryFee > 0) msg += `Delivery Fee (Aligarh City): ₹30\n`;
    msg += `GST (5%): ₹${Math.round(cartSubtotal * 0.05)}\n`;
    msg += `*Total Amount: ₹${cartSubtotal + currentDeliveryFee + Math.round(cartSubtotal * 0.05)}*\n\n`;
    msg += `Please confirm my order and approximate preparation time.`;

    const encoded = encodeURIComponent(msg);
    const link = document.createElement('a');
    link.href = `https://wa.me/${phone}?text=${encoded}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  };

  // Owner Handlers
  const handleOwnerLoginSuccess = () => {
    setIsOwnerLoggedIn(true);
    sessionStorage.setItem('caffeine_is_owner_authenticated', 'true');
    setIsMenuManagerOpen(true);
  };

  const handleOwnerLogout = () => {
    setIsOwnerLoggedIn(false);
    sessionStorage.removeItem('caffeine_is_owner_authenticated');
    setIsMenuManagerOpen(false);
  };

  const handleAddMenuItem = (newItem: MenuItem) => {
    setMenuItems((prev) => [newItem, ...prev]);

    const catExists = categories.some((c) => c.id === newItem.category);
    if (!catExists) {
      const formattedName = newItem.category
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      setCategories((prev) => [
        ...prev,
        {
          id: newItem.category,
          name: formattedName,
          iconName: 'Utensils',
          description: 'Specialty creation'
        }
      ]);
    }
  };

  const handleUpdateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== id));
  };

  const handleToggleAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const handleResetMenuToDefault = () => {
    setMenuItems(INITIAL_MENU_ITEMS);
    setCategories(INITIAL_CATEGORIES);
  };

  const handleOrderSuccess = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setConfirmedOrder(order);
    setIsOrderConfirmOpen(true);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        cartItemCount={cartItemCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenuManager={() => {
          if (isOwnerLoggedIn) {
            setIsMenuManagerOpen(true);
          } else {
            setIsOwnerLoginOpen(true);
          }
        }}
        onOpenOrderHistory={() => setIsOrdersHistoryOpen(true)}
        onOpenWhatsAppDirect={handleDirectWhatsAppOrder}
        activeSection="menu"
        orderCount={orders.length}
        ownerWhatsApp={ownerWhatsApp}
        isOwnerLoggedIn={isOwnerLoggedIn}
        onOwnerLogout={handleOwnerLogout}
        onOpenSafetyModal={handleOpenSafetyModal}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          restaurant={CAFFEINE_RESTAURANT_INFO}
          onExploreMenu={scrollToMenu}
          onSelectOrderType={(type) => setOrderType(type)}
          onOpenWhatsAppDirect={handleDirectWhatsAppOrder}
          ownerWhatsApp={ownerWhatsApp}
          isOwnerLoggedIn={isOwnerLoggedIn}
          onOpenMenuManager={() => setIsMenuManagerOpen(true)}
        />

        {/* Safety & Publishing Standards Trust Banner */}
        <SafetyBanner onOpenSafetyModal={handleOpenSafetyModal} />

        {/* Real Menu Catalog Section */}
        <MenuSection
          menuItems={menuItems}
          categories={categories}
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onCustomizeItem={handleCustomizeItem}
          onOpenAddDishModal={() => {
            setItemBeingEdited(null);
            setIsMenuManagerOpen(true);
          }}
          onOpenWhatsAppDirect={handleDirectWhatsAppOrder}
          isOwnerLoggedIn={isOwnerLoggedIn}
          onEditItemByOwner={(item) => {
            setItemBeingEdited(item);
            setIsMenuManagerOpen(true);
          }}
        />

        {/* Physical Location, Interactive Leaflet Map & Hours */}
        <LocationAndHoursSection
          restaurant={CAFFEINE_RESTAURANT_INFO}
          ownerWhatsApp={ownerWhatsApp}
        />

        {/* 4.9★ Google Reviews */}
        <ReviewsSection />
      </main>

      {/* Domain-Native Footer (with secluded Owner Login link) */}
      <Footer
        onOpenMenuManager={() => setIsMenuManagerOpen(true)}
        onExploreMenu={scrollToMenu}
        ownerWhatsApp={ownerWhatsApp}
        isOwnerLoggedIn={isOwnerLoggedIn}
        onOwnerLogout={handleOwnerLogout}
        onOpenOwnerLogin={() => setIsOwnerLoginOpen(true)}
        onOpenSafetyModal={handleOpenSafetyModal}
      />

      {/* Floating Direct WhatsApp Order Widget */}
      <WhatsAppQuickWidget
        ownerWhatsApp={ownerWhatsApp}
        cartCount={cartItemCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Mobile Fixed Quick Bar */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-30 flex items-center gap-2 p-2 rounded-2xl bg-white/95 border border-stone-200 shadow-xl backdrop-blur-md">
        <button
          onClick={handleDirectWhatsAppOrder}
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-extrabold text-xs"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Tray ({cartItemCount}) · ₹{cartSubtotal}</span>
        </button>
      </div>

      {/* Modals */}
      {/* 1. Owner Login Modal (PIN Protected, default: 1234) */}
      <OwnerLoginModal
        isOpen={isOwnerLoginOpen}
        onClose={() => setIsOwnerLoginOpen(false)}
        onLoginSuccess={handleOwnerLoginSuccess}
      />

      {/* 2. Menu Management & WhatsApp Configuration Portal (Owner Only) */}
      <MenuManagerModal
        isOpen={isMenuManagerOpen}
        onClose={() => {
          setIsMenuManagerOpen(false);
          setItemBeingEdited(null);
        }}
        menuItems={menuItems}
        categories={categories}
        onAddMenuItem={handleAddMenuItem}
        onUpdateMenuItem={handleUpdateMenuItem}
        onDeleteMenuItem={handleDeleteMenuItem}
        onToggleAvailability={handleToggleAvailability}
        onResetMenuToDefault={handleResetMenuToDefault}
        ownerWhatsApp={ownerWhatsApp}
        onUpdateOwnerWhatsApp={(phone) => setOwnerWhatsApp(phone)}
        isOwnerLoggedIn={isOwnerLoggedIn}
        initialEditingItem={itemBeingEdited}
      />

      {/* 3. Item Customizer (Sizes, Milk, Sweetness, Extras) */}
      <ItemCustomizeModal
        item={itemToCustomize}
        isOpen={isCustomizeOpen}
        onClose={() => {
          setIsCustomizeOpen(false);
          setItemToCustomize(null);
        }}
        onConfirm={handleConfirmCustomize}
      />

      {/* 4. Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        orderType={orderType}
        onSetOrderType={setOrderType}
        tableNumber={tableNumber}
        onSetTableNumber={setTableNumber}
        selectedDeliveryArea={selectedDeliveryArea}
        onSetDeliveryArea={setSelectedDeliveryArea}
        onUpdateCartItemQty={handleUpdateCartItemQtyById}
        onRemoveCartItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onDirectWhatsAppOrder={() => {
          setIsCartOpen(false);
          handleDirectWhatsAppOrder();
        }}
        ownerWhatsApp={ownerWhatsApp}
      />

      {/* 5. Checkout Modal with Direct WhatsApp Dispatch */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        orderType={orderType}
        tableNumber={tableNumber}
        selectedDeliveryArea={selectedDeliveryArea}
        deliveryFee={currentDeliveryFee}
        onOrderSuccess={handleOrderSuccess}
        ownerWhatsApp={ownerWhatsApp}
      />

      {/* 6. Order Confirmation & WhatsApp Receipt Modal */}
      <OrderConfirmationModal
        isOpen={isOrderConfirmOpen}
        onClose={() => setIsOrderConfirmOpen(false)}
        order={confirmedOrder}
        ownerWhatsApp={ownerWhatsApp}
      />

      {/* 7. Live Orders Portal */}
      <OrdersHistoryModal
        isOpen={isOrdersHistoryOpen}
        onClose={() => setIsOrdersHistoryOpen(false)}
        orders={orders}
        onSelectOrder={(ord) => {
          setConfirmedOrder(ord);
          setIsOrdersHistoryOpen(false);
          setIsOrderConfirmOpen(true);
        }}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* 8. Publishing Safety, Standards & Value Assurance Modal */}
      <PublishingSafetyModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
        initialTab={safetyModalTab}
        ownerWhatsApp={ownerWhatsApp}
      />
    </div>
  );
}
