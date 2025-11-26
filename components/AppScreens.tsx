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

// --- 1. Onboarding Screen (New Flow) ---

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

  // Step 0: Welcome
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

  // Step 1: Preferences (The "Hook")
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

// --- 2. Home Screen (Personalized) ---

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
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredRestaurants = RESTAURANTS.filter(r => {
    if (activeCategory === 'Tout') return true;
    const type = r.cuisineType.toLowerCase();
    const cat = activeCategory.toLowerCase();
    if (activeCategory === 'Africain') return type.includes('congolais') || type.includes('africain');
    if (activeCategory === 'Dessert') return type.includes('boulangerie') || type.includes('pâtisserie') || type.includes('dessert') || type.includes('glace');
    if (activeCategory === 'Sushi') return type.includes('japonais') || type.includes('sushi');
    return type.includes(cat);
  });

  // "Recommended For You" Logic based on Preferences
  const recommendedDishes = RESTAURANTS.flatMap(r => 
    r.menu.filter(d => userPreferences.some(pref => d.category.includes(pref) || r.cuisineType.includes(pref))).map(d => ({
      ...d,
      restaurantName: r.name,
      restaurantId: r.id
    }))
  ).slice(0, 5); // Limit to 5

  // Get Last Order for Quick Reorder
  const lastOrder = orders && orders.length > 0 ? orders[0] : null;

  return (
    <div className="pb-32 pt-2 px-4 space-y-6 bg-gradient-to-b from-[#3E2723] to-[#2c1a16] min-h-screen">
      {/* Header */}
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

      {/* Sticky Search Input */}
      <div className="sticky top-2 z-30 shadow-lg shadow-[#3E2723]/50 rounded-2xl">
         <SearchInput />
      </div>

      {/* QUICK REORDER WIDGET (RETENTION) */}
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

      {/* RECOMMENDED FOR YOU (Personalized Section) */}
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

      {/* Categories (Pill Filters) */}
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

      {/* All Restaurants List */}
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
                {/* Large Cover Image */}
                <div className="h-48 w-full relative overflow-hidden">
                   <img 
                      src={resto.image} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt={resto.name} 
                      loading="lazy"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#2c1a16] via-transparent to-transparent opacity-90" />
                </div>

                {/* Content Overlay/Body */}
                <div className="relative px-5 pb-5 -mt-12">
                   <div className="flex justify-between items-end mb-2">
                      {/* Logo Avatar */}
                      <div className="w-16 h-16 rounded-2xl border-4 border-[#2c1a16] bg-[#2c1a16] shadow-lg overflow-hidden">
                         <img src={resto.logo || resto.image} className="w-full h-full object-cover" alt={`${resto.name} logo`} />
                      </div>
                      
                      {/* Rating Badge */}
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
                           <Clock size={14} className="text-cheff-orange