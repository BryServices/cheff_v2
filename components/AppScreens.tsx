import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock, ShoppingBag, Truck, Check, ChevronRight, Utensils, CreditCard, Trash2, ArrowRight, Heart, Plus, ChevronLeft, Filter } from 'lucide-react';
import { Restaurant, Dish, CartItem, PaymentMethod } from '../types';
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
    <div onClick={onSelect} className="flex gap-4 p-3 bg-white/[0.03] rounded-[1.5rem] border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group active:scale-[0.99] duration-200">
       {/* Image */}
       <div className="h-28 w-28 rounded-2xl overflow-hidden flex-shrink-0 relative shadow-md">
         <img src={dish.image} alt={dish.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
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
           <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{dish.description}</p>
         </div>
         <div className="flex justify-between items-end mt-2">
           <span className="font-bold text-cheff-orange text-lg">{dish.price.toLocaleString()} FC</span>
           <button 
             onClick={handleAdd}
             className={`h-9 flex items-center justify-center rounded-xl shadow-lg active:scale-90 transition-all duration-300 ${
               isAdded 
                 ? 'bg-cheff-green text-white px-3 gap-1' 
                 : 'bg-white/10 text-white w-9 hover:bg-cheff-orange'
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

export const OnboardingScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#3E2723]">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[60%] bg-cheff-orange/20 rounded-full blur-[100px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] bg-[#5D4037] rounded-full blur-[80px]" />
      </div>
      
      <div className="z-10 flex flex-col items-center text-center px-8 w-full max-w-md animate-fade-in-up">
        <div className="relative mb-10">
          <div className="w-40 h-40 bg-gradient-to-br from-cheff-orange to-[#FF9E80] rounded-[2.5rem] rotate-3 flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(255,109,0,0.5)]">
             <Utensils size={64} className="text-white -rotate-3" />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-[#2c1a16] p-3 rounded-2xl shadow-xl border border-white/10 rotate-6">
             <span className="text-2xl">😋</span>
          </div>
        </div>
        
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow-sm">Cheffcongo</h1>
          <div className="h-1 w-12 bg-cheff-orange mx-auto rounded-full mb-6"></div>
        </div>

        <p className="text-lg text-gray-300 leading-relaxed mb-12">
          Le meilleur de la cuisine locale et internationale, livré chaud chez vous.
        </p>

        <div className="w-full">
           <Button fullWidth onClick={onStart} className="text-lg py-5 shadow-2xl shadow-cheff-orange/20">
             C'est parti <ArrowRight size={20} />
           </Button>
        </div>
      </div>
    </div>
  );
};

// --- 2. Home Screen ---

export const HomeScreen: React.FC<{ onSelectRestaurant: (r: Restaurant) => void }> = ({ onSelectRestaurant }) => {
  const [activeCategory, setActiveCategory] = useState('Tout');

  // Filtering Logic
  const filteredRestaurants = RESTAURANTS.filter(r => {
    if (activeCategory === 'Tout') return true;
    const type = r.cuisineType.toLowerCase();
    const cat = activeCategory.toLowerCase();
    if (activeCategory === 'Africain') return type.includes('congolais') || type.includes('africain');
    if (activeCategory === 'Dessert') return type.includes('boulangerie') || type.includes('pâtisserie') || type.includes('dessert') || type.includes('glace');
    if (activeCategory === 'Sushi') return type.includes('japonais') || type.includes('sushi');
    return type.includes(cat);
  });

  const featuredRestaurants = filteredRestaurants.filter(r => r.isFeatured);

  return (
    <div className="pb-32 pt-2 px-4 space-y-8 bg-gradient-to-b from-[#3E2723] to-[#2c1a16] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium ml-1 mb-0.5">Livrer à</span>
          <div className="flex items-center gap-1.5 text-cheff-cream cursor-pointer hover:opacity-80 transition-opacity">
            <MapPin size={18} className="text-cheff-orange" />
            <span className="text-sm font-bold truncate max-w-[150px]">Kinshasa, Gombe</span>
            <ChevronRight size={14} className="text-gray-500" />
          </div>
        </div>
        <div className="h-11 w-11 rounded-full p-[2px] bg-gradient-to-tr from-cheff-orange to-transparent">
          <div className="h-full w-full rounded-full overflow-hidden border-2 border-[#3E2723]">
             <img src="https://picsum.photos/seed/user/100/100" alt="Profile" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      {/* Greeting */}
      <div>
        <h2 className="text-3xl font-bold text-white leading-tight">
          Envie de <span className="text-cheff-orange">manger</span><br/>quoi ce midi ?
        </h2>
      </div>

      {/* Search */}
      <SearchInput />

      {/* Categories (Pill Filters) */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
        {CATEGORIES.map((cat, i) => {
          const isActive = activeCategory === cat.name;
          return (
            <button 
              key={i} 
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 whitespace-nowrap ${
                isActive 
                  ? 'bg-cheff-orange border-cheff-orange text-white shadow-lg shadow-cheff-orange/25' 
                  : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Featured Restaurants Section (Horizontal) */}
      {featuredRestaurants.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between px-1">
             <h3 className="text-lg font-bold text-white flex items-center gap-2">À la une <span className="text-lg">🔥</span></h3>
             <button className="text-cheff-orange text-xs font-bold">Voir tout</button>
          </div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
            {featuredRestaurants.map((resto) => (
              <div 
                key={resto.id} 
                onClick={() => onSelectRestaurant(resto)}
                className="relative min-w-[280px] w-[280px] h-[200px] rounded-[1.5rem] overflow-hidden shadow-xl active:scale-95 transition-transform cursor-pointer group"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                
                <img src={resto.image} alt={resto.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                
                {resto.featuredReason && (
                    <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-md text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {resto.featuredReason}
                    </div>
                )}
                
                <div className="absolute top-3 right-3 z-20 h-8 w-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white">
                  <Heart size={14} />
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20">
                   <div className="flex items-center gap-2 mb-1">
                     <h4 className="text-xl font-bold text-white truncate shadow-black drop-shadow-lg">{resto.name}</h4>
                     {resto.isFeatured && <div className="h-2 w-2 bg-cheff-green rounded-full shadow-[0_0_10px_#00C853]"></div>}
                   </div>
                   <div className="flex items-center gap-3 text-xs text-gray-300 font-medium">
                      <span className="bg-cheff-orange text-white px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> {resto.rating}
                      </span>
                      <span>•</span>
                      <span>{resto.deliveryTime}</span>
                      <span>•</span>
                      <span>Frais {resto.deliveryFee} FC</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main List (Vertical Large Cards) */}
      <div className="space-y-5">
        <h3 className="text-lg font-bold text-white px-1">
          {activeCategory === 'Tout' ? 'Restaurants près de chez toi' : `${filteredRestaurants.length} Résultat(s)`}
        </h3>
        
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-16 opacity-50 bg-white/5 rounded-[2rem] border border-white/5">
            <p className="text-5xl mb-4 grayscale">🥗</p>
            <p className="text-cheff-cream font-medium">Aucun restaurant trouvé</p>
            <p className="text-xs text-gray-500 mt-1">Essayez une autre catégorie</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredRestaurants.map((resto) => (
              <div 
                key={resto.id} 
                onClick={() => onSelectRestaurant(resto)}
                className="bg-[#2c1a16] rounded-[2rem] overflow-hidden border border-white/5 shadow-lg active:scale-[0.98] transition-all duration-300 cursor-pointer group"
              >
                {/* Large Image Header */}
                <div className="h-48 w-full relative">
                  <img src={resto.image} alt={resto.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c1a16] to-transparent opacity-80" />
                  
                  {/* Floating Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {resto.promo && (
                      <span className="bg-cheff-orange text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        {resto.promo}
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 p-5 w-full">
                     <h4 className="text-2xl font-bold text-white mb-1 shadow-black drop-shadow-sm">{resto.name}</h4>
                     <p className="text-sm text-gray-300 font-medium">{resto.cuisineType}</p>
                  </div>
                </div>
                
                {/* Info Footer */}
                <div className="p-5 pt-2 flex justify-between items-center bg-[#2c1a16]">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                     <div className="flex items-center gap-1.5">
                       <Clock size={16} className="text-cheff-orange" />
                       <span>{resto.deliveryTime}</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                       <Truck size={16} className="text-cheff-orange" />
                       <span>{resto.deliveryFee} FC</span>
                     </div>
                  </div>
                  
                  <div className="h-8 w-14 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 text-white font-bold text-sm">
                     {resto.rating} <Star size={10} className="ml-0.5 fill-current text-yellow-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- 3. Restaurant Detail Screen ---

export const RestaurantDetailScreen: React.FC<{ 
  restaurant: Restaurant; 
  onBack: () => void;
  onSelectDish: (dish: Dish) => void; 
  onAddToCart: (dish: Dish, qty: number, options: string[]) => void;
}> = ({ restaurant, onBack, onSelectDish, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('Tout');

  const scrollToMenu = () => {
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const hasPopular = restaurant.menu.some(d => d.popular);
  const uniqueCategories = Array.from(new Set(restaurant.menu.map(d => d.category)));
  const categories = ['Tout', ...(hasPopular ? ['Populaire'] : []), ...uniqueCategories];

  const displayedDishes = restaurant.menu.filter(dish => {
    if (activeCategory === 'Tout') return true;
    if (activeCategory === 'Populaire') return dish.popular;
    return dish.category === activeCategory;
  });

  return (
    <div className="pb-32 bg-[#3E2723] min-h-screen">
      <Header transparent onBack={onBack} rightAction={
        <button className="bg-white/10 p-2.5 rounded-full backdrop-blur-md text-white border border-white/10">
          <Heart size={20} />
        </button>
      } />
      
      {/* Hero Banner with Parallax-like feel */}
      <div className="relative h-[40vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#3E2723] z-10" />
        <img src={restaurant.image} className="w-full h-full object-cover" alt="Banner" />
        
        <div className="absolute bottom-8 left-0 right-0 px-6 z-20">
          <div className="flex justify-between items-end mb-2">
             <h1 className="text-4xl font-extrabold text-white shadow-black drop-shadow-md w-2/3 leading-none">{restaurant.name}</h1>
             <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 flex flex-col items-center">
                <span className="text-xs text-gray-300 uppercase">Avis</span>
                <div className="flex items-center gap-1 font-bold text-white">
                  {restaurant.rating} <Star size={12} className="fill-current text-yellow-400" />
                </div>
             </div>
          </div>
          <p className="text-gray-200 text-sm font-medium flex items-center gap-2">
            {restaurant.cuisineType} <span className="w-1 h-1 bg-gray-400 rounded-full"/> {restaurant.deliveryTime}
          </p>
        </div>
      </div>

      {/* Menu Content */}
      <div id="menu-section" className="px-5 py-8 -mt-6 relative z-30 rounded-t-[2.5rem] bg-[#3E2723] border-t border-white/5 min-h-[60vh] shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Menu</h2>
          <Button variant="ghost" onClick={scrollToMenu} className="text-xs py-1 px-3 h-auto">
             <Filter size={14} className="mr-1"/> Filtrer
          </Button>
        </div>

        {/* Categories Tabs (Sticky) */}
        <div className="sticky top-20 z-40 bg-[#3E2723]/95 backdrop-blur-xl py-4 -mx-5 px-5 border-b border-white/5 mb-6 no-scrollbar overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((cat, i) => (
              <button 
                key={i} 
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-cheff-orange text-white shadow-lg shadow-cheff-orange/20 scale-105' 
                    : 'bg-[#2c1a16] text-gray-400 border border-white/5 hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes List */}
        <div className="space-y-4 min-h-[300px]">
          {displayedDishes.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-10 opacity-50">
               <ShoppingBag size={48} className="mb-2 text-gray-500" />
               <p className="text-gray-500 text-sm">Aucun plat dans cette catégorie.</p>
             </div>
          ) : (
            displayedDishes.map((dish) => (
              <DishRow 
                key={dish.id} 
                dish={dish} 
                onSelect={() => onSelectDish(dish)}
                onAdd={() => onAddToCart(dish, 1, [])}
              />
            ))
          )}
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
}> = ({ dish, restaurantName, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (opt: string) => {
    if (selectedOptions.includes(opt)) {
      setSelectedOptions(selectedOptions.filter(o => o !== opt));
    } else {
      setSelectedOptions([...selectedOptions, opt]);
    }
  };

  return (
    <div className="min-h-screen bg-[#3E2723] relative flex flex-col">
      {/* Immersive Image */}
      <div className="h-[50vh] w-full relative">
        <Header transparent onBack={onBack} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#3E2723] z-10 pointer-events-none" />
        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 -mt-16 relative z-20 flex flex-col pb-32">
        <div className="bg-[#3E2723]/80 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] shadow-2xl mb-6">
          <div className="flex justify-between items-start mb-2">
             <h1 className="text-2xl font-bold text-white w-3/4 leading-tight">{dish.name}</h1>
             <span className="text-2xl font-bold text-cheff-orange whitespace-nowrap">{dish.price.toLocaleString()} FC</span>
          </div>
          <p className="text-cheff-orange text-xs font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
            <Utensils size={12} /> {restaurantName}
          </p>
          <p className="text-gray-300 leading-relaxed text-sm">{dish.description}</p>
        </div>

        {/* Customization */}
        <div className="space-y-5 px-2">
          <h3 className="font-bold text-white text-lg">Personnaliser</h3>
          <div className="flex flex-wrap gap-3">
            {['Sans oignon', 'Sauce à part', 'Extra piment', 'Couverts'].map((opt) => {
              const active = selectedOptions.includes(opt);
              return (
                <button 
                  key={opt}
                  onClick={() => toggleOption(opt)}
                  className={`px-5 py-3 rounded-2xl text-sm font-medium border transition-all duration-200 ${
                    active 
                      ? 'bg-cheff-orange border-cheff-orange text-white shadow-lg shadow-cheff-orange/20' 
                      : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
        <div className="bg-[#2c1a16]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 shadow-2xl flex items-center justify-between gap-4">
           <div className="flex-shrink-0">
             <QuantityControl value={quantity} onChange={setQuantity} />
           </div>
           <Button fullWidth onClick={() => onAddToCart(dish, quantity, selectedOptions)} className="py-4 text-base">
             Ajouter • {(dish.price * quantity).toLocaleString()} FC
           </Button>
        </div>
      </div>
    </div>
  );
};

// --- 5. Cart Screen ---

export const CartScreen: React.FC<{ 
  cart: CartItem[]; 
  onBack: () => void;
  onRemove: (index: number) => void;
  onCheckout: () => void;
}> = ({ cart, onBack, onRemove, onCheckout }) => {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = 2000;
  const total = subtotal + delivery;

  if (cart.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-8 text-center bg-[#3E2723]">
        <div className="bg-white/5 p-8 rounded-full mb-6 border border-white/5 animate-pulse">
          <ShoppingBag size={64} className="text-cheff-orange opacity-80" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Ton panier est vide</h2>
        <p className="text-gray-400 mb-10 text-lg leading-relaxed max-w-xs mx-auto">
          Tu n'as rien trouvé qui te fait envie ? Impossible ! 🍔
        </p>
        <Button onClick={onBack} className="w-48 shadow-xl">Explorer</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#3E2723] pb-32">
      <Header title="Mon Panier" onBack={onBack} />
      
      <div className="pt-24 px-4 space-y-6">
        {/* Items */}
        <div className="space-y-4">
           {cart.map((item, idx) => (
             <div key={`${item.id}-${idx}`} className="flex gap-4 bg-white/5 p-4 rounded-[1.5rem] border border-white/5 hover:bg-white/[0.07] transition-colors">
                <img src={item.image} className="w-20 h-20 rounded-xl object-cover bg-gray-800" alt={item.name} />
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-white text-base">{item.name}</h3>
                    <button onClick={() => onRemove(idx)} className="text-red-400/70 p-1.5 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={16}/></button>
                  </div>
                  <p className="text-xs text-gray-500 mb-2 font-medium">{item.restaurantName}</p>
                  <div className="flex items-center justify-between">
                     <p className="text-sm font-bold text-cheff-orange">{item.price.toLocaleString()} FC <span className="text-gray-500 font-normal">x {item.quantity}</span></p>
                  </div>
                  
                  {item.options && item.options.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.options.map(o => <span key={o} className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md text-gray-300 border border-white/5">{o}</span>)}
                    </div>
                  )}
                </div>
             </div>
           ))}
        </div>

        {/* Remarks */}
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-3 ml-1">Instructions spéciales</label>
          <textarea 
            className="w-full bg-white/5 text-cheff-cream rounded-2xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-cheff-orange border border-white/5 h-24 placeholder-gray-600 resize-none"
            placeholder="Ex: Le code de la porte est 1234, appelez-moi à l'arrivée..."
          ></textarea>
        </div>

        {/* Summary */}
        <div className="bg-[#2c1a16] rounded-[2rem] p-6 space-y-3 border border-white/5 shadow-lg">
          <div className="flex justify-between text-gray-400 text-sm">
            <span>Sous-total</span>
            <span className="text-white">{subtotal.toLocaleString()} FC</span>
          </div>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>Livraison</span>
            <span className="text-white">{delivery.toLocaleString()} FC</span>
          </div>
          <div className="h-px bg-white/10 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-white text-lg">Total</span>
            <span className="font-extrabold text-cheff-orange text-2xl">{total.toLocaleString()} FC</span>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#3E2723]/95 backdrop-blur-xl border-t border-white/5 z-50">
        <Button fullWidth onClick={onCheckout} className="py-4 text-lg shadow-2xl shadow-cheff-orange/20">
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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    if(!paymentMethod) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConfirm();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#3E2723] pb-24">
      <Header title="Paiement" onBack={onBack} />
      
      <div className="pt-24 px-4 space-y-8">
        {/* Address */}
        <section>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><MapPin size={18} className="text-cheff-orange"/> Livraison</h3>
          <div className="bg-white/5 p-5 rounded-[1.5rem] border border-white/5 flex items-center gap-4 hover:bg-white/[0.07] transition-colors cursor-pointer group">
            <div className="h-12 w-12 bg-cheff-orange/20 rounded-full flex items-center justify-center text-cheff-orange group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-base">Maison</p>
              <p className="text-gray-400 text-xs mt-0.5">Av. de la Liberation, Gombe, Kinshasa</p>
            </div>
            <button className="text-cheff-orange text-xs font-bold bg-cheff-orange/10 px-3 py-1 rounded-full">MODIFIER</button>
          </div>
        </section>

        {/* Payment Method */}
        <section>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><CreditCard size={18} className="text-cheff-orange"/> Paiement</h3>
          <div className="space-y-4">
            <div 
              onClick={() => setPaymentMethod('MOBILE_MONEY')}
              className={`p-5 rounded-[1.5rem] border flex items-center gap-4 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                paymentMethod === 'MOBILE_MONEY' 
                  ? 'bg-cheff-orange/10 border-cheff-orange shadow-[0_0_20px_rgba(255,109,0,0.1)]' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              <div className="w-14 h-9 bg-yellow-400 rounded-lg flex items-center justify-center text-[10px] font-bold text-black shadow-md transform -rotate-3">MTN</div>
              <span className="flex-1 text-base font-medium text-white">Mobile Money</span>
              <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'MOBILE_MONEY' ? 'bg-cheff-orange border-cheff-orange' : 'border-gray-500'}`}>
                 {paymentMethod === 'MOBILE_MONEY' && <Check size={14} className="text-white"/>}
              </div>
            </div>
            
            <div 
              onClick={() => setPaymentMethod('AIRTEL_MONEY')}
              className={`p-5 rounded-[1.5rem] border flex items-center gap-4 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                paymentMethod === 'AIRTEL_MONEY' 
                  ? 'bg-cheff-orange/10 border-cheff-orange shadow-[0_0_20px_rgba(255,109,0,0.1)]' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
               <div className="w-14 h-9 bg-red-600 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-md transform -rotate-3">Airtel</div>
              <span className="flex-1 text-base font-medium text-white">Airtel Money</span>
              <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'AIRTEL_MONEY' ? 'bg-cheff-orange border-cheff-orange' : 'border-gray-500'}`}>
                 {paymentMethod === 'AIRTEL_MONEY' && <Check size={14} className="text-white"/>}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 flex items-center justify-center gap-1 opacity-70">
            <CreditCard size={12} /> Paiement chiffré et 100% sécurisé
          </p>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#3E2723]/95 backdrop-blur-xl border-t border-white/5">
        <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-gray-400 text-sm">Total à payer</span>
            <span className="text-2xl font-bold text-white">{total.toLocaleString()} FC</span>
        </div>
        <Button 
          fullWidth 
          onClick={handlePay} 
          disabled={!paymentMethod || loading}
          className={`py-4 text-lg shadow-2xl ${!paymentMethod ? "opacity-50 grayscale" : "shadow-cheff-orange/30"}`}
        >
          {loading ? 'Traitement en cours...' : `Confirmer le paiement`}
        </Button>
      </div>
    </div>
  );
};

// --- 7. Success Screen ---

export const SuccessScreen: React.FC<{ onHome: () => void }> = ({ onHome }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 bg-[#3E2723] text-center relative overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0 bg-gradient-to-tr from-cheff-green/10 to-transparent pointer-events-none" />
       
       <div className="mb-10 relative z-10">
         <div className="h-32 w-32 bg-gradient-to-br from-cheff-green to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(0,200,83,0.5)] animate-bounce">
           <Check size={64} className="text-white" strokeWidth={4} />
         </div>
         <div className="absolute -bottom-4 -right-4 bg-[#2c1a16] px-4 py-2 rounded-xl border border-white/10 shadow-xl">
            <span className="text-white font-bold text-sm">Succès !</span>
         </div>
       </div>

       <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight z-10">Commande Validée</h1>
       <p className="text-gray-300 mb-12 max-w-xs text-lg z-10 leading-relaxed">
         Le restaurant a reçu votre commande. Ça va sentir bon très bientôt ! 🍲
       </p>

       <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-8 w-full max-w-sm border border-white/5 mb-8 z-10 shadow-2xl">
         <div className="flex items-center justify-between mb-6">
           <span className="text-gray-400 text-sm font-medium">Temps estimé</span>
           <span className="text-cheff-orange font-bold text-xl">35 - 45 min</span>
         </div>
         <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden mb-4">
           <div className="h-full bg-gradient-to-r from-cheff-green to-emerald-400 w-1/4 rounded-full shadow-[0_0_10px_rgba(0,200,83,0.8)]"></div>
         </div>
         <div className="flex items-center gap-3 text-left">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-cheff-green">
                <Clock size={16} />
            </div>
            <div>
                <p className="text-sm text-white font-bold">En attente de confirmation</p>
                <p className="text-xs text-gray-500">Le restaurant va valider...</p>
            </div>
         </div>
       </div>

       <div className="space-y-4 w-full max-w-sm z-10">
         <Button fullWidth onClick={onHome} className="bg-gradient-to-r from-cheff-green to-emerald-600 shadow-cheff-green/30 border-none hover:shadow-cheff-green/50 py-4">
           Suivre ma commande
         </Button>
         <Button fullWidth variant="ghost" onClick={onHome} className="text-gray-400 hover:text-white">
           Retour à l'accueil
         </Button>
       </div>
    </div>
  );
};