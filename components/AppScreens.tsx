import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Star, Clock, ShoppingBag, Truck, Check, ChevronRight, Utensils, CreditCard, Trash2, ArrowRight, Heart, Plus, Minus, ChevronLeft, Filter, User, Settings, History, Bell, HelpCircle, LogOut, FileText, Smartphone, MessageCircle, Gift, X, Ticket, Bike, Package, Camera, Edit2, Save, Mail, Upload, Home as HomeIcon, Briefcase, UtensilsCrossed, AlignLeft, Info, Megaphone, Flame, ThumbsUp, Moon, Globe, Shield, Zap, ArrowLeft, AlertTriangle, CheckCircle, Lock, Share2, Award, Zap as ZapIcon, PlusCircle, Download } from 'lucide-react';
import { Restaurant, Dish, CartItem, PaymentMethod, Notification, Order, OrderStatus, ScreenName, UserProfile } from '../types';
import { Button, Header, SearchInput, QuantityControl, Skeleton } from './UIComponents';
import { RESTAURANTS, CATEGORIES } from '../data';

// --- Helper Components ---

const DishRow: React.FC<{
  dish: Dish;
  onSelect: () => void;
  onAdd: () => void;
}> = ({ dish, onSelect, onAdd }) => {
  const [isAdded, setIsAdded] = useState(false);
  
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div 
      onClick={onSelect} 
      role="button"
      tabIndex={0}
      className="flex gap-4 p-3 bg-white/[0.03] rounded-[1.5rem] border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group active:scale-[0.99] duration-200 focus:outline-none focus:ring-1 focus:ring-cheff-orange"
    >
       {/* Image */}
       <div className="h-28 w-28 rounded-2xl overflow-hidden flex-shrink-0 relative shadow-md bg-[#2c1a16]">
         <img src={dish.image} alt={dish.name} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
         {dish.popular && (
           <div className="absolute top-0 left-0 bg-cheff-orange/90 backdrop-blur-sm text-white text-[10px] px-2 py-1 font-bold rounded-br-xl shadow-sm">
             HOT
           </div>
         )}
       </div>
       {/* Content */}
       <div className="flex-1 flex flex-col justify-between py-1">
         <div>
           <h3 className="font-bold text-cheff-cream text-base leading-tight mb-1">{dish.name}</h3>
           <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed">{dish.description}</p>
         </div>
         <div className="flex justify-between items-end mt-2">
           <span className="font-bold text-cheff-orange text-lg">{dish.price.toLocaleString()} FCFA</span>
           <button 
             onClick={handleAdd}
             aria-label={`Ajouter ${dish.name} au panier`}
             className={`h-9 flex items-center justify-center rounded-xl shadow-lg active:scale-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#3E2723] focus:ring-cheff-orange ${
               isAdded 
                 ? 'bg-cheff-green text-white px-3 gap-1' 
                 : 'bg-cheff-orange text-white w-9 hover:bg-[#FF9E80] shadow-cheff-orange/20'
             }`}
           >
             {isAdded ? <Check size={16} /> : <Plus size={18} />}
             {isAdded && <span className="text-xs font-bold">Ajouté</span>}
           </button>
         </div>
       </div>
    </div>
  );
};

// --- 1. Onboarding Screen ---

export const OnboardingScreen: React.FC<{ onFinish: (prefs: string[]) => void }> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const interests = ['Burger', 'Africain', 'Pizza', 'Sushi', 'Dessert', 'Végétarien'];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const nextStep = () => setStep(step + 1);

  if (step === 0) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-between py-12 px-6 relative overflow-hidden bg-[#3E2723]">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[60%] bg-cheff-orange/20 rounded-full blur-[100px]" />
        
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
          <div className="w-40 h-40 bg-gradient-to-br from-cheff-orange to-[#FF9E80] rounded-[2.5rem] rotate-3 flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(255,109,0,0.5)] mb-10">
             <Utensils size={64} className="text-white -rotate-3" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">Cheffcongo</h1>
          <p className="text-lg text-gray-200 leading-relaxed max-w-xs">
            Le meilleur de Brazzaville, livré chaud chez vous, de Poto-Poto au Plateau.
          </p>
        </div>
        
        <Button fullWidth onClick={nextStep} className="shadow-2xl shadow-cheff-orange/20">
          Commencer <ArrowRight size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col pt-12 pb-8 px-6 bg-[#3E2723] animate-slide-up">
       <div className="flex-1">
          <div className="mb-8">
             <span className="text-cheff-orange font-bold text-sm tracking-wider uppercase mb-2 block">Étape 2/2</span>
             <h2 className="text-3xl font-extrabold text-white mb-3">Qu'est-ce qui vous fait envie ?</h2>
             <p className="text-gray-400">Sélectionnez vos plats préférés pour personnaliser votre accueil.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {interests.map(interest => {
               const isSelected = selectedInterests.includes(interest);
               return (
                 <button
                   key={interest}
                   onClick={() => toggleInterest(interest)}
                   className={`p-6 rounded-3xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-3 active:scale-95 ${
                     isSelected 
                       ? 'bg-cheff-orange border-cheff-orange shadow-xl shadow-cheff-orange/20' 
                       : 'bg-white/5 border-white/5 hover:bg-white/10'
                   }`}
                 >
                    <span className="text-3xl">
                      {interest === 'Burger' ? '🍔' : interest === 'Pizza' ? '🍕' : interest === 'Sushi' ? '🍣' : interest === 'Africain' ? '🍲' : interest === 'Dessert' ? '🍰' : '🥗'}
                    </span>
                    <span className={`font-bold ${isSelected ? 'text-white' : 'text-gray-300'}`}>{interest}</span>
                    {isSelected && <div className="absolute top-3 right-3 bg-white text-cheff-orange rounded-full p-1"><Check size={12} strokeWidth={4} /></div>}
                 </button>
               )
             })}
          </div>
       </div>

       <div className="space-y-4">
          <Button fullWidth onClick={() => onFinish(selectedInterests)} disabled={selectedInterests.length === 0} className={selectedInterests.length === 0 ? 'opacity-50' : 'shadow-xl shadow-cheff-orange/30'}>
            {selectedInterests.length === 0 ? 'Choisissez au moins un plat' : "C'est parti !"}
          </Button>
          <button onClick={() => onFinish([])} className="w-full text-center text-gray-500 text-sm font-medium py-2">Passer cette étape</button>
       </div>
    </div>
  );
};

// --- 2. Home Screen ---

export const HomeScreen: React.FC<{ 
  onSelectRestaurant: (r: Restaurant) => void;
  onSelectDish: (d: Dish) => void;
  onNotifications: () => void;
  notificationCount: number;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  userPreferences: string[];
  orders?: Order[];
}> = ({ onSelectRestaurant, onSelectDish, onNotifications, notificationCount, favoriteIds, onToggleFavorite, userPreferences, orders }) => {
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredRestaurants = RESTAURANTS.filter(r => {
    if (activeCategory === 'Tout') return true;
    const type = r.cuisineType.toLowerCase();
    const cat = activeCategory.toLowerCase();
    if (activeCategory === 'Africain') return type.includes('congolais') || type.includes('africain');
    if (activeCategory === 'Dessert') return type.includes('boulangerie') || type.includes('pâtisserie') || type.includes('dessert') || type.includes('glace');
    if (activeCategory === 'Sushi') return type.includes('japonais') || type.includes('sushi');
    return type.includes(cat);
  });

  const recommendedDishes = RESTAURANTS.flatMap(r => 
    r.menu.filter(d => userPreferences.some(pref => d.category.includes(pref) || r.cuisineType.includes(pref))).map(d => ({
      ...d,
      restaurantName: r.name,
      restaurantId: r.id
    }))
  ).slice(0, 5);

  const lastOrder = orders && orders.length > 0 ? orders[0] : null;

  return (
    <div className="pb-32 pt-2 px-4 space-y-6 bg-gradient-to-b from-[#3E2723] to-[#2c1a16] min-h-screen">
      <header className="flex items-center justify-between pt-2 mb-2">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium ml-1 mb-0.5">Livrer à</span>
          <button className="flex items-center gap-1.5 text-cheff-cream hover:opacity-80 transition-opacity focus:outline-none focus:ring-1 focus:ring-cheff-orange rounded-lg p-1 -ml-1">
            <MapPin size={18} className="text-cheff-orange" />
            <span className="text-sm font-bold truncate max-w-[150px]">Brazzaville, Poto-Poto</span>
            <ChevronRight size={14} className="text-gray-500" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onNotifications}
            aria-label="Notifications"
            className="relative p-2.5 rounded-full bg-white/5 text-cheff-cream hover:bg-white/10 transition-colors active:scale-95 border border-white/5 focus:outline-none focus:ring-2 focus:ring-cheff-orange"
          >
             <Bell size={20} />
             {notificationCount > 0 && (
               <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 bg-red-500 rounded-full border border-[#3E2723] shadow-sm animate-pulse"></span>
             )}
          </button>
          
          <button 
            aria-label="Profil"
            className="h-11 w-11 rounded-full p-[2px] bg-gradient-to-tr from-cheff-orange to-transparent focus:outline-none focus:ring-2 focus:ring-cheff-orange"
          >
            <div className="h-full w-full rounded-full overflow-hidden border-2 border-[#3E2723] bg-[#2c1a16]">
               <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80" alt="Avatar" className="h-full w-full object-cover" />
            </div>
          </button>
        </div>
      </header>

      <div className="sticky top-2 z-30 shadow-lg shadow-[#3E2723]/50 rounded-2xl">
         <SearchInput />
      </div>

      {lastOrder && (
         <section className="bg-gradient-to-r from-cheff-orange/10 to-[#2c1a16] border border-cheff-orange/20 rounded-2xl p-4 flex items-center justify-between shadow-lg animate-fade-in">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-cheff-orange/20 flex items-center justify-center text-cheff-orange">
                  <History size={20} />
               </div>
               <div>
                  <h4 className="text-sm font-bold text-white">Commander à nouveau ?</h4>
                  <p className="text-xs text-gray-400">{lastOrder.items[0]?.name} et +</p>
               </div>
            </div>
            <button className="bg-cheff-orange text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md active:scale-95 transition-transform">
               Commander
            </button>
         </section>
      )}

      {recommendedDishes.length > 0 && (
        <section className="space-y-4 animate-fade-in">
           <div className="flex items-center justify-between px-1">
             <h3 className="text-lg font-bold text-white flex items-center gap-2">Spécialement pour vous <span className="text-lg" aria-hidden="true">❤️</span></h3>
           </div>
           <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 snap-x snap-mandatory scroll-pl-4">
              {isLoading 
                ? [1,2,3].map(i => <div key={i} className="snap-start min-w-[200px]"><Skeleton className="h-48 w-full rounded-[1.5rem]" /></div>)
                : recommendedDishes.map((dish) => (
                <div 
                  key={`rec-${dish.restaurantId}-${dish.id}`}
                  onClick={() => onSelectDish(dish)}
                  className="snap-start min-w-[200px] bg-[#2c1a16] border border-cheff-orange/30 p-3 rounded-[1.5rem] flex flex-col gap-3 shadow-lg active:scale-95 transition-transform"
                >
                   <div className="h-28 w-full rounded-2xl overflow-hidden relative">
                      <img src={dish.image} className="w-full h-full object-cover" alt={dish.name} />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md rounded-full p-1">
                         <Heart size={14} className="text-cheff-orange fill-cheff-orange" />
                      </div>
                   </div>
                   <div>
                      <h4 className="font-bold text-cheff-cream text-sm line-clamp-1">{dish.name}</h4>
                      <p className="text-xs text-gray-400 mb-2">{dish.restaurantName}</p>
                      <span className="font-bold text-cheff-orange">{dish.price.toLocaleString()} F</span>
                   </div>
                </div>
              ))}
           </div>
        </section>
      )}

      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 snap-x snap-mandatory scroll-pl-4">
        {CATEGORIES.map((cat, i) => {
          const isActive = activeCategory === cat.name;
          return (
            <button 
              key={i} 
              onClick={() => setActiveCategory(cat.name)}
              className={`snap-start flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cheff-orange ${
                isActive 
                  ? 'bg-cheff-orange border-cheff-orange text-white shadow-lg shadow-cheff-orange/25' 
                  : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className="text-lg" aria-hidden="true">{cat.icon}</span>
              <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-200'}`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      <section className="space-y-4 pt-2">
         <h3 className="text-lg font-bold text-white px-1">Tous les restaurants</h3>
         <div className="space-y-6">
           {isLoading 
             ? [1,2].map(i => <Skeleton key={i} className="h-64 w-full rounded-[2rem]" />)
             : filteredRestaurants.map(resto => {
             return (
             <div 
                key={resto.id}
                onClick={() => onSelectRestaurant(resto)}
                tabIndex={0}
                className="group relative bg-[#2c1a16] rounded-[2rem] overflow-hidden border border-white/5 shadow-xl hover:shadow-cheff-orange/10 transition-all duration-300 active:scale-[0.98] cursor-pointer focus:outline-none focus:ring-2 focus:ring-cheff-orange"
             >
                <div className="h-48 w-full relative overflow-hidden">
                   <img 
                      src={resto.image} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt={resto.name} 
                      loading="lazy"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#2c1a16] via-transparent to-transparent opacity-90" />
                </div>

                <div className="relative px-5 pb-5 -mt-12">
                   <div className="flex justify-between items-end mb-2">
                      <div className="w-16 h-16 rounded-2xl border-4 border-[#2c1a16] bg-[#2c1a16] shadow-lg overflow-hidden">
                         <img src={resto.logo || resto.image} className="w-full h-full object-cover" alt={`${resto.name} logo`} />
                      </div>
                      
                      <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-xl mb-1 border border-white/5">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-bold text-white">{resto.rating}</span>
                      </div>
                   </div>

                   <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-extrabold text-cheff-cream text-xl">{resto.name}</h4>
                        {resto.promo && (
                           <span className="text-xs font-bold text-cheff-orange bg-cheff-orange/10 px-2 py-1 rounded-lg border border-cheff-orange/20">
                             {resto.promo}
                           </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-400 font-medium">{resto.cuisineType}</p>
                      
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5 text-xs text-gray-400 font-medium">
                         <span className="flex items-center gap-1.5">
                           <Clock size={14} className="text-cheff-orange" />
                           {resto.deliveryTime}
                         </span>
                         <span className="flex items-center gap-1.5">
                           <Truck size={14} className="text-cheff-orange" />
                           {resto.deliveryFee} FCFA
                         </span>
                      </div>
                   </div>
                </div>
             </div>
             )})}
         </div>
      </section>
    </div>
  );
};

// --- 3. Restaurant Detail Screen ---

export const RestaurantDetailScreen: React.FC<{ 
  restaurant: Restaurant; 
  onBack: () => void;
  onSelectDish: (d: Dish) => void;
  onAddToCart: (d: Dish, qty: number, opts: string[]) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}> = ({ restaurant, onBack, onSelectDish, onAddToCart, isFavorite, onToggleFavorite }) => {
  const [activeCategory, setActiveCategory] = useState('Tout');
  
  const dishCategories = ['Tout', ...new Set(restaurant.menu.map(d => d.category))];
  const filteredDishes = activeCategory === 'Tout' 
    ? restaurant.menu 
    : restaurant.menu.filter(d => d.category === activeCategory);

  return (
    <div className="pb-32 bg-[#3E2723] min-h-screen">
      <div className="relative h-72">
        <img src={restaurant.image} className="w-full h-full object-cover" alt={restaurant.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723] via-[#3E2723]/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 p-4 pt-safe flex justify-between items-start">
          <button onClick={onBack} className="p-2.5 bg-black/30 backdrop-blur-md rounded-full text-white border border-white/10">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
             <button onClick={onToggleFavorite} className="p-2.5 bg-black/30 backdrop-blur-md rounded-full text-white border border-white/10 active:scale-95 transition-transform">
               <Heart size={24} className={isFavorite ? 'fill-cheff-orange text-cheff-orange' : ''} />
             </button>
             <button className="p-2.5 bg-black/30 backdrop-blur-md rounded-full text-white border border-white/10">
               <Share2 size={24} />
             </button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
           <div className="flex items-center gap-4 mb-3">
              <div className="w-16 h-16 bg-white rounded-2xl p-1 shadow-lg">
                 <img src={restaurant.logo || restaurant.image} className="w-full h-full object-cover rounded-xl" alt="Logo" />
              </div>
              <div>
                 <h1 className="text-3xl font-extrabold text-white leading-none shadow-black drop-shadow-lg">{restaurant.name}</h1>
                 <div className="flex items-center gap-2 mt-2">
                    <span className="bg-cheff-orange px-2 py-0.5 rounded-lg text-xs font-bold text-white">{restaurant.rating} ★</span>
                    <span className="text-gray-200 text-sm font-medium">{restaurant.cuisineType}</span>
                 </div>
              </div>
           </div>
           
           <div className="flex gap-4 text-sm text-gray-200 font-medium">
              <span className="flex items-center gap-1.5"><Clock size={16} className="text-cheff-orange" /> {restaurant.deliveryTime}</span>
              <span className="flex items-center gap-1.5"><Truck size={16} className="text-cheff-orange" /> {restaurant.deliveryFee} FCFA</span>
           </div>
        </div>
      </div>

      <div className="px-6 py-4">
         {restaurant.description && (
           <p className="text-gray-300 text-sm leading-relaxed mb-6 border-l-4 border-cheff-orange pl-4">
             {restaurant.description}
           </p>
         )}

         <div className="sticky top-0 z-20 bg-[#3E2723]/95 backdrop-blur-xl py-3 -mx-6 px-6 border-b border-white/5 mb-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
               {dishCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      activeCategory === cat 
                        ? 'bg-cheff-orange text-white shadow-lg shadow-cheff-orange/20' 
                        : 'bg-white/5 text-gray-400 border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
               ))}
            </div>
         </div>

         <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">{activeCategory === 'Tout' ? 'La Carte' : activeCategory}</h3>
            {filteredDishes.map(dish => (
               <DishRow 
                  key={dish.id} 
                  dish={dish} 
                  onSelect={() => onSelectDish(dish)}
                  onAdd={() => onAddToCart(dish, 1, [])}
               />
            ))}
         </div>
      </div>
    </div>
  );
};

// --- 4. Dish Detail Screen ---

export const DishDetailScreen: React.FC<{ 
  dish: Dish; 
  restaurantName: string;
  onBack: () => void; 
  onAddToCart: (dish: Dish, qty: number, options: string[]) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}> = ({ dish, restaurantName, onBack, onAddToCart, isFavorite, onToggleFavorite }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');

  const sizes = ['Standard', 'XL (+1000F)', 'Menu (+2000F)'];
  const extras = ['Sans oignon', 'Sauce à part', 'Bien cuit', 'Piment', 'Couverts'];

  const toggleExtra = (extra: string) => {
    setSelectedExtras(prev => prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra]);
  };

  const getExtraPrice = (size: string) => {
     if (size.includes('XL')) return 1000;
     if (size.includes('Menu')) return 2000;
     return 0;
  };

  const totalPrice = (dish.price + getExtraPrice(selectedSize)) * quantity;

  return (
    <div className="bg-[#3E2723] min-h-screen flex flex-col">
      <div className="relative h-80 flex-shrink-0">
        <img src={dish.image} className="w-full h-full object-cover" alt={dish.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723] to-transparent" />
        <div className="absolute top-0 left-0 right-0 p-4 pt-safe flex justify-between">
           <button onClick={onBack} className="p-2.5 bg-black/30 backdrop-blur-md rounded-full text-white"><ChevronLeft size={24} /></button>
           <button onClick={onToggleFavorite} className="p-2.5 bg-black/30 backdrop-blur-md rounded-full text-white">
              <Heart size={24} className={isFavorite ? 'fill-cheff-orange text-cheff-orange' : ''} />
           </button>
        </div>
      </div>

      <div className="flex-1 px-6 -mt-10 relative z-10">
         <div className="bg-[#2c1a16] border border-white/5 p-6 rounded-[2.5rem] shadow-2xl mb-6">
            <h1 className="text-2xl font-extrabold text-white mb-2 leading-tight">{dish.name}</h1>
            <p className="text-cheff-orange font-bold text-sm mb-4 flex items-center gap-2">
               <Utensils size={14} /> {restaurantName}
            </p>
            <p className="text-gray-300 leading-relaxed text-sm">{dish.description}</p>
         </div>

         <div className="space-y-8 pb-32">
            {/* Size Selector */}
            <div className="space-y-3">
               <h3 className="font-bold text-white text-lg">Taille / Formule</h3>
               <div className="grid grid-cols-1 gap-3">
                  {sizes.map(size => (
                     <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`p-4 rounded-2xl border text-left flex justify-between items-center transition-all ${
                           selectedSize === size 
                              ? 'bg-cheff-orange/10 border-cheff-orange text-cheff-orange' 
                              : 'bg-white/5 border-white/5 text-gray-300'
                        }`}
                     >
                        <span className="font-bold">{size}</span>
                        {selectedSize === size && <CheckCircle size={20} className="text-cheff-orange" />}
                     </button>
                  ))}
               </div>
            </div>

            {/* Extras Pills */}
            <div className="space-y-3">
               <h3 className="font-bold text-white text-lg">Préférences</h3>
               <div className="flex flex-wrap gap-3">
                  {extras.map(extra => (
                     <button
                        key={extra}
                        onClick={() => toggleExtra(extra)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                           selectedExtras.includes(extra)
                              ? 'bg-cheff-orange text-white border-cheff-orange shadow-lg shadow-cheff-orange/20'
                              : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                        }`}
                     >
                        {extra}
                     </button>
                  ))}
               </div>
            </div>

            {/* Instructions */}
            <div className="space-y-3">
               <h3 className="font-bold text-white text-lg">Instructions spéciales</h3>
               <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-cheff-orange min-h-[100px]"
                  placeholder="Ex: Sans cornichons, sauce à part..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
               />
            </div>

            {/* Quantity & Add Action */}
            <div className="bg-[#2c1a16] border border-white/5 p-6 rounded-[2rem] shadow-xl space-y-6">
               <div className="flex items-center justify-between">
                  <span className="text-white font-bold">Quantité</span>
                  <QuantityControl value={quantity} onChange={setQuantity} />
               </div>
               
               <Button 
                  fullWidth 
                  onClick={() => onAddToCart(dish, quantity, [...selectedExtras, selectedSize, instructions].filter(Boolean))}
                  className="text-lg py-5 shadow-xl shadow-cheff-orange/20"
               >
                  Ajouter • {totalPrice.toLocaleString()} FCFA
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- 5. Cart Screen ---

export const CartScreen: React.FC<{ 
  cart: CartItem[]; 
  onBack: () => void;
  onUpdateQuantity: (index: number, qty: number) => void;
  onRemove: (index: number) => void;
  onCheckout: () => void;
}> = ({ cart, onBack, onUpdateQuantity, onRemove, onCheckout }) => {
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const groupedItems = cart.reduce((acc, item) => {
    if (!acc[item.restaurantName]) acc[item.restaurantName] = [];
    acc[item.restaurantName].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = Object.keys(groupedItems).length * 1000;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#3E2723] flex flex-col items-center justify-center p-6 text-center">
        <Header title="Mon Panier" onBack={onBack} />
        <div className="bg-white/5 p-8 rounded-full mb-6 animate-bounce-slow">
           <ShoppingBag size={64} className="text-cheff-orange opacity-50" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Votre panier est vide</h2>
        <p className="text-gray-400 mb-8 max-w-xs mx-auto">Découvrez nos meilleurs plats et laissez-vous tenter !</p>
        <Button onClick={onBack}>Explorer les restaurants</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#3E2723] pb-48">
      <Header title="Mon Panier" onBack={onBack} />
      
      <div className="px-4 py-6 space-y-6">
         {Object.entries(groupedItems).map(([restoName, items]: [string, CartItem[]]) => (
            <div key={restoName} className="space-y-3 animate-fade-in">
               <h3 className="text-cheff-orange font-bold text-sm uppercase tracking-wider pl-1 flex items-center gap-2">
                  <Utensils size={14} /> {restoName}
               </h3>
               {items.map((item, idx) => {
                 // Find global index in cart array for handlers
                 const globalIndex = cart.indexOf(item);
                 return (
                   <div key={idx} className="bg-[#2c1a16] border border-white/5 p-4 rounded-[1.5rem] flex gap-4 shadow-lg relative overflow-hidden group">
                      <div className="h-20 w-20 bg-white/5 rounded-xl flex-shrink-0 overflow-hidden">
                         <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-white leading-tight">{item.name}</h4>
                            <span className="font-bold text-cheff-orange whitespace-nowrap">{(item.price * item.quantity).toLocaleString()} F</span>
                         </div>
                         {item.options && item.options.length > 0 && (
                            <p className="text-xs text-gray-400 mb-3 line-clamp-1">{item.options.join(', ')}</p>
                         )}
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1">
                               <button onClick={() => onUpdateQuantity(globalIndex, item.quantity - 1)} className="p-1 hover:bg-white/10 rounded-md text-white"><Minus size={14} /></button>
                               <span className="text-sm font-bold text-white w-4 text-center">{item.quantity}</span>
                               <button onClick={() => onUpdateQuantity(globalIndex, item.quantity + 1)} className="p-1 hover:bg-white/10 rounded-md text-white"><Plus size={14} /></button>
                            </div>
                            
                            {confirmDelete === globalIndex ? (
                               <div className="flex items-center gap-2 bg-red-500/20 px-2 py-1 rounded-lg">
                                  <span className="text-[10px] text-red-200">Sûr ?</span>
                                  <button onClick={() => onRemove(globalIndex)} className="text-red-500 font-bold text-xs hover:underline">OUI</button>
                                  <button onClick={() => setConfirmDelete(null)} className="text-white text-xs hover:underline">NON</button>
                               </div>
                            ) : (
                               <button 
                                 onClick={() => setConfirmDelete(globalIndex)} 
                                 aria-label="Supprimer"
                                 className="text-gray-500 hover:text-red-500 transition-colors p-2"
                               >
                                  <Trash2 size={18} />
                               </button>
                            )}
                         </div>
                      </div>
                   </div>
                 );
               })}
            </div>
         ))}

         {/* Promo Code */}
         <div className="bg-[#2c1a16] border border-white/5 p-4 rounded-2xl flex gap-3 items-center">
            <Ticket className="text-cheff-orange" size={20} />
            <input 
               type="text" 
               placeholder="Code Promo" 
               className="bg-transparent border-none text-white placeholder-gray-500 flex-1 focus:outline-none text-sm"
            />
            <button className="text-cheff-orange font-bold text-sm">Appliquer</button>
         </div>
      </div>

      {/* Fixed Bottom Summary */}
      <div className="fixed bottom-24 left-4 right-4 bg-[#2c1a16]/95 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] shadow-2xl z-40 space-y-4">
         <div className="space-y-2">
            <div className="flex justify-between text-gray-400 text-sm">
               <span>Sous-total</span>
               <span>{subtotal.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-gray-400 text-sm">
               <span>Livraison</span>
               <span>{deliveryFee.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-white font-extrabold text-xl pt-2 border-t border-white/10">
               <span>Total</span>
               <span className="text-cheff-orange">{total.toLocaleString()} FCFA</span>
            </div>
         </div>
         <Button fullWidth onClick={onCheckout} className="py-4 text-lg shadow-xl shadow-cheff-orange/20">
            Valider la commande
         </Button>
      </div>
    </div>
  );
};

// --- 6. Checkout Screen ---

export const CheckoutScreen: React.FC<{ 
  total: number; 
  onBack: () => void; 
  onConfirm: () => void; 
}> = ({ total, onBack, onConfirm }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('MOBILE_MONEY');
  const [isProcessing, setIsProcessing] = useState(false);
  const [phone, setPhone] = useState('06 600 0000');

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#3E2723] pb-10">
      <Header title="Paiement" onBack={onBack} />
      
      <div className="px-6 py-8 space-y-8">
         <div className="space-y-4">
            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Adresse de livraison</h3>
            <div className="bg-[#2c1a16] border border-white/5 p-4 rounded-2xl flex gap-4 items-center">
               <div className="bg-cheff-orange/20 p-3 rounded-full text-cheff-orange"><MapPin size={24} /></div>
               <div>
                  <h4 className="font-bold text-white">Maison</h4>
                  <p className="text-gray-400 text-sm">Poto-Poto, Rue Mbochi, N°45</p>
               </div>
               <button className="ml-auto text-cheff-orange text-sm font-bold">Modifier</button>
            </div>
         </div>

         <div className="space-y-4">
            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Moyen de paiement</h3>
            <div className="grid gap-3">
               {['MOBILE_MONEY', 'AIRTEL_MONEY'].map((method) => (
                  <button 
                    key={method}
                    onClick={() => setPaymentMethod(method as PaymentMethod)}
                    className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                       paymentMethod === method 
                          ? 'bg-cheff-orange/10 border-cheff-orange shadow-lg shadow-cheff-orange/10' 
                          : 'bg-[#2c1a16] border-white/5 text-gray-400'
                    }`}
                  >
                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method ? 'border-cheff-orange' : 'border-gray-500'}`}>
                        {paymentMethod === method && <div className="w-2.5 h-2.5 bg-cheff-orange rounded-full" />}
                     </div>
                     <span className="font-bold text-white">{method === 'MOBILE_MONEY' ? 'MTN Mobile Money' : 'Airtel Money'}</span>
                  </button>
               ))}
            </div>

            <div className="bg-[#2c1a16] border border-white/5 p-4 rounded-2xl">
               <label className="text-xs text-gray-400 block mb-2">Numéro de paiement</label>
               <div className="flex gap-2">
                  <span className="text-white font-bold py-3 px-2">+242</span>
                  <input 
                     type="tel" 
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     className="bg-transparent border-b border-white/10 text-white font-bold w-full focus:outline-none focus:border-cheff-orange py-2"
                  />
               </div>
            </div>
         </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#2c1a16] border-t border-white/10 p-6 rounded-t-[2.5rem] shadow-2xl">
         <div className="flex justify-between items-end mb-6">
            <span className="text-gray-400">Total à payer</span>
            <span className="text-3xl font-extrabold text-white">{total.toLocaleString()} <span className="text-lg text-cheff-orange">FCFA</span></span>
         </div>
         <Button fullWidth onClick={handlePay} isLoading={isProcessing} className="py-4 text-lg shadow-xl shadow-cheff-orange/20">
            {isProcessing ? 'Validation...' : 'Payer maintenant'}
         </Button>
      </div>
    </div>
  );
};

// --- 7. Success Screen ---

export const SuccessScreen: React.FC<{ onHome: () => void }> = ({ onHome }) => {
  return (
    <div className="h-screen bg-[#3E2723] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      <div className="w-24 h-24 bg-cheff-green rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(0,200,83,0.4)] animate-scale-in">
        <Check size={48} className="text-white" strokeWidth={4} />
      </div>
      <h1 className="text-3xl font-extrabold text-white mb-2">Commande Validée !</h1>
      <p className="text-gray-300 mb-8 max-w-xs">Votre commande a été transmise au restaurant. Elle arrivera chaud bouillant ! 🔥</p>
      
      <div className="bg-[#2c1a16] p-6 rounded-3xl border border-white/5 w-full max-w-sm mb-8">
         <div className="flex items-center gap-4 mb-4">
            <div className="bg-cheff-orange/20 p-3 rounded-full"><Bike className="text-cheff-orange" /></div>
            <div className="text-left">
               <p className="text-xs text-gray-400 uppercase tracking-wider">Temps estimé</p>
               <p className="text-xl font-bold text-white">30 - 45 min</p>
            </div>
         </div>
         <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-cheff-orange w-1/3 animate-pulse" />
         </div>
         <p className="text-xs text-gray-500 mt-2 text-left">Préparation en cours...</p>
      </div>

      <div className="space-y-3 w-full max-w-sm">
         <Button fullWidth onClick={onHome} variant="secondary">Suivre ma commande</Button>
         <Button fullWidth onClick={onHome} variant="ghost">Retour à l'accueil</Button>
      </div>
    </div>
  );
};

// --- 8. Profile Screen ---

export const ProfileScreen: React.FC<{ 
  onNavigate: (screen: ScreenName) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
  onLogin: (data?: any) => void;
  user: UserProfile;
  onUpdateUser: (data: Partial<UserProfile>) => void;
}> = ({ onNavigate, onLogout, isLoggedIn, onLogin, user, onUpdateUser }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // PWA Install Prompt Listener
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#3E2723] p-6 flex flex-col justify-center">
         <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center rotate-6 border border-white/10">
               <User size={40} className="text-cheff-orange -rotate-6" />
            </div>
            <div>
               <h1 className="text-3xl font-extrabold text-white mb-2">Connectez-vous</h1>
               <p className="text-gray-400 max-w-xs mx-auto">Pour accéder à votre profil, vos favoris et suivre vos commandes.</p>
            </div>
            
            <div className="w-full max-w-sm space-y-4 bg-[#2c1a16] p-6 rounded-3xl border border-white/5 shadow-2xl">
               <input type="tel" placeholder="Numéro de téléphone" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cheff-orange focus:outline-none" />
               <input type="password" placeholder="Mot de passe" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cheff-orange focus:outline-none" />
               <Button fullWidth onClick={() => onLogin({ name: 'Client Cheff', phone: '066000000' })}>Se connecter</Button>
               <p className="text-xs text-gray-500">Pas encore de compte ? <span className="text-cheff-orange font-bold">S'inscrire</span></p>
            </div>
         </div>
      </div>
    );
  }

  // Settings Modal Content
  if (showSettings) {
    return (
       <div className="min-h-screen bg-[#3E2723] p-6 animate-slide-up">
          <Header title="Paramètres" onBack={() => setShowSettings(false)} />
          <div className="space-y-6 mt-6">
             <div className="space-y-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase">Général</h3>
                <div className="bg-[#2c1a16] rounded-2xl overflow-hidden border border-white/5">
                   <div className="p-4 flex justify-between items-center border-b border-white/5">
                      <span className="text-white">Notifications Push</span>
                      <div className="w-10 h-6 bg-cheff-orange rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
                   </div>
                   <div className="p-4 flex justify-between items-center">
                      <span className="text-white">Mode Sombre</span>
                      <div className="w-10 h-6 bg-cheff-orange rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
                   </div>
                </div>
             </div>
             <div className="space-y-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase">Compte</h3>
                <div className="bg-[#2c1a16] rounded-2xl overflow-hidden border border-white/5">
                   <button className="w-full p-4 text-left text-white border-b border-white/5 flex justify-between">Langue <span className="text-gray-400 text-sm">Français</span></button>
                   <button className="w-full p-4 text-left text-red-400 font-bold" onClick={onLogout}>Supprimer mon compte</button>
                </div>
             </div>
          </div>
       </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#3E2723] pb-24">
      {/* Immersive Header */}
      <div className="relative h-64 bg-gradient-to-b from-cheff-orange/20 to-[#3E2723] flex flex-col items-center justify-center">
         <div className="relative">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-cheff-orange to-yellow-500">
               <img src={user.avatar} className="w-full h-full object-cover rounded-full border-4 border-[#3E2723]" alt="Avatar" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-[#2c1a16] rounded-full text-white border border-white/10 shadow-lg">
               <Edit2 size={14} />
            </button>
         </div>
         <h1 className="text-2xl font-bold text-white mt-3">{user.name}</h1>
         
         {/* Loyalty Card Float */}
         <div className="absolute -bottom-10 left-6 right-6 bg-[#2c1a16] p-4 rounded-3xl border border-white/5 shadow-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500">
                  <Award size={20} />
               </div>
               <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">Points Fidélité</p>
                  <p className="text-xl font-extrabold text-white">{user.loyaltyPoints} PTS</p>
               </div>
            </div>
            <button className="bg-white/5 px-3 py-1.5 rounded-lg text-xs font-bold text-cheff-orange hover:bg-white/10">Voir récompenses</button>
         </div>
      </div>

      <div className="mt-16 px-6 space-y-4">
         {/* Menu Grid */}
         <div className="grid grid-cols-2 gap-3">
            <button onClick={() => onNavigate('ORDERS')} className="bg-[#2c1a16] p-5 rounded-[2rem] border border-white/5 flex flex-col items-center gap-3 hover:bg-white/5 transition-colors">
               <History className="text-cheff-orange" />
               <span className="font-bold text-white">Historique</span>
            </button>
            <button onClick={() => onNavigate('FAVORITES')} className="bg-[#2c1a16] p-5 rounded-[2rem] border border-white/5 flex flex-col items-center gap-3 hover:bg-white/5 transition-colors">
               <Heart className="text-red-500" />
               <span className="font-bold text-white">Favoris</span>
            </button>
         </div>

         {/* List Options */}
         <div className="bg-[#2c1a16] rounded-[2rem] border border-white/5 overflow-hidden">
            {[
              { icon: MapPin, label: 'Mes adresses', action: () => setShowAddresses(true) },
              { icon: CreditCard, label: 'Moyens de paiement', action: () => setShowPayment(true) },
              { icon: Settings, label: 'Paramètres', action: () => setShowSettings(true) },
              { icon: HelpCircle, label: 'Aide & Support', action: () => {} },
            ].map((item, i) => (
               <button 
                  key={i} 
                  onClick={item.action}
                  className="w-full p-4 flex items-center gap-4 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors"
               >
                  <item.icon size={20} className="text-gray-400" />
                  <span className="text-white font-medium flex-1 text-left">{item.label}</span>
                  <ChevronRight size={16} className="text-gray-600" />
               </button>
            ))}
            
            {/* PWA Install Button (Conditional) */}
            {deferredPrompt && (
              <button 
                  onClick={handleInstallApp}
                  className="w-full p-4 flex items-center gap-4 bg-cheff-orange/10 hover:bg-cheff-orange/20 transition-colors"
               >
                  <Download size={20} className="text-cheff-orange" />
                  <span className="text-cheff-orange font-bold flex-1 text-left">Installer l'application</span>
                  <ChevronRight size={16} className="text-cheff-orange" />
               </button>
            )}
         </div>

         <Button variant="ghost" fullWidth onClick={onLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
            <LogOut size={18} /> Se déconnecter
         </Button>
      </div>

      {/* Modals placeholders */}
      {showAddresses && (
         <div className="fixed inset-0 z-50 bg-[#3E2723] p-6 animate-slide-up">
            <Header title="Mes Adresses" onBack={() => setShowAddresses(false)} />
            <div className="mt-6 text-center text-gray-400">Fonctionnalité d'adresses bientôt disponible.</div>
         </div>
      )}
      {showPayment && (
         <div className="fixed inset-0 z-50 bg-[#3E2723] p-6 animate-slide-up">
             <Header title="Paiements" onBack={() => setShowPayment(false)} />
             <div className="mt-6 text-center text-gray-400">Fonctionnalité de paiement bientôt disponible.</div>
         </div>
      )}
    </div>
  );
};

// --- 9. Notification Screen ---

export const NotificationScreen: React.FC<{ 
  notifications: Notification[]; 
  onMarkRead: (id: string) => void; 
  onBack: () => void; 
}> = ({ notifications, onMarkRead, onBack }) => {
  return (
    <div className="min-h-screen bg-[#3E2723] pb-24">
       <Header title="Notifications" onBack={onBack} />
       <div className="px-4 mt-6 space-y-4">
          {notifications.map(n => (
             <div 
               key={n.id} 
               onClick={() => onMarkRead(n.id)}
               className={`p-4 rounded-2xl border flex gap-4 ${n.read ? 'bg-transparent border-white/5 opacity-60' : 'bg-[#2c1a16] border-cheff-orange/30 shadow-lg'}`}
             >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${n.type === 'PROMO' ? 'bg-purple-500/20 text-purple-400' : 'bg-cheff-orange/20 text-cheff-orange'}`}>
                   {n.type === 'PROMO' ? <Megaphone size={20} /> : <Info size={20} />}
                </div>
                <div>
                   <h4 className="font-bold text-white text-sm mb-1">{n.title}</h4>
                   <p className="text-xs text-gray-400 leading-relaxed">{n.message}</p>
                   <span className="text-[10px] text-gray-500 mt-2 block">{n.time}</span>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

// --- 10. All Dishes Screen (Explore) ---

export const AllDishesScreen: React.FC<{
   onSelectDish: (d: Dish) => void;
   onAddToCart: (d: Dish) => void;
   userPreferences: string[];
}> = ({ onSelectDish, onAddToCart }) => {
   const [search, setSearch] = useState('');
   const [filter, setFilter] = useState('Tout');
   
   // Flatten all dishes
   const allDishes = RESTAURANTS.flatMap(r => r.menu.map(d => ({ ...d, restaurantName: r.name, restaurantId: r.id })));
   
   const filtered = allDishes.filter(d => 
      (filter === 'Tout' || d.category === filter) &&
      d.name.toLowerCase().includes(search.toLowerCase())
   );

   return (
      <div className="min-h-screen bg-[#3E2723] pb-32 pt-24 px-4">
         {/* Marquee Banner */}
         <div className="fixed top-0 left-0 right-0 z-30 bg-[#3E2723] pt-2 pb-2">
            <div className="bg-gradient-to-r from-[#5D4037] to-[#3E2723] border-y border-cheff-orange/20 py-2 overflow-hidden relative">
               <div className="whitespace-nowrap animate-marquee flex gap-8 items-center text-cheff-orange font-bold text-xs uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Flame size={14} /> Livraison offerte dès 10.000F</span>
                  <span className="flex items-center gap-2"><Megaphone size={14} /> Promo Sushi -20%</span>
                  <span className="flex items-center gap-2"><Star size={14} /> Nouveaux Burgers chez Brazza</span>
                  <span className="flex items-center gap-2"><Flame size={14} /> Livraison offerte dès 10.000F</span>
               </div>
               <style>{`
                  @keyframes marquee {
                     0% { transform: translateX(100%); }
                     100% { transform: translateX(-100%); }
                  }
                  .animate-marquee {
                     animation: marquee 15s linear infinite;
                  }
               `}</style>
            </div>
            <div className="px-4 mt-2">
               <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Chercher un plat..." />
            </div>
         </div>
         
         {/* Categories */}
         <div className="flex gap-2 overflow-x-auto no-scrollbar py-4 mt-2">
            {['Tout', 'Burgers', 'Pizzas', 'Plats', 'Sushi'].map(cat => (
               <button 
                  key={cat} 
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${filter === cat ? 'bg-cheff-orange text-white border-cheff-orange' : 'bg-transparent text-gray-400 border-white/10'}`}
               >
                  {cat}
               </button>
            ))}
         </div>

         {/* Grid */}
         <div className="grid grid-cols-2 gap-4">
            {filtered.map(dish => (
               <div 
                  key={`${dish.restaurantId}-${dish.id}`} 
                  onClick={() => onSelectDish(dish)}
                  className="bg-[#2c1a16] border border-white/5 rounded-[1.5rem] p-3 shadow-lg active:scale-[0.98] transition-transform"
               >
                  <div className="h-32 rounded-xl overflow-hidden bg-white/5 mb-3 relative">
                     <img src={dish.image} className="w-full h-full object-cover" alt={dish.name} loading="lazy" />
                     <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur text-black text-[10px] font-bold px-2 py-0.5 rounded-lg">
                        {dish.price} F
                     </div>
                  </div>
                  <h4 className="font-bold text-white text-sm line-clamp-1">{dish.name}</h4>
                  <p className="text-[10px] text-gray-400 mb-3">{dish.restaurantName}</p>
                  <button 
                     onClick={(e) => { e.stopPropagation(); onAddToCart(dish); }}
                     className="w-full py-2 bg-white/5 hover:bg-cheff-orange hover:text-white text-gray-300 rounded-xl text-xs font-bold transition-colors"
                  >
                     Ajouter
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
};

// --- 11. Orders Screen ---

export const OrdersScreen: React.FC<{ orders?: Order[] }> = ({ orders }) => {
   if (!orders || orders.length === 0) {
      return (
         <div className="min-h-screen bg-[#3E2723] flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white/5 p-6 rounded-full mb-4"><FileText size={48} className="text-gray-500" /></div>
            <h2 className="text-xl font-bold text-white">Aucune commande</h2>
            <p className="text-gray-400 text-sm">Vous n'avez pas encore commandé.</p>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-[#3E2723] pb-24 px-4 pt-12">
         <h1 className="text-2xl font-extrabold text-white mb-6">Mes Commandes</h1>
         <div className="space-y-4">
            {orders.map(order => (
               <div key={order.id} className="bg-[#2c1a16] border border-white/5 p-5 rounded-[2rem]">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="font-bold text-white text-lg">{order.restaurantName}</h3>
                        <span className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString()} • {order.items.length} articles</span>
                     </div>
                     <span className="px-2 py-1 rounded-lg bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">{order.status}</span>
                  </div>
                  <div className="space-y-2 mb-4">
                     {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm text-gray-300">
                           <span>{item.quantity}x {item.name}</span>
                           <span>{item.price} F</span>
                        </div>
                     ))}
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                     <span className="font-bold text-white">Total: {order.total.toLocaleString()} F</span>
                     <button className="text-cheff-orange text-sm font-bold hover:underline">Re-commander</button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

// --- 12. Favorites Screen ---

export const FavoritesScreen: React.FC<{ 
   favoriteIds: string[]; 
   onSelectRestaurant: (r: Restaurant) => void; 
   onSelectDish: (d: Dish) => void;
   onToggleFavorite: (id: string) => void;
   onBack: () => void;
}> = ({ favoriteIds, onSelectRestaurant, onSelectDish, onToggleFavorite, onBack }) => {
   // Find all favorited dishes across all restaurants
   const favoriteDishes = RESTAURANTS.flatMap(r => 
      r.menu
         .filter(d => favoriteIds.includes(d.id))
         .map(d => ({ ...d, restaurantName: r.name, restaurantId: r.id }))
   );

   const handleRecommend = (dishName: string) => {
      if (navigator.share) {
         navigator.share({
            title: 'Cheffcongo',
            text: `Je te recommande le ${dishName} sur Cheffcongo !`,
            url: window.location.href
         }).catch(console.error);
      } else {
         alert(`Recommandation envoyée pour : ${dishName}`);
      }
   };

   return (
      <div className="min-h-screen bg-[#3E2723] pb-24">
         <Header title="Mes Favoris" onBack={onBack} />
         <div className="px-4 mt-6 space-y-4">
            {favoriteDishes.length === 0 ? (
               <div className="text-center text-gray-400 mt-20">
                  <Heart size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Aucun coup de cœur pour le moment.</p>
               </div>
            ) : (
               favoriteDishes.map(dish => (
                  <div 
                     key={dish.id} 
                     onClick={() => onSelectDish(dish)}
                     className="bg-[#2c1a16] border border-white/5 p-4 rounded-[2rem] flex gap-4 shadow-lg group active:scale-[0.98] transition-transform"
                  >
                     <div className="h-24 w-24 rounded-2xl overflow-hidden flex-shrink-0 bg-white/5">
                        <img src={dish.image} className="w-full h-full object-cover" alt={dish.name} />
                     </div>
                     <div className="flex-1 flex flex-col justify-between">
                        <div>
                           <h4 className="font-bold text-white text-lg leading-tight">{dish.name}</h4>
                           <p className="text-xs text-cheff-orange font-bold mt-1">{dish.restaurantName}</p>
                        </div>
                        <div className="flex justify-between items-end">
                           <span className="text-gray-300 font-medium">{dish.price} F</span>
                           <div className="flex gap-2">
                              <button 
                                 onClick={(e) => { e.stopPropagation(); handleRecommend(dish.name); }}
                                 className="p-2 bg-white/5 rounded-full text-blue-400 hover:bg-blue-400/20"
                              >
                                 <Share2 size={18} />
                              </button>
                              <button 
                                 onClick={(e) => { e.stopPropagation(); onToggleFavorite(dish.id); }}
                                 className="p-2 bg-white/5 rounded-full text-red-500 hover:bg-red-500/20"
                              >
                                 <Trash2 size={18} />
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   );
};