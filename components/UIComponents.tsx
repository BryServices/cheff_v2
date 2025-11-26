import React from 'react';
import { Home, Search, ShoppingBag, User, Plus, Minus, ChevronLeft, FileText, UtensilsCrossed } from 'lucide-react';
import { ScreenName } from '../types';

// --- Buttons ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  isLoading?: boolean; // Added loading state
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  isLoading = false,
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-4 px-6 rounded-2xl font-semibold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cheff-orange focus:ring-offset-[#3E2723]";
  
  const variants = {
    primary: "bg-gradient-to-r from-cheff-orange to-[#FF9E80] text-white shadow-[0_8px_20px_-6px_rgba(255,109,0,0.5)] hover:shadow-cheff-orange/40 border border-white/10",
    secondary: "bg-cheff-lightBrown/20 text-cheff-cream hover:bg-cheff-lightBrown/30 border border-white/5 backdrop-blur-md",
    outline: "border-2 border-cheff-orange/50 text-cheff-orange hover:bg-cheff-orange/10",
    ghost: "bg-transparent text-cheff-orange hover:bg-white/5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" role="status" aria-label="Chargement..." />
      ) : children}
    </button>
  );
};

// --- Navigation ---

interface BottomNavProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, cartCount }) => {
  const navItems = [
    { id: 'HOME', icon: Home, label: 'Accueil' },
    { id: 'DISHES', icon: UtensilsCrossed, label: 'Plats' },
    { id: 'CART', icon: ShoppingBag, label: 'Panier', badge: cartCount },
    { id: 'ORDERS', icon: FileText, label: 'Commandes' },
    { id: 'PROFILE', icon: User, label: 'Profil' },
  ];

  return (
    // Z-index set to 50 to ensure visibility
    <nav className="fixed bottom-6 left-4 right-4 z-50 pointer-events-none" role="navigation" aria-label="Navigation principale">
      <div className="pointer-events-auto bg-[#2c1a16]/95 backdrop-blur-xl border border-white/10 rounded-[2rem] p-2 shadow-2xl shadow-black/50 flex justify-between items-center px-4">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id || (item.id === 'HOME' && ['RESTAURANT', 'DISH_DETAIL'].includes(currentScreen));
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ScreenName)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center h-12 w-12 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cheff-orange ${isActive ? 'bg-cheff-orange text-white shadow-lg shadow-cheff-orange/30 translate-y-[-8px]' : 'text-gray-400 hover:text-white'}`}
            >
              <div className="relative">
                <Icon size={isActive ? 20 : 22} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge ? (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-[#2c1a16]">
                    {item.badge}
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

// --- Headers ---

export const Header: React.FC<{ 
  title?: string; 
  onBack?: () => void; 
  rightAction?: React.ReactNode;
  transparent?: boolean; 
}> = ({ title, onBack, rightAction, transparent = false }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 px-4 py-4 pt-safe flex items-center justify-between transition-all duration-300 ${transparent ? 'bg-transparent' : 'bg-[#3E2723]/80 backdrop-blur-md border-b border-white/5'}`}>
      {onBack ? (
        <button 
          onClick={onBack}
          aria-label="Retour"
          className={`p-2.5 rounded-full transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-cheff-orange ${transparent ? 'bg-black/30 text-white backdrop-blur-md border border-white/10' : 'bg-white/5 text-cheff-cream hover:bg-white/10'}`}
        >
          <ChevronLeft size={22} />
        </button>
      ) : <div className="w-10" />}
      
      {title && (
        <h1 className={`font-bold text-lg tracking-wide truncate px-2 ${transparent ? 'hidden' : 'text-cheff-cream'}`}>
          {title}
        </h1>
      )}

      <div className="w-10 flex justify-end">
        {rightAction}
      </div>
    </header>
  );
};

// --- Inputs ---

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput: React.FC<SearchInputProps> = (props) => (
  <div className="relative w-full group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Search className="h-5 w-5 text-gray-400 group-focus-within:text-cheff-orange transition-colors" />
    </div>
    <input
      type="text"
      aria-label="Rechercher"
      className="block w-full pl-11 pr-4 py-4 border border-white/5 rounded-2xl leading-5 bg-white/5 text-cheff-cream placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cheff-orange focus:bg-white/10 focus:border-cheff-orange/50 sm:text-sm shadow-inner transition-all"
      placeholder="Rechercher un plat ou un resto..."
      {...props}
    />
  </div>
);

// --- Quantity Control ---

export const QuantityControl: React.FC<{ value: number, onChange: (val: number) => void }> = ({ value, onChange }) => (
  <div className="flex items-center gap-6 bg-[#2c1a16] p-2 pr-2.5 rounded-2xl border border-white/10 shadow-inner">
    <button 
      onClick={() => value > 1 && onChange(value - 1)}
      aria-label="Diminuer la quantité"
      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors active:scale-90 focus:outline-none focus:ring-2 focus:ring-cheff-orange"
    >
      <Minus size={18} />
    </button>
    <span className="text-xl font-bold w-6 text-center text-cheff-cream" aria-live="polite">{value}</span>
    <button 
      onClick={() => onChange(value + 1)}
      aria-label="Augmenter la quantité"
      className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-cheff-orange to-[#FF9E80] text-white shadow-lg shadow-cheff-orange/20 active:scale-90 transition-transform focus:outline-none focus:ring-2 focus:ring-white"
    >
      <Plus size={18} />
    </button>
  </div>
);

// --- Skeleton Loader ---

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-white/10 ${className}`} />
);