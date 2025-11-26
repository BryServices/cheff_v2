
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Star, Clock, ShoppingBag, Truck, Check, ChevronRight, Utensils, CreditCard, Trash2, ArrowRight, Heart, Plus, Minus, ChevronLeft, Filter, User, Settings, History, Bell, HelpCircle, LogOut, FileText, Smartphone, MessageCircle, Gift, X, Ticket, Bike, Package, Camera, Edit2, Save, Mail, Upload, Home as HomeIcon, Briefcase, UtensilsCrossed, AlignLeft, Info, Megaphone, Flame, ThumbsUp, Moon, Globe, Shield, Zap, ArrowLeft, AlertTriangle, CheckCircle, Lock, Share2, Award, Zap as ZapIcon, PlusCircle, Download } from 'lucide-react';
import { Restaurant, Dish, CartItem, PaymentMethod, Notification, Order, OrderStatus, ScreenName, UserProfile } from '../types';
import { Button, Header, SearchInput, QuantityControl } from './UIComponents';
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
}> = ({ onSelectRestaurant, onSelectDish, onNotifications, notificationCount, favoriteIds, onToggleFavorite, userPreferences }) => {
  const [activeCategory, setActiveCategory] = useState('Tout');

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

      {/* RECOMMENDED FOR YOU (Personalized Section) */}
      {recommendedDishes.length > 0 && (
        <section className="space-y-4 animate-fade-in">
           <div className="flex items-center justify-between px-1">
             <h3 className="text-lg font-bold text-white flex items-center gap-2">Spécialement pour vous <span className="text-lg" aria-hidden="true">❤️</span></h3>
           </div>
           <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 snap-x snap-mandatory scroll-pl-4">
              {recommendedDishes.map((dish) => (
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
           {filteredRestaurants.map(resto => {
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
                           <Clock size={14} className="text-cheff-orange" /> {resto.deliveryTime}
                         </span>
                         <span className="flex items-center gap-1.5">
                           <Truck size={14} className="text-cheff-orange" /> {resto.deliveryFee} FCFA
                         </span>
                         <span className="flex items-center gap-1.5 text-cheff-green">
                           <ShoppingBag size={14} /> Min. 2000
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

// --- Restaurant Detail Screen ---
export const RestaurantDetailScreen: React.FC<{
  restaurant: Restaurant;
  onBack: () => void;
  onSelectDish: (dish: Dish) => void;
  onAddToCart: (dish: Dish, qty: number, options: string[]) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}> = ({ restaurant, onBack, onSelectDish, onAddToCart, isFavorite, onToggleFavorite }) => {
  const categories = Array.from(new Set(restaurant.menu.map(d => d.category)));

  return (
    <div className="bg-[#3E2723] min-h-screen pb-24">
      {/* Header Image */}
      <div className="relative h-64 w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#3E2723] z-10" />
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        
        <div className="absolute top-0 left-0 right-0 z-20">
           <Header 
              onBack={onBack} 
              transparent 
              rightAction={
                <button 
                  onClick={onToggleFavorite}
                  aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                  className={`p-2.5 rounded-full backdrop-blur-md border border-white/10 ${isFavorite ? 'bg-cheff-orange text-white' : 'bg-black/30 text-white'}`}
                >
                  <Heart size={22} className={isFavorite ? "fill-white" : ""} />
                </button>
              }
            />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="flex justify-between items-end">
            <div>
               <h1 className="text-3xl font-extrabold text-white mb-2 shadow-black drop-shadow-md">{restaurant.name}</h1>
               <p className="text-white/90 text-sm font-medium mb-3">{restaurant.cuisineType}</p>
               <div className="flex items-center gap-4 text-xs font-semibold text-white/80">
                  <span className="bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1"><Star size={12} className="fill-yellow-400 text-yellow-400" /> {restaurant.rating}</span>
                  <span className="bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1"><Clock size={12} /> {restaurant.deliveryTime}</span>
                  <span className="bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1"><Truck size={12} /> {restaurant.deliveryFee} FCFA</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-4 py-4 space-y-8 rounded-t-[2rem] bg-[#3E2723] -mt-6 relative z-30">
        {restaurant.description && (
          <div className="bg-[#2c1a16] p-4 rounded-2xl border border-white/5 shadow-md">
             <p className="text-gray-300 text-sm leading-relaxed italic border-l-2 border-cheff-orange pl-3">{restaurant.description}</p>
          </div>
        )}

        {categories.map((cat) => (
          <div key={cat} className="space-y-4">
             <h3 className="text-xl font-bold text-cheff-cream sticky top-0 bg-[#3E2723]/95 backdrop-blur-sm py-4 z-10 border-b border-white/5">{cat}</h3>
             <div className="grid gap-4">
                {restaurant.menu.filter(d => d.category === cat).map(dish => (
                  <DishRow 
                    key={dish.id} 
                    dish={dish} 
                    onSelect={() => onSelectDish(dish)}
                    onAdd={() => onAddToCart(dish, 1, [])}
                  />
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Dish Detail Screen (Unchanged) ---
export const DishDetailScreen: React.FC<{
  dish: Dish;
  restaurantName: string;
  onBack: () => void;
  onAddToCart: (dish: Dish, qty: number, options: string[]) => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}> = ({ dish, restaurantName, onBack, onAddToCart, isFavorite, onToggleFavorite }) => {
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const isPizza = dish.category.toLowerCase().includes('pizza');
  const isBurger = dish.category.toLowerCase().includes('burger');
  
  const sizes = isPizza ? [
    { label: 'Standard', sub: '30cm', priceMod: 0 },
    { label: 'XL', sub: '40cm', priceMod: 1500 },
    { label: 'XXL', sub: '50cm', priceMod: 3000 },
  ] : isBurger ? [
    { label: 'Solo', sub: 'Sandwich seul', priceMod: 0 },
    { label: 'Menu', sub: '+Frites & Boisson', priceMod: 2000 },
  ] : [
    { label: 'Standard', sub: 'Portion normale', priceMod: 0 },
    { label: 'Gourmand', sub: 'Grande portion', priceMod: 1500 },
  ];

  const preferencesOptions = isBurger 
    ? ['Bien cuit', 'Saignant', 'À point', 'Sans Oignon', 'Sans Tomate', 'Sauce à part']
    : isPizza 
    ? ['Pâte Fine', 'Pâte Épaisse', 'Bien cuit', 'Origan Extra', 'Base Crème']
    : ['Sans piment', 'Piment à part', 'Bien chaud', 'Couverts'];

  const handlePreferenceToggle = (pref: string) => {
    setSelectedPreferences(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const currentSizeObj = sizes.find(s => s.label === selectedSize) || sizes[0];
  const unitPrice = dish.price + currentSizeObj.priceMod;
  const totalPrice = unitPrice * quantity;

  const getFormattedOptions = () => {
    const opts = [`Taille: ${selectedSize}`];
    if (selectedPreferences.length > 0) opts.push(...selectedPreferences);
    if (instructions) opts.push(`Note: ${instructions}`);
    return opts;
  };

  return (
    <div className="bg-[#3E2723] h-screen flex flex-col relative overflow-hidden">
      <Header 
        onBack={onBack} 
        title={restaurantName} 
        rightAction={
          onToggleFavorite && (
            <button 
              onClick={onToggleFavorite}
              aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              className={`p-2.5 rounded-full transition-all active:scale-95 backdrop-blur-md border border-white/10 ${isFavorite ? 'bg-cheff-orange text-white' : 'bg-black/30 text-white'}`}
            >
              <Heart size={22} className={isFavorite ? "fill-white" : ""} />
            </button>
          )
        }
      />
      
      {/* Main Scroll Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
         {/* Image Header */}
         <div className="w-full h-80 relative">
            <img src={dish.image} className="w-full h-full object-cover rounded-b-[3rem] shadow-2xl" alt={dish.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723] via-transparent to-black/30 opacity-90" />
            
            <div className="absolute bottom-8 left-6 right-6">
               <span className="bg-cheff-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block shadow-md">
                 {dish.category}
               </span>
               <h1 className="text-4xl font-extrabold text-white leading-tight mb-2 shadow-black drop-shadow-md">{dish.name}</h1>
               <p className="text-gray-200 text-sm font-medium leading-relaxed opacity-90 line-clamp-2">{dish.description}</p>
            </div>
         </div>

         <div className="px-6 py-6 space-y-8 pb-40">
            {/* 1. VARIATIONS / TAILLES */}
            <div className="space-y-4">
               <h3 className="font-bold text-lg text-cheff-cream flex items-center gap-2">
                 <UtensilsCrossed size={18} className="text-cheff-orange"/> Choisissez votre formule
               </h3>
               <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {sizes.map((size) => {
                    const isSelected = selectedSize === size.label;
                    return (
                      <button 
                        key={size.label}
                        onClick={() => setSelectedSize(size.label)}
                        className={`relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center text-center gap-1 outline-none focus:ring-2 focus:ring-cheff-orange ${
                          isSelected 
                            ? 'bg-cheff-orange border-cheff-orange shadow-lg shadow-cheff-orange/20 scale-[1.02]' 
                            : 'bg-[#2c1a16] border-white/5 hover:bg-white/5 text-gray-400'
                        }`}
                      >
                         <span className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-gray-200'}`}>{size.label}</span>
                         <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>{size.sub}</span>
                         {size.priceMod > 0 && (
                           <span className={`text-xs font-bold mt-1 px-2 py-0.5 rounded-md ${isSelected ? 'bg-white/20 text-white' : 'bg-cheff-orange/10 text-cheff-orange'}`}>
                             +{size.priceMod} F
                           </span>
                         )}
                      </button>
                    )
                  })}
               </div>
            </div>

            {/* 2. PERSONNALISATION */}
            <div className="space-y-4">
               <h3 className="font-bold text-lg text-cheff-cream flex items-center gap-2">
                 <ThumbsUp size={18} className="text-cheff-orange"/> Vos préférences
               </h3>
               <div className="flex flex-wrap gap-3">
                  {preferencesOptions.map((pref) => {
                    const isSelected = selectedPreferences.includes(pref);
                    return (
                      <button
                        key={pref}
                        onClick={() => handlePreferenceToggle(pref)}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cheff-orange ${
                          isSelected
                             ? 'bg-white text-[#3E2723] border-white shadow-md transform scale-105'
                             : 'bg-transparent border-white/20 text-gray-400 hover:border-white/50 hover:text-white'
                        }`}
                      >
                        {isSelected && <span className="mr-1">✓</span>} {pref}
                      </button>
                    )
                  })}
               </div>
            </div>

            {/* 3. INSTRUCTIONS */}
            <div className="space-y-4">
               <h3 className="font-bold text-lg text-cheff-cream flex items-center gap-2">
                 <MessageCircle size={18} className="text-cheff-orange"/> Note au chef
               </h3>
               <textarea 
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Allergies ? Code porte ? Dites-nous tout..."
                  className="w-full h-24 bg-[#2c1a16] border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 outline-none focus:border-cheff-orange/50 focus:bg-white/5 transition-all resize-none text-sm shadow-inner"
               />
            </div>
         </div>
      </div>

      {/* FOOTER Sticky to bottom */}
      <div className="bg-[#2c1a16]/95 backdrop-blur-xl p-6 pb-8 rounded-t-[2.5rem] border-t border-white/10 shadow-[0_-10px_60px_rgba(0,0,0,0.5)] z-40 w-full shrink-0">
          <div className="flex items-center justify-between gap-6">
            <div className="flex flex-col items-center gap-1">
               <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Quantité</span>
               <QuantityControl value={quantity} onChange={setQuantity} />
            </div>

            <Button 
               fullWidth 
               onClick={() => onAddToCart(dish, quantity, getFormattedOptions())}
               className="py-4 text-lg shadow-xl shadow-cheff-orange/20 flex-1 h-full"
            >
               <div className="flex flex-col items-center leading-none">
                 <span className="text-sm font-medium opacity-90 mb-0.5">Ajouter au panier</span>
                 <span className="font-extrabold text-xl">
                   {totalPrice.toLocaleString()} FCFA
                 </span>
               </div>
            </Button>
          </div>
      </div>
    </div>
  );
};

// --- Cart Screen (Unchanged) ---
type CartItemWithIndex = CartItem & { originalIndex: number };
export const CartScreen: React.FC<{
  cart: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemove: (index: number) => void;
  onCheckout: () => void;
}> = ({ cart, onBack, onUpdateQuantity, onRemove, onCheckout }) => {
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  // Group items by Restaurant
  const groupedItems = cart.reduce((acc, item, index) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = {
        restaurantName: item.restaurantName,
        items: []
      };
    }
    acc[item.restaurantId].items.push({ ...item, originalIndex: index });
    return acc;
  }, {} as Record<string, { restaurantName: string, items: CartItemWithIndex[] }>);

  const numberOfRestaurants = Object.keys(groupedItems).length;
  const deliveryFeePerResto = 1000;
  const totalDeliveryFee = numberOfRestaurants * deliveryFeePerResto;
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + totalDeliveryFee;

  if (cart.length === 0) {
    return (
      <div className="h-screen bg-[#3E2723] flex flex-col items-center justify-center p-8 text-center">
         <div className="w-40 h-40 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
           <ShoppingBag size={64} className="text-white/20" />
         </div>
         <h2 className="text-2xl font-bold text-cheff-cream mb-2">Votre panier est vide</h2>
         <p className="text-gray-400 mb-8">Découvrez nos meilleurs plats et commencez votre commande !</p>
         <Button onClick={onBack}>
           Découvrir les restos
         </Button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#3E2723] flex flex-col relative">
      <Header title="Mon Panier" onBack={onBack} />
      
      {/* Scrollable List - Added extra padding bottom to avoid overlap with footer */}
      <div className="flex-1 overflow-y-auto px-4 py-2 pb-[350px] no-scrollbar space-y-6">
         {Object.keys(groupedItems).map((restId) => {
           const group = groupedItems[restId];
           return (
             <div key={restId} className="space-y-4 animate-fade-in-up">
                <div className="flex items-center gap-3 px-2">
                   <div className="bg-cheff-orange/20 p-2 rounded-xl text-cheff-orange">
                     <Utensils size={18} />
                   </div>
                   <h3 className="font-bold text-lg text-cheff-cream">{group.restaurantName}</h3>
                </div>

                <div className="space-y-4">
                   {group.items.map((item) => (
                     <div key={item.originalIndex} className="bg-[#2c1a16] rounded-[2rem] p-4 border border-white/5 shadow-md flex gap-4 relative overflow-hidden">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/5 flex-shrink-0">
                          <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-between py-1">
                           <div>
                               <div className="flex justify-between items-start">
                                 <h4 className="font-bold text-cheff-cream text-base line-clamp-1 pr-8">{item.name}</h4>
                                 <button 
                                   onClick={() => setItemToDelete(item.originalIndex)}
                                   aria-label="Supprimer"
                                   className="text-gray-500 hover:text-red-400 absolute top-4 right-4 p-2 bg-white/5 rounded-full backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                                 >
                                   <Trash2 size={16} />
                                 </button>
                               </div>
                               {item.options && item.options.length > 0 && (
                                 <div className="mt-1 flex flex-wrap gap-1">
                                    {item.options.map((opt, i) => (
                                       <span key={i} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400 border border-white/5">{opt}</span>
                                    ))}
                                 </div>
                               )}
                           </div>
                           
                           <div className="flex items-end justify-between mt-2">
                              <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/5">
                                 <button 
                                   onClick={() => onUpdateQuantity(item.originalIndex, item.quantity - 1)}
                                   aria-label="Moins"
                                   className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all focus:outline-none focus:ring-1 focus:ring-white"
                                 >
                                   <Minus size={14} className="text-white" />
                                 </button>
                                 <span className="font-bold w-8 text-center text-cheff-cream">{item.quantity}</span>
                                 <button 
                                   onClick={() => onUpdateQuantity(item.originalIndex, item.quantity + 1)}
                                   aria-label="Plus"
                                   className="w-8 h-8 flex items-center justify-center rounded-lg bg-cheff-orange text-white shadow-lg shadow-cheff-orange/20 active:scale-95 transition-all focus:outline-none focus:ring-1 focus:ring-cheff-orange"
                                 >
                                   <Plus size={14} />
                                 </button>
                              </div>

                              <span className="font-bold text-lg text-cheff-orange">{(item.price * item.quantity).toLocaleString()} F</span>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           );
         })}
      </div>

      {/* CONFIRM DELETE MODAL */}
      {itemToDelete !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#2c1a16] p-6 rounded-[2rem] border border-white/10 shadow-2xl max-w-xs w-full text-center">
             <AlertTriangle size={48} className="text-cheff-orange mx-auto mb-4" />
             <h3 className="text-xl font-bold text-white mb-2">Retirer l'article ?</h3>
             <p className="text-gray-400 text-sm mb-6">Voulez-vous vraiment supprimer cet article de votre panier ?</p>
             <div className="flex gap-4">
                <Button variant="secondary" fullWidth onClick={() => setItemToDelete(null)}>Annuler</Button>
                <Button fullWidth onClick={() => { onRemove(itemToDelete); setItemToDelete(null); }}>Retirer</Button>
             </div>
          </div>
        </div>
      )}

      {/* Summary Footer Fixed at Bottom - Lifted above BottomNav */}
      <div className="fixed bottom-24 left-4 right-4 bg-[#2c1a16] p-6 rounded-[2.5rem] shadow-2xl shadow-black/80 border border-white/10 z-40 animate-slide-up">
         <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-400 text-sm">
               <span>Sous-total</span>
               <span className="font-medium text-gray-300">{subtotal.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-gray-400 text-sm">
               <span>Livraison ({numberOfRestaurants} resto{numberOfRestaurants > 1 ? 's' : ''})</span>
               <span className="font-medium text-gray-300">{totalDeliveryFee.toLocaleString()} FCFA</span>
            </div>
            <div className="my-2 h-px bg-white/10 w-full" />
            <div className="flex justify-between text-white items-end">
               <span className="text-sm font-medium opacity-80">Total à payer</span>
               <span className="text-cheff-orange text-3xl font-bold tracking-tight">{total.toLocaleString()} <span className="text-sm text-cheff-orange/70 font-normal">FCFA</span></span>
            </div>
         </div>
         <Button fullWidth onClick={onCheckout} className="py-4 text-lg shadow-xl shadow-cheff-orange/30">
            Passer la commande
         </Button>
      </div>
    </div>
  );
};

// --- 8. Profile Screen (Enhanced with Loyalty) ---

export const ProfileScreen: React.FC<{ 
  onLogout: () => void;
  onNavigate: (screen: ScreenName) => void;
  isLoggedIn: boolean;
  onLogin: (data?: any) => void;
  user: { name: string; phone: string; email: string; avatar: string; loyaltyPoints?: number; };
  onUpdateUser: (data: any) => void;
}> = ({ onLogout, onNavigate, isLoggedIn, onLogin, user, onUpdateUser }) => {
  const [activeModal, setActiveModal] = useState<null | 'EDIT_INFO' | 'ADDRESSES' | 'PAYMENT' | 'SUPPORT' | 'SETTINGS' | 'AUTH_LOGIN' | 'AUTH_SIGNUP'>(null);
  const [userInfo, setUserInfo] = useState(user);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null); // PWA Install Prompt

  // Login Form
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });

  // Address Management State
  const [savedAddresses, setSavedAddresses] = useState([
    { id: 1, label: 'Maison', location: 'Poto-Poto, Arrêt Pharmacie' },
    { id: 2, label: 'Bureau', location: 'Centre Ville, Immeuble ARC' }
  ]);
  const [newAddress, setNewAddress] = useState({ label: '', location: '' });
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  // Payment Management State
  const [savedPayments, setSavedPayments] = useState([
    { id: 1, type: 'MTN Mobile Money', number: '06 123 4567' },
    { id: 2, type: 'Airtel Money', number: '05 987 6543' }
  ]);
  const [newPayment, setNewPayment] = useState({ type: 'MTN Mobile Money', number: '' });
  const [isAddingPayment, setIsAddingPayment] = useState(false);

  // PWA Install Effect
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };
  
  // Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.identifier && loginForm.password) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        const nameGuess = loginForm.identifier.includes('@') ? loginForm.identifier.split('@')[0] : 'Utilisateur';
        onLogin({ email: loginForm.identifier, name: nameGuess }); 
        setActiveModal(null);
      }, 1500);
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => { e.preventDefault(); onLogin({ name: 'Nouveau User', phone: '060000000' }); setActiveModal(null); };

  // Address Handlers
  const handleAddAddress = () => {
    if (newAddress.label && newAddress.location) {
      setSavedAddresses([...savedAddresses, { id: Date.now(), ...newAddress }]);
      setNewAddress({ label: '', location: '' });
      setIsAddingAddress(false);
    }
  };
  const handleDeleteAddress = (id: number) => {
    setSavedAddresses(savedAddresses.filter(addr => addr.id !== id));
  };

  // Payment Handlers
  const handleAddPayment = () => {
    if (newPayment.number) {
      setSavedPayments([...savedPayments, { id: Date.now(), ...newPayment }]);
      setNewPayment({ type: 'MTN Mobile Money', number: '' });
      setIsAddingPayment(false);
    }
  };
  const handleDeletePayment = (id: number) => {
    setSavedPayments(savedPayments.filter(p => p.id !== id));
  };

  const menuGroups = [
    { title: "Mon Compte", items: [{ icon: Heart, label: 'Mes Favoris', action: () => onNavigate('FAVORITES') }, { icon: MapPin, label: 'Mes adresses', action: () => setActiveModal('ADDRESSES') }, { icon: CreditCard, label: 'Moyens de paiement', action: () => setActiveModal('PAYMENT') }] },
    { 
      title: "Application", 
      items: [
        { icon: Settings, label: 'Paramètres', action: () => setActiveModal('SETTINGS') }, 
        { icon: HelpCircle, label: 'Aide & Support', action: () => setActiveModal('SUPPORT') },
        ...(deferredPrompt ? [{ icon: Download, label: "Installer l'application", action: handleInstallApp }] : [])
      ] 
    }
  ];

  if (!isLoggedIn) {
    return (
      <div className="bg-[#3E2723] min-h-screen flex flex-col p-6 relative overflow-hidden">
        {/* Background elements preserved */}
        <div className="absolute top-[-10%] right-[-10%] w-60 h-60 bg-cheff-orange/10 rounded-full blur-[80px]" />
        
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in-up">
           <div className="w-32 h-32 bg-white/5 rounded-[2rem] flex items-center justify-center relative border border-white/10 shadow-2xl rotate-3">
              <User size={64} className="text-cheff-cream opacity-80" />
              <div className="absolute -bottom-3 -right-3 bg-cheff-orange p-2 rounded-xl shadow-lg">
                 <Lock size={20} className="text-white" />
              </div>
           </div>
           
           <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-white">Mon Profil</h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-xs mx-auto">
                 Connectez-vous pour accéder à vos favoris, suivre vos commandes et gérer vos préférences.
              </p>
           </div>

           <div className="w-full max-w-sm space-y-4 pt-4">
              <Button fullWidth onClick={() => setActiveModal('AUTH_LOGIN')} className="shadow-xl shadow-cheff-orange/20">Se connecter</Button>
              <button onClick={() => setActiveModal('AUTH_SIGNUP')} className="w-full py-4 rounded-2xl font-semibold border-2 border-white/10 text-white hover:bg-white/5 transition-colors">Créer un compte</button>
           </div>
        </div>

        {/* LOGIN MODAL WITH LOADING STATE */}
        {activeModal === 'AUTH_LOGIN' && (
          <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setActiveModal(null)}></div>
            <div className="bg-[#2c1a16] w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 relative z-10 animate-slide-up border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-2xl font-bold text-white">Connexion</h3>
                 <button onClick={() => setActiveModal(null)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 ml-1">Email ou Téléphone</label>
                    <input 
                      type="text" 
                      placeholder="votre@email.com"
                      value={loginForm.identifier}
                      onChange={e => setLoginForm({...loginForm, identifier: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-cheff-orange/50 transition-colors placeholder-gray-500"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 ml-1">Mot de passe</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-cheff-orange/50 transition-colors placeholder-gray-500"
                    />
                 </div>
                 
                 <Button fullWidth type="submit" className="py-4 text-lg mt-4" isLoading={isSubmitting}>
                    Se connecter
                 </Button>
              </form>
            </div>
          </div>
        )}
        {/* Placeholder for Signup modal to avoid breaking code structure if copied */}
        {activeModal === 'AUTH_SIGNUP' && <div onClick={() => setActiveModal(null)} className="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center text-white">Signup Placeholder</div>}
      </div>
    );
  }

  // --- LOGGED IN VIEW ---
  return (
    <div className="bg-[#3E2723] min-h-screen pb-32 relative">
       {/* ERGONOMIC HEADER */}
       <div className="relative pb-24">
          <div className="h-48 w-full bg-gradient-to-b from-cheff-orange/30 to-[#3E2723] relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-cheff-orange/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="absolute top-20 left-4 right-4 bg-[#2c1a16]/80 backdrop-blur-md rounded-[2.5rem] p-6 shadow-2xl border border-white/5 flex flex-col items-center">
             <div className="relative -mt-16 mb-3">
                <div className="w-28 h-28 rounded-full p-1.5 bg-[#3E2723] shadow-lg">
                   <div className="w-full h-full rounded-full overflow-hidden bg-black relative group cursor-pointer">
                      <img src={userInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                   </div>
                </div>
             </div>
             <div className="text-center w-full mb-6">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">{userInfo.name}</h2>
                <p className="text-sm text-gray-400">{userInfo.email || userInfo.phone}</p>
             </div>
             
             {/* GAMIFICATION - LOYALTY CARD */}
             <div className="w-full bg-gradient-to-r from-cheff-orange to-[#FF9E80] rounded-2xl p-4 shadow-lg mb-4 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-xl"></div>
                <div className="relative z-10 flex justify-between items-center text-white">
                   <div>
                      <span className="text-xs font-bold uppercase tracking-wider opacity-90">Mes CheffPoints</span>
                      <div className="text-3xl font-extrabold">{user.loyaltyPoints || 0} pts</div>
                   </div>
                   <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Award size={20} className="text-white" />
                   </div>
                </div>
                <div className="w-full bg-black/10 h-1.5 rounded-full mt-3 overflow-hidden">
                   <div className="bg-white h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-[10px] text-white/80 mt-1 font-medium">Encore 80 pts pour le statut Gold</p>
             </div>

             <div className="w-full grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <button className="flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer" onClick={() => onNavigate('ORDERS')}>
                   <span className="text-2xl font-bold text-white">12</span>
                   <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Commandes</span>
                </button>
                <button className="flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer" onClick={() => onNavigate('FAVORITES')}>
                   <span className="text-2xl font-bold text-white">4</span>
                   <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Favoris</span>
                </button>
             </div>
          </div>
       </div>

       <div className="px-4 space-y-8 mt-44">
          {menuGroups.map((group, groupIdx) => (
             <div key={groupIdx}>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-4">{group.title}</h3>
                <div className="space-y-3">
                   {group.items.map((item, i) => {
                     const Icon = item.icon;
                     return (
                       <button 
                          key={i} 
                          onClick={item.action}
                          className="w-full flex items-center justify-between p-4 bg-[#2c1a16] border border-white/5 rounded-[1.5rem] hover:bg-white/5 transition-all group active:scale-[0.99] focus:outline-none focus:ring-1 focus:ring-cheff-orange"
                       >
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-cheff-orange/10 flex items-center justify-center text-cheff-orange group-hover:bg-cheff-orange group-hover:text-white transition-colors">
                                <Icon size={20} />
                             </div>
                             <span className="font-semibold text-cheff-cream text-base">{item.label}</span>
                          </div>
                          <ChevronRight size={16} className="text-gray-500" />
                       </button>
                     );
                   })}
                </div>
             </div>
          ))}

          <button onClick={onLogout} className="w-full mt-4 bg-transparent border-2 border-red-500/20 rounded-[1.5rem] p-4 flex items-center justify-center gap-3 text-red-400 font-bold hover:bg-red-500/10 transition-colors">
             <LogOut size={20} />
             Se déconnecter
          </button>
       </div>

       {/* --- MODAL: ADDRESSES --- */}
       {activeModal === 'ADDRESSES' && (
          <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
             <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setActiveModal(null)}></div>
             <div className="bg-[#2c1a16] w-full max-w-md h-[80vh] sm:h-auto rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 relative z-10 animate-slide-up border border-white/10 shadow-2xl flex flex-col">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-2xl font-bold text-white">Mes Adresses</h3>
                   <button onClick={() => setActiveModal(null)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 mb-4">
                   {savedAddresses.map(addr => (
                      <div key={addr.id} className="bg-white/5 rounded-2xl p-4 flex justify-between items-center border border-white/5">
                         <div className="flex items-center gap-3">
                            <div className="bg-cheff-orange/20 p-2 rounded-xl text-cheff-orange"><MapPin size={20}/></div>
                            <div>
                               <h4 className="font-bold text-white">{addr.label}</h4>
                               <p className="text-sm text-gray-400">{addr.location}</p>
                            </div>
                         </div>
                         <button onClick={() => handleDeleteAddress(addr.id)} className="p-2 text-gray-500 hover:text-red-400"><Trash2 size={18}/></button>
                      </div>
                   ))}

                   {isAddingAddress ? (
                      <div className="bg-white/5 rounded-2xl p-4 border border-cheff-orange/30 space-y-3 animate-fade-in">
                         <input 
                            type="text" placeholder="Nom (ex: Maison)" 
                            value={newAddress.label} onChange={e => setNewAddress({...newAddress, label: e.target.value})}
                            className="w-full bg-black/20 rounded-xl p-3 text-white outline-none border border-white/10 focus:border-cheff-orange"
                         />
                         <input 
                            type="text" placeholder="Détails (Quartier, Repères)" 
                            value={newAddress.location} onChange={e => setNewAddress({...newAddress, location: e.target.value})}
                            className="w-full bg-black/20 rounded-xl p-3 text-white outline-none border border-white/10 focus:border-cheff-orange"
                         />
                         <div className="flex gap-2">
                            <Button fullWidth variant="secondary" onClick={() => setIsAddingAddress(false)}>Annuler</Button>
                            <Button fullWidth onClick={handleAddAddress}>Sauvegarder</Button>
                         </div>
                      </div>
                   ) : (
                      <button onClick={() => setIsAddingAddress(true)} className="w-full py-4 rounded-2xl border-2 border-dashed border-white/20 text-gray-400 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2">
                         <Plus size={20} /> Ajouter une adresse
                      </button>
                   )}
                </div>
             </div>
          </div>
       )}

       {/* --- MODAL: PAYMENT METHODS --- */}
       {activeModal === 'PAYMENT' && (
          <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
             <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setActiveModal(null)}></div>
             <div className="bg-[#2c1a16] w-full max-w-md h-[60vh] sm:h-auto rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 relative z-10 animate-slide-up border border-white/10 shadow-2xl flex flex-col">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-2xl font-bold text-white">Moyens de paiement</h3>
                   <button onClick={() => setActiveModal(null)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 mb-4">
                   {savedPayments.map(payment => (
                      <div key={payment.id} className="bg-white/5 rounded-2xl p-4 flex justify-between items-center border border-white/5">
                         <div className="flex items-center gap-3">
                            <div className="bg-cheff-orange/20 p-2 rounded-xl text-cheff-orange"><Smartphone size={20}/></div>
                            <div>
                               <h4 className="font-bold text-white">{payment.type}</h4>
                               <p className="text-sm text-gray-400">{payment.number}</p>
                            </div>
                         </div>
                         <button onClick={() => handleDeletePayment(payment.id)} className="p-2 text-gray-500 hover:text-red-400"><Trash2 size={18}/></button>
                      </div>
                   ))}

                   {isAddingPayment ? (
                      <div className="bg-white/5 rounded-2xl p-4 border border-cheff-orange/30 space-y-3 animate-fade-in">
                         <select 
                            value={newPayment.type} onChange={e => setNewPayment({...newPayment, type: e.target.value})}
                            className="w-full bg-black/20 rounded-xl p-3 text-white outline-none border border-white/10 focus:border-cheff-orange"
                         >
                            <option value="MTN Mobile Money">MTN Mobile Money</option>
                            <option value="Airtel Money">Airtel Money</option>
                         </select>
                         <input 
                            type="tel" placeholder="Numéro (ex: 06 123 4567)" 
                            value={newPayment.number} onChange={e => setNewPayment({...newPayment, number: e.target.value})}
                            className="w-full bg-black/20 rounded-xl p-3 text-white outline-none border border-white/10 focus:border-cheff-orange"
                         />
                         <div className="flex gap-2">
                            <Button fullWidth variant="secondary" onClick={() => setIsAddingPayment(false)}>Annuler</Button>
                            <Button fullWidth onClick={handleAddPayment}>Sauvegarder</Button>
                         </div>
                      </div>
                   ) : (
                      <button onClick={() => setIsAddingPayment(true)} className="w-full py-4 rounded-2xl border-2 border-dashed border-white/20 text-gray-400 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2">
                         <Plus size={20} /> Ajouter un numéro
                      </button>
                   )}
                </div>
             </div>
          </div>
       )}
    </div>
  );
};

// --- Other Exports (Kept Minimal for Context) ---
export const CheckoutScreen: React.FC<any> = ({ onBack, total, onConfirm }) => <div className="p-4 bg-[#3E2723] h-screen"><Header title="Paiement" onBack={onBack}/><Button onClick={onConfirm} fullWidth className="mt-10">Payer {total}F</Button></div>;
export const SuccessScreen: React.FC<any> = ({ onHome }) => <div className="bg-[#3E2723] h-screen flex items-center justify-center flex-col"><CheckCircle size={64} className="text-green-500 mb-4"/><h2 className="text-white text-2xl font-bold">Succès !</h2><Button onClick={onHome} className="mt-8">Retour Accueil</Button></div>;
export const NotificationScreen: React.FC<any> = ({ onBack }) => <div className="bg-[#3E2723] h-screen"><Header title="Notifications" onBack={onBack}/></div>;
export const AllDishesScreen: React.FC<any> = ({ onSelectDish }) => <div className="bg-[#3E2723] h-screen p-4">All Dishes</div>;
export const OrdersScreen: React.FC<any> = () => <div className="bg-[#3E2723] h-screen p-4">Orders</div>;
export const FavoritesScreen: React.FC<any> = ({ onBack }) => <div className="bg-[#3E2723] h-screen"><Header title="Favoris" onBack={onBack}/></div>;
