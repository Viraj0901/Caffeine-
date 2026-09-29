import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, PlusCircle, Award, AlertCircle, MessageCircle, Edit2 } from 'lucide-react';
import { MenuItem, MenuCategory, CartItem, SizeOption } from '../types';
import { DishIllustration } from './DishIllustration';

interface MenuSectionProps {
  menuItems: MenuItem[];
  categories: MenuCategory[];
  cart: CartItem[];
  onAddToCart: (item: MenuItem, selectedSize?: SizeOption) => void;
  onUpdateCartQuantity: (item: MenuItem, delta: number) => void;
  onCustomizeItem: (item: MenuItem) => void;
  onOpenAddDishModal: () => void;
  onOpenWhatsAppDirect: () => void;
  isOwnerLoggedIn: boolean;
  onEditItemByOwner?: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  categories,
  cart,
  onAddToCart,
  onUpdateCartQuantity,
  onCustomizeItem,
  onOpenAddDishModal,
  onOpenWhatsAppDirect,
  isOwnerLoggedIn,
  onEditItemByOwner
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'vegan' | 'chef-pick'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  // Filter & sort logic
  const filteredItems = useMemo(() => {
    return menuItems
      .filter((item) => {
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }
        if (dietaryFilter === 'veg' && item.dietary !== 'veg') return false;
        if (dietaryFilter === 'vegan' && item.dietary !== 'vegan') return false;
        if (dietaryFilter === 'chef-pick' && !item.isChefSpecial) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchCat = item.category.toLowerCase().includes(q);
          const matchSub = item.subCategory?.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat && !matchSub) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (a.isAvailable !== b.isAvailable) return a.isAvailable ? -1 : 1;
        if (a.isChefSpecial && !b.isChefSpecial) return -1;
        if (!a.isChefSpecial && b.isChefSpecial) return 1;
        return 0;
      });
  }, [menuItems, selectedCategory, dietaryFilter, searchQuery, sortBy]);

  const getItemQuantityInCart = (itemId: string) => {
    return cart
      .filter((ci) => ci.menuItem.id === itemId)
      .reduce((sum, ci) => sum + ci.quantity, 0);
  };

  return (
    <section id="menu-section" className="py-12 sm:py-20 bg-[#faf7f2] text-stone-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold mb-1">
              <span>Authentic Caffeine Gourmet Catalog</span>
              <span aria-hidden="true">·</span>
              <span>Freshly Prepared Daily</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-stone-900">
              The Cafe & Diner Menu
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
              Real recipes from Caffeine Aligarh on Marris Road. Order online with live tracking, 
              or chat directly on WhatsApp to have your order sent straight to the restaurant.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenWhatsAppDirect}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Order</span>
            </button>

            {/* ONLY visible to authenticated Owner */}
            {isOwnerLoggedIn && (
              <button
                onClick={onOpenAddDishModal}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs sm:text-sm font-semibold transition-all shadow-xs"
              >
                <PlusCircle className="w-4 h-4 text-amber-700" />
                <span>+ Add Dish (Owner)</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar 1: Category Navigation Tabs */}
        <div className="pt-6 pb-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300'
              }`}
            >
              All Catalog ({menuItems.length})
            </button>
            {categories.map((cat) => {
              const count = menuItems.filter((i) => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Bar 2: Search, Dietary Filters, and Sorting */}
        <div className="py-3 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coffee, sub, wrap, rice bowl, momos, pizza, bento..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-900 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-800"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Selectors */}
          <div className="md:col-span-4 flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                dietaryFilter === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 border border-stone-200'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                dietaryFilter === 'veg'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-white text-stone-600 border border-stone-200 hover:text-emerald-700'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Veg</span>
            </button>
            <button
              onClick={() => setDietaryFilter('vegan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                dietaryFilter === 'vegan'
                  ? 'bg-teal-100 text-teal-900 border border-teal-300'
                  : 'bg-white text-stone-600 border border-stone-200 hover:text-teal-700'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-teal-600" />
              <span>Vegan</span>
            </button>
            <button
              onClick={() => setDietaryFilter('chef-pick')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                dietaryFilter === 'chef-pick'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-white text-stone-600 border border-stone-200 hover:text-amber-700'
              }`}
            >
              <Award className="w-3 h-3 text-amber-600" />
              <span>Chef's Pick</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-2 flex justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full md:w-auto px-3 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-medium focus:outline-none focus:border-emerald-600 shadow-2xs"
            >
              <option value="default">Sort: Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid with real images matching dish name */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-dashed border-stone-300 bg-white">
            <AlertCircle className="mx-auto w-10 h-10 text-stone-400 mb-2" />
            <h3 className="text-lg font-serif font-bold text-stone-800">No dishes found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              No items match this search. Try resetting filters or search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5">
            {filteredItems.map((item) => {
              const qtyInCart = getItemQuantityInCart(item.id);
              const hasCustomizations =
                (item.milks && item.milks.length > 0) ||
                (item.extras && item.extras.length > 0) ||
                (item.sweetnessLevels && item.sweetnessLevels.length > 0);

              return (
                <div
                  key={item.id}
                  className={`group flex flex-col justify-between rounded-2xl bg-white border border-stone-200/90 overflow-hidden hover:border-emerald-600/60 hover:-translate-y-0.5 transition-all duration-200 shadow-xs hover:shadow-md ${
                    !item.isAvailable ? 'opacity-70' : ''
                  }`}
                >
                  <div>
                    {/* Visual Illustration & Real Photo Banner */}
                    <div className="relative">
                      <DishIllustration item={item} />
                      {!item.isAvailable && (
                        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center">
                          <span className="px-3 py-1 bg-white text-stone-900 font-bold text-xs font-mono rounded-md shadow">
                            Sold Out Today
                          </span>
                        </div>
                      )}

                      {/* Owner Quick Edit Button */}
                      {isOwnerLoggedIn && onEditItemByOwner && (
                        <button
                          onClick={() => onEditItemByOwner(item)}
                          className="absolute bottom-2 right-2 z-20 p-1.5 rounded-lg bg-white/95 text-stone-800 hover:text-emerald-800 shadow-md border border-stone-200 text-xs font-mono flex items-center gap-1"
                          title="Edit this item (Owner)"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      )}
                    </div>

                    {/* Content Body */}
                    <div className="p-5">
                      {/* Subcategory or Special Tag */}
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5 font-medium">
                        <span className="text-emerald-800 font-semibold">{item.subCategory || item.category.replace(/-/g, ' ')}</span>
                        {item.isChefSpecial && (
                          <>
                            <span aria-hidden="true" className="text-stone-300">·</span>
                            <span className="text-amber-700 font-bold">Chef's Signature</span>
                          </>
                        )}
                        {item.isBestseller && (
                          <>
                            <span aria-hidden="true" className="text-stone-300">·</span>
                            <span className="text-orange-700 font-bold">Bestseller</span>
                          </>
                        )}
                      </div>

                      {/* Dish Title */}
                      <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-stone-600 mt-1.5 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Size Options */}
                      {item.sizeOptions && item.sizeOptions.length > 0 && (
                        <div className="mt-3 flex items-center gap-1.5">
                          <span className="text-[11px] font-mono text-stone-500">Sizes:</span>
                          <div className="flex gap-1">
                            {item.sizeOptions.map((opt) => (
                              <button
                                key={opt.label}
                                onClick={() => onAddToCart(item, opt)}
                                className="px-2 py-0.5 rounded text-[11px] font-mono bg-stone-100 hover:bg-emerald-100 text-stone-800 border border-stone-200 transition-colors"
                              >
                                {opt.label}: ₹{opt.price}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: Price and Buy Module */}
                  <div className="p-5 pt-0 mt-2 flex items-center justify-between border-t border-stone-100 pt-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-stone-500 uppercase font-mono tracking-wider">Price</span>
                      <span className="text-xl font-extrabold font-mono tabular-nums text-stone-900">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Interactive Add or Stepper */}
                    {!item.isAvailable ? (
                      <button
                        disabled
                        className="px-3.5 py-2 rounded-xl bg-stone-100 text-stone-400 text-xs font-mono cursor-not-allowed"
                      >
                        Unavailable
                      </button>
                    ) : qtyInCart > 0 ? (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-xl bg-stone-100 border border-emerald-500/40 p-1">
                          <button
                            onClick={() => onUpdateCartQuantity(item, -1)}
                            className="p-1 rounded-md text-stone-700 hover:text-emerald-800 hover:bg-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-emerald-800 tabular-nums">
                            {qtyInCart}
                          </span>
                          <button
                            onClick={() => onUpdateCartQuantity(item, 1)}
                            className="p-1 rounded-md text-stone-700 hover:text-emerald-800 hover:bg-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {hasCustomizations && (
                          <button
                            onClick={() => onCustomizeItem(item)}
                            className="text-[11px] text-emerald-700 font-semibold hover:underline"
                          >
                            Options
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        {hasCustomizations && (
                          <button
                            onClick={() => onCustomizeItem(item)}
                            className="px-2.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
                          >
                            Customize
                          </button>
                        )}
                        <button
                          onClick={() => onAddToCart(item)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all active:scale-95 shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Tray</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
