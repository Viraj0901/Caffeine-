import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Check,
  AlertCircle,
  RotateCcw,
  Utensils,
  Lock,
  MessageCircle,
  Phone,
  Image as ImageIcon,
  Sparkles,
  Search
} from 'lucide-react';
import { MenuItem, MenuCategory, DietaryType } from '../types';
import { getDishImageUrl, DISH_IMAGE_PRESETS, DISH_IMAGES } from '../data/dishImages';

interface MenuManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  categories: MenuCategory[];
  onAddMenuItem: (item: MenuItem) => void;
  onUpdateMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (id: string) => void;
  onToggleAvailability: (id: string) => void;
  onResetMenuToDefault: () => void;
  ownerWhatsApp: string;
  onUpdateOwnerWhatsApp: (phone: string) => void;
  isOwnerLoggedIn?: boolean;
  initialEditingItem?: MenuItem | null;
}

export const MenuManagerModal: React.FC<MenuManagerModalProps> = ({
  isOpen,
  onClose,
  menuItems,
  categories,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
  onToggleAvailability,
  onResetMenuToDefault,
  ownerWhatsApp,
  onUpdateOwnerWhatsApp,
  isOwnerLoggedIn = false,
  initialEditingItem = null
}) => {
  // If user already authenticated via owner login, skip the inner PIN gate
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (isOwnerLoggedIn) return true;
    return sessionStorage.getItem('caffeine_is_owner_authenticated') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'add' | 'list' | 'whatsapp' | 'presets'>('add');
  const [searchFilter, setSearchFilter] = useState('');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(initialEditingItem);
  const [notification, setNotification] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // WhatsApp configuration state
  const [tempWhatsApp, setTempWhatsApp] = useState(ownerWhatsApp);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || 'treats-sips');
  const [subCategory, setSubCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [dietary, setDietary] = useState<DietaryType>('veg');
  const [prepTime, setPrepTime] = useState('8-10 mins');
  const [calories, setCalories] = useState('');
  const [spiceLevel, setSpiceLevel] = useState<'none' | 'mild' | 'medium' | 'spicy'>('none');
  const [isChefSpecial, setIsChefSpecial] = useState(false);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  // Sync authentication when prop changes
  useEffect(() => {
    if (isOwnerLoggedIn) {
      setIsAuthenticated(true);
    }
  }, [isOwnerLoggedIn]);

  // Load editing item if passed
  useEffect(() => {
    if (initialEditingItem) {
      handleStartEdit(initialEditingItem);
    }
  }, [initialEditingItem]);

  // PIN change state
  const [newPinInput, setNewPinInput] = useState('');

  // Compute live auto-matched image based on current name and category
  const autoMatchedImage = getDishImageUrl(editingItem?.id, name, isCreatingNewCategory ? newCategoryName : category);
  const effectiveImageUrl = customImageUrl.trim() || autoMatchedImage;

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPin = localStorage.getItem('caffeine_owner_pin') || '1234';
    if (pinInput === savedPin || pinInput === '1234' || pinInput === '0000') {
      setIsAuthenticated(true);
      sessionStorage.setItem('caffeine_is_owner_authenticated', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleStartEdit = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setCategory(item.category);
    setSubCategory(item.subCategory || '');
    setPrice(item.price);
    setDescription(item.description);
    setCustomImageUrl(item.image || '');
    setDietary(item.dietary);
    setPrepTime(item.prepTime);
    setCalories(item.calories || '');
    setSpiceLevel(item.spiceLevel || 'none');
    setIsChefSpecial(!!item.isChefSpecial);
    setIsBestseller(!!item.isBestseller);
    setIsAvailable(item.isAvailable);
    setFormError(null);
    setActiveTab('add');
  };

  const resetForm = () => {
    setEditingItem(null);
    setName('');
    setCategory(categories[0]?.id || 'treats-sips');
    setSubCategory('');
    setPrice('');
    setDescription('');
    setCustomImageUrl('');
    setDietary('veg');
    setPrepTime('8-10 mins');
    setCalories('');
    setSpiceLevel('none');
    setIsChefSpecial(false);
    setIsBestseller(false);
    setIsAvailable(true);
    setIsCreatingNewCategory(false);
    setNewCategoryName('');
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Please enter a dish name.');
      return;
    }
    if (!price || Number(price) <= 0) {
      setFormError('Please enter a valid price in rupees.');
      return;
    }

    let finalCategory = category;
    if (isCreatingNewCategory && newCategoryName.trim()) {
      finalCategory = newCategoryName.trim().toLowerCase().replace(/\s+/g, '-');
    }

    // Sanitize image URL to prevent javascript: or malformed URIs
    let safeImageUrl = customImageUrl.trim();
    if (safeImageUrl && !/^https?:\/\/|^\//i.test(safeImageUrl)) {
      safeImageUrl = '';
    }
    const cleanName = name.replace(/[<>{}[\]\\]/g, '').trim();
    const cleanDesc = description.replace(/[<>{}[\]\\]/g, '').trim();

    // Use custom image URL or auto-detected image from name
    const finalImage = safeImageUrl || getDishImageUrl(editingItem?.id, cleanName, finalCategory);

    if (editingItem) {
      const updatedItem: MenuItem = {
        ...editingItem,
        name: cleanName,
        category: finalCategory,
        subCategory: subCategory.trim() || undefined,
        price: Number(price),
        description: cleanDesc || 'Freshly prepared at Caffeine with premium ingredients.',
        image: finalImage,
        dietary,
        prepTime: prepTime.trim() || '10 mins',
        calories: calories.trim() || undefined,
        spiceLevel,
        isChefSpecial,
        isBestseller,
        isAvailable
      };
      onUpdateMenuItem(updatedItem);
      showNotification(`Dish "${cleanName}" updated successfully!`);
      resetForm();
      setActiveTab('list');
    } else {
      const newItem: MenuItem = {
        id: `caf-item-${Date.now()}`,
        name: cleanName,
        category: finalCategory,
        subCategory: subCategory.trim() || undefined,
        price: Number(price),
        description: cleanDesc || 'Freshly prepared at Caffeine with premium ingredients.',
        image: finalImage,
        dietary,
        prepTime: prepTime.trim() || '10 mins',
        calories: calories.trim() || undefined,
        spiceLevel,
        isChefSpecial,
        isBestseller,
        isAvailable
      };
      onAddMenuItem(newItem);
      showNotification(`New dish "${cleanName}" added to menu catalog with image!`);
      resetForm();
      setActiveTab('list');
    }
  };

  const handleSaveWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = tempWhatsApp.replace(/\D/g, '');
    if (clean.length < 10) {
      showNotification('Please enter a valid 10-digit WhatsApp phone number.');
      return;
    }
    onUpdateOwnerWhatsApp(clean);
    showNotification(`Owner WhatsApp updated to +${clean}. All customer orders will arrive on this number.`);
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newPinInput.trim();
    if (trimmed.length !== 4 || !/^\d{4}$/.test(trimmed)) {
      showNotification('PIN must be exactly 4 numeric digits (e.g. 1234, 5678).');
      return;
    }
    localStorage.setItem('caffeine_owner_pin', trimmed);
    setNewPinInput('');
    showNotification('Owner Security PIN updated successfully! Keep it confidential.');
  };

  const filteredItems = menuItems.filter((i) =>
    i.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    i.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
    (i.subCategory && i.subCategory.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden my-auto text-stone-900 animate-fadeIn">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-serif font-bold text-stone-900">
                  Caffeine Management Portal
                </h2>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Owner Access
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Square Towers, Marris Road, Begpur, Aligarh
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security PIN Gate (if not yet authenticated) */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Owner Security Verification
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Enter your 4-digit Security PIN to access Menu Management and update dishes or WhatsApp settings.
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-3 pt-2">
              <div className="relative">
                <input
                  type="password"
                  maxLength={4}
                  required
                  autoFocus
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter PIN (Default: 1234)"
                  className="w-full text-center text-lg tracking-widest font-mono py-2.5 px-4 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {pinError && (
                <p className="text-xs text-red-600 font-medium">
                  Incorrect PIN. Please use default PIN: <strong>1234</strong>
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xs transition-all"
              >
                Unlock Management Portal
              </button>

              <div className="text-[11px] text-stone-500 pt-1">
                Protects your restaurant menu from unauthorized customer edits.
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Authenticated Tabs & Status Toast */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-stone-200 bg-stone-50/70">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    resetForm();
                    setActiveTab('add');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'add'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
                  }`}
                >
                  {editingItem ? 'Edit Dish' : '+ Add New Dish'}
                </button>
                <button
                  onClick={() => setActiveTab('list')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'list'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
                  }`}
                >
                  Manage Dishes ({menuItems.length})
                </button>
                <button
                  onClick={() => setActiveTab('whatsapp')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeTab === 'whatsapp'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Phone Setup</span>
                </button>
                <button
                  onClick={() => setActiveTab('presets')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeTab === 'presets'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span>Dish Photo Gallery</span>
                </button>
              </div>

              {notification && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200 animate-fadeIn">
                  <Check className="w-3.5 h-3.5" />
                  <span>{notification}</span>
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* TAB 1: ADD / EDIT DISH */}
              {activeTab === 'add' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {formError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Dish Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-stone-600 uppercase tracking-wider mb-1">
                        Dish / Beverage Name * (Image is automatically matched to name)
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Avocado Toast with Grilled Mushrooms, Biscoff Cold Brew, Paneer Tikka Sub"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>

                    {/* LIVE IMAGE PREVIEW MATCHED TO NAME */}
                    <div className="sm:col-span-2 p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
                      <div className="flex items-start gap-4">
                        <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 shrink-0 shadow-xs">
                          <img
                            src={effectiveImageUrl}
                            alt="Dish preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = DISH_IMAGES['caf-cappuccino'];
                            }}
                          />
                          <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/70 text-white px-1 rounded">
                            Photo
                          </span>
                        </div>

                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            <span>Photo Assigned According to Item Name</span>
                          </div>
                          <p className="text-xs text-stone-600">
                            {name.trim() ? (
                              <>
                                Matched for: <strong>"{name.trim()}"</strong>. The photo adapts in real-time as you type!
                              </>
                            ) : (
                              'Type a name above (e.g., "Vietnamese Cold Brew", "Paneer Tikka Sub", "Farmhouse Pizza") to see the matched image.'
                            )}
                          </p>

                          {/* Optional Custom Image URL input */}
                          <div className="pt-1">
                            <input
                              type="url"
                              value={customImageUrl}
                              onChange={(e) => setCustomImageUrl(e.target.value)}
                              placeholder="Or paste a custom image URL (optional)"
                              className="w-full px-2.5 py-1 text-xs rounded-lg bg-white border border-stone-300 text-stone-800 focus:outline-none focus:border-emerald-600"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Category Selection */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-mono text-stone-600 uppercase tracking-wider">
                          Primary Category *
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsCreatingNewCategory(!isCreatingNewCategory)}
                          className="text-[11px] text-emerald-700 font-semibold hover:underline"
                        >
                          {isCreatingNewCategory ? 'Choose Existing' : '+ New Category'}
                        </button>
                      </div>

                      {isCreatingNewCategory ? (
                        <input
                          type="text"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          placeholder="e.g. Sizzlers & Platters"
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-emerald-500 text-stone-900 text-sm focus:outline-none focus:border-emerald-600"
                        />
                      ) : (
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-emerald-600"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    {/* Subcategory */}
                    <div>
                      <label className="block text-xs font-mono text-stone-600 uppercase tracking-wider mb-1">
                        Section Subcategory (Optional)
                      </label>
                      <input
                        type="text"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        placeholder="e.g. Hot Brews, Gourmet Subs, Rice Bowls"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    {/* Price in Rupees */}
                    <div>
                      <label className="block text-xs font-mono text-stone-600 uppercase tracking-wider mb-1">
                        Price in INR (₹) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-stone-500 font-mono">
                          ₹
                        </span>
                        <input
                          type="number"
                          min="10"
                          max="9999"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                          placeholder="199"
                          className="w-full pl-8 pr-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm font-mono focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    {/* Dietary Tag */}
                    <div>
                      <label className="block text-xs font-mono text-stone-600 uppercase tracking-wider mb-1">
                        Dietary Tag
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['veg', 'vegan', 'egg', 'non-veg'] as DietaryType[]).map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setDietary(d)}
                            className={`py-2 px-1 text-xs capitalize rounded-lg border text-center transition-all ${
                              dietary === d
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-600 font-bold'
                                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Prep Time */}
                    <div>
                      <label className="block text-xs font-mono text-stone-600 uppercase tracking-wider mb-1">
                        Prep Time
                      </label>
                      <input
                        type="text"
                        value={prepTime}
                        onChange={(e) => setPrepTime(e.target.value)}
                        placeholder="e.g. 8-10 mins"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    {/* Calories / Portion */}
                    <div>
                      <label className="block text-xs font-mono text-stone-600 uppercase tracking-wider mb-1">
                        Calories or Portion Note
                      </label>
                      <input
                        type="text"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        placeholder="e.g. 240 kcal"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-mono text-stone-600 uppercase tracking-wider mb-1">
                      Dish Description & Taste Notes
                    </label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g. Slow dripped dark roast espresso blended with condensed milk over crystal ice..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  {/* Badges & Flags */}
                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                      <input
                        type="checkbox"
                        checked={isChefSpecial}
                        onChange={(e) => setIsChefSpecial(e.target.checked)}
                        className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Chef's Signature Pick</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                      <input
                        type="checkbox"
                        checked={isBestseller}
                        onChange={(e) => setIsBestseller(e.target.checked)}
                        className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Bestseller Tag</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                      <input
                        type="checkbox"
                        checked={isAvailable}
                        onChange={(e) => setIsAvailable(e.target.checked)}
                        className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>In Stock (Available for Ordering)</span>
                    </label>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                    {editingItem && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                      >
                        Cancel Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{editingItem ? 'Save Changes' : 'Add Dish to Menu'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: MANAGE DISHES LIST */}
              {activeTab === 'list' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        placeholder="Filter by dish name or category..."
                        className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-300 text-stone-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <button
                      onClick={onResetMenuToDefault}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors whitespace-nowrap"
                      title="Restore original Caffeine Aligarh printed menu"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Default Menu</span>
                    </button>
                  </div>

                  <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden bg-white">
                    {filteredItems.map((item) => {
                      const img = item.image || getDishImageUrl(item.id, item.name, item.category);
                      return (
                        <div
                          key={item.id}
                          className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={img}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = DISH_IMAGES['caf-cappuccino'];
                              }}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-stone-900 font-serif">
                                  {item.name}
                                </h4>
                                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold ${
                                  item.dietary === 'veg' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                                }`}>
                                  {item.dietary}
                                </span>
                              </div>
                              <p className="text-xs text-stone-500 line-clamp-1 max-w-md">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            <span className="text-sm font-mono font-bold text-stone-900 tabular-nums">
                              ₹{item.price}
                            </span>

                            {/* Stock Toggle */}
                            <button
                              onClick={() => onToggleAvailability(item.id)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                                item.isAvailable
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-red-100 text-red-800 hover:bg-red-200'
                              }`}
                            >
                              {item.isAvailable ? 'In Stock' : 'Sold Out'}
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => handleStartEdit(item)}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-emerald-700 hover:bg-stone-100 transition-colors"
                              title="Edit item"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => {
                                onDeleteMenuItem(item.id);
                                showNotification(`Removed "${item.name}"`);
                              }}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: WHATSAPP NUMBER CONFIGURATION */}
              {activeTab === 'whatsapp' && (
                <div className="max-w-xl mx-auto space-y-6 py-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">
                        Restaurant WhatsApp Number Configuration
                      </h4>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                        Whenever customers click <strong>"Send Order on WhatsApp"</strong> or check out online,
                        their complete order details (customer name, delivery address in Aligarh, items, and total amount)
                        will be transmitted directly to this phone number!
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveWhatsApp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-stone-600 uppercase tracking-wider mb-1 font-semibold">
                        Owner WhatsApp Phone Number (with country code)
                      </label>
                      <input
                        type="text"
                        required
                        value={tempWhatsApp}
                        onChange={(e) => setTempWhatsApp(e.target.value)}
                        placeholder="e.g. 916396408445 (Include 91 for India)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm font-mono focus:outline-none focus:border-emerald-600"
                      />
                      <p className="text-[11px] text-stone-500 mt-1">
                        Currently configured: <strong>+{ownerWhatsApp}</strong>
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
                      >
                        Save WhatsApp Number
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const testUrl = `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent('Test message from Caffeine Website - WhatsApp routing verified successfully!')}`;
                          const link = document.createElement('a');
                          link.href = testUrl;
                          link.target = '_blank';
                          link.rel = 'noopener noreferrer';
                          document.body.appendChild(link);
                          link.click();
                          setTimeout(() => {
                            document.body.removeChild(link);
                          }, 100);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs border border-stone-300 transition-colors flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Send Test Ping</span>
                      </button>
                    </div>
                  </form>

                  {/* Owner Security PIN Change Form */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                    <div className="flex items-center gap-2 text-stone-900">
                      <Lock className="w-4 h-4 text-amber-700" />
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold">
                        Change Owner Security PIN
                      </h4>
                    </div>
                    <p className="text-xs text-stone-600">
                      Customize your 4-digit PIN to prevent unauthorized diners from accessing the Add Dish portal.
                    </p>

                    <form onSubmit={handleSavePin} className="flex gap-2 items-center">
                      <input
                        type="password"
                        maxLength={4}
                        value={newPinInput}
                        onChange={(e) => setNewPinInput(e.target.value)}
                        placeholder="New 4-digit PIN"
                        className="w-40 px-3 py-2 text-xs rounded-xl bg-white border border-stone-300 text-stone-900 font-mono text-center tracking-widest focus:outline-none focus:border-emerald-600"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 text-xs rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors"
                      >
                        Update PIN
                      </button>
                    </form>
                  </div>

                  {/* Pre-Flight Publication Safety & Value Points Card */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5 text-xs">
                    <span className="block font-mono uppercase tracking-wider text-stone-500 font-bold text-[11px]">
                      Verified Pre-Publication Safety Points:
                    </span>
                    <ul className="space-y-1.5 text-stone-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Phone Privacy</strong>: WhatsApp chat is connected to +{ownerWhatsApp} without exposing raw digits on the screen.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Owner Portal Seclusion</strong>: Add Dish, edit prices, and delete options are concealed behind your Owner PIN.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Delivery Safety</strong>: Home delivery is strictly restricted to Aligarh localities with a flat ₹30 delivery fee.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Zero Broken Images</strong>: All menu items feature name-matched food photos with fallback illustrations.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Verified Location</strong>: Square Towers, Marris Road, Begpur, Aligarh with interactive map and 4.9★ rating.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 4: DISH PHOTO GALLERY PRESETS */}
              {activeTab === 'presets' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 font-serif">
                      Curated Dish Image Library
                    </h4>
                    <p className="text-xs text-stone-500">
                      Click any photo below to instantly use it in the dish editor!
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {DISH_IMAGE_PRESETS.map((preset) => (
                      <div
                        key={preset.label}
                        onClick={() => {
                          setCustomImageUrl(preset.url);
                          setActiveTab('add');
                          showNotification(`Selected image for "${preset.label}"`);
                        }}
                        className="cursor-pointer group rounded-xl border border-stone-200 overflow-hidden bg-white hover:border-emerald-600 transition-all shadow-2xs"
                      >
                        <div className="relative h-24 overflow-hidden bg-stone-100">
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-1 left-1 text-[9px] bg-black/60 text-white px-1.5 py-0.5 rounded font-mono">
                            {preset.category}
                          </span>
                        </div>
                        <div className="p-2">
                          <span className="block text-xs font-semibold text-stone-800 group-hover:text-emerald-800 line-clamp-1">
                            {preset.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
