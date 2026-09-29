export type DietaryType = 'veg' | 'non-veg' | 'egg' | 'vegan';

export interface CustomizationExtra {
  name: string;
  price: number;
}

export interface SizeOption {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: number;
  description: string;
  image?: string;
  dietary: DietaryType;
  isChefSpecial?: boolean;
  isBestseller?: boolean;
  isAvailable: boolean;
  spiceLevel?: 'none' | 'mild' | 'medium' | 'spicy';
  prepTime: string;
  calories?: string;
  sizeOptions?: SizeOption[];
  milks?: string[];
  extras?: CustomizationExtra[];
  sweetnessLevels?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  tagline?: string;
  iconName: string;
  description: string;
}

export interface CartItem {
  cartLineId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: SizeOption;
  selectedMilk?: string;
  selectedSweetness?: string;
  selectedExtras: CustomizationExtra[];
  specialInstructions?: string;
  itemTotal: number;
}

export type OrderType = 'delivery' | 'dine_in' | 'takeaway';
export type PaymentMethod = 'upi_qr' | 'cash' | 'card' | 'whatsapp_direct';
export type OrderStatus = 'placed' | 'brewing' | 'ready' | 'delivered';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  tableNumber?: string;
  deliveryAddress?: string;
  deliveryArea?: string;
  deliveryFee: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid';
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  specialNotes?: string;
  status: OrderStatus;
  createdAt: string;
  estimatedMinutes: number;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  shortBio: string;
  address: {
    shop: string;
    building: string;
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
  };
  phone: string;
  whatsapp: string;
  rating: number;
  reviewCount: number;
  timings: string;
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
