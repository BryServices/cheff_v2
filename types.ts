
export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  description?: string; // Nouvelle description
  cuisineType: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  logo?: string;
  promo?: string;
  isFeatured?: boolean;
  featuredReason?: string;
  menu: Dish[];
}

export interface CartItem extends Dish {
  quantity: number;
  options?: string[]; // e.g., "Sans oignon"
  restaurantId: string;
  restaurantName: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'ORDER' | 'PROMO' | 'SYSTEM';
}

export type OrderStatus = 'PENDING' | 'PREPARING' | 'DELIVERING' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string; // ISO string
  deliveryAddress: string;
}

export type ScreenName = 
  | 'ONBOARDING'
  | 'HOME'
  | 'RESTAURANT'
  | 'DISH_DETAIL'
  | 'CART'
  | 'CHECKOUT'
  | 'SUCCESS'
  | 'SEARCH'
  | 'DISHES'
  | 'ORDERS'
  | 'PROFILE'
  | 'NOTIFICATIONS'
  | 'FAVORITES';

export type PaymentMethod = 'MOBILE_MONEY' | 'AIRTEL_MONEY';

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  avatar: string;
  preferences?: string[]; // Ajout pour la personnalisation
  loyaltyPoints?: number; // Ajout pour la gamification
}
