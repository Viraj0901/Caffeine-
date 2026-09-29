import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { MenuItem, CustomizationExtra, SizeOption } from '../types';
import { getDishImageUrl } from '../data/dishImages';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    item: MenuItem,
    selectedSize?: SizeOption,
    selectedMilk?: string,
    selectedSweetness?: string,
    selectedExtras?: CustomizationExtra[],
    specialInstructions?: string
  ) => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !item) return null;

  const itemImage = item.image || getDishImageUrl(item.id, item.name, item.category);

  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>(
    item.sizeOptions && item.sizeOptions.length > 0 ? item.sizeOptions[0] : undefined
  );
  const [selectedMilk, setSelectedMilk] = useState<string>(
    item.milks && item.milks.length > 0 ? item.milks[0] : ''
  );
  const [selectedSweetness, setSelectedSweetness] = useState<string>(
    item.sweetnessLevels && item.sweetnessLevels.length > 0 ? item.sweetnessLevels[0] : ''
  );
  const [selectedExtras, setSelectedExtras] = useState<CustomizationExtra[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  const toggleExtra = (extra: CustomizationExtra) => {
    if (selectedExtras.some((e) => e.name === extra.name)) {
      setSelectedExtras(selectedExtras.filter((e) => e.name !== extra.name));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const calculateTotalPrice = () => {
    let basePrice = selectedSize ? selectedSize.price : item.price;
    selectedExtras.forEach((extra) => {
      basePrice += extra.price;
    });
    return basePrice;
  };

  const handleAdd = () => {
    onConfirm(
      item,
      selectedSize,
      selectedMilk || undefined,
      selectedSweetness || undefined,
      selectedExtras,
      specialInstructions
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden animate-fadeIn text-stone-900">
        {/* Header with Dish Image */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-3">
            <img
              src={itemImage}
              alt={item.name}
              className="w-14 h-14 rounded-xl object-cover border border-stone-200 shadow-2xs"
            />
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                Customize {item.name}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Base Price: <span className="font-mono text-emerald-800 font-bold">₹{item.price}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customization Options */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Size Options */}
          {item.sizeOptions && item.sizeOptions.length > 0 && (
            <div>
              <label className="block text-xs font-mono text-stone-700 uppercase tracking-wider mb-2 font-semibold">
                Portion / Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.sizeOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedSize(opt)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedSize?.label === opt.label
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-2xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span>{opt.label}</span>
                      <span className="font-mono font-bold">₹{opt.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Options (for coffees) */}
          {item.milks && item.milks.length > 0 && (
            <div>
              <label className="block text-xs font-mono text-stone-700 uppercase tracking-wider mb-2 font-semibold">
                Milk Choice
              </label>
              <div className="space-y-2">
                {item.milks.map((milk) => (
                  <label
                    key={milk}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedMilk === milk
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      <input
                        type="radio"
                        name="milk"
                        checked={selectedMilk === milk}
                        onChange={() => setSelectedMilk(milk)}
                        className="text-emerald-600 focus:ring-emerald-600"
                      />
                      <span>{milk}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Sweetness */}
          {item.sweetnessLevels && item.sweetnessLevels.length > 0 && (
            <div>
              <label className="block text-xs font-mono text-stone-700 uppercase tracking-wider mb-2 font-semibold">
                Sweetness Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {item.sweetnessLevels.map((sweetness) => (
                  <button
                    key={sweetness}
                    type="button"
                    onClick={() => setSelectedSweetness(sweetness)}
                    className={`py-2 px-1 text-xs rounded-xl border text-center transition-all ${
                      selectedSweetness === sweetness
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {sweetness}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons & Extras */}
          {item.extras && item.extras.length > 0 && (
            <div>
              <label className="block text-xs font-mono text-stone-700 uppercase tracking-wider mb-2 font-semibold">
                Add-Ons & Extras
              </label>
              <div className="space-y-2">
                {item.extras.map((extra) => {
                  const isChecked = selectedExtras.some((e) => e.name === extra.name);
                  return (
                    <label
                      key={extra.name}
                      onClick={() => toggleExtra(extra)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded text-emerald-600 focus:ring-emerald-600"
                        />
                        <span>{extra.name}</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-800 font-bold">
                        +₹{extra.price}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-mono text-stone-700 uppercase tracking-wider mb-2 font-semibold">
              Chef / Barista Note
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra hot, crispy edges, pack dip separately..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between p-4 border-t border-stone-200 bg-stone-50">
          <div>
            <span className="block text-[10px] font-mono text-stone-500 uppercase">Item Total</span>
            <span className="text-lg font-bold font-mono text-stone-900 tabular-nums">
              ₹{calculateTotalPrice()}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Customized Item</span>
          </button>
        </div>
      </div>
    </div>
  );
};
