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

export type ScreenName = 
  | 'ONBOARDING'
  | 'HOME'
  | 'RESTAURANT'
  | 'DISH_DETAIL'
  | 'CART'
  | 'CHECKOUT'
  | 'SUCCESS'
  | 'SEARCH' // Placeholder
  | 'FAVORITES' // Placeholder
  | 'ORDERS' // Placeholder
  | 'PROFILE'; // Placeholder

export type PaymentMethod = 'MOBILE_MONEY' | 'AIRTEL_MONEY';