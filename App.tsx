import React, { useState } from 'react';
import { ScreenName, Restaurant, Dish, CartItem } from './types';
import { BottomNav } from './components/UIComponents';
import { 
  OnboardingScreen, 
  HomeScreen, 
  RestaurantDetailScreen, 
  DishDetailScreen, 
  CartScreen, 
  CheckoutScreen,
  SuccessScreen
} from './components/AppScreens';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('ONBOARDING');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Navigation Handlers
  const goBack = () => {
    switch (currentScreen) {
      case 'DISH_DETAIL':
        setCurrentScreen('RESTAURANT');
        break;
      case 'RESTAURANT':
        setCurrentScreen('HOME');
        break;
      case 'CART':
        setCurrentScreen('HOME'); // Or previous screen if we tracked history
        break;
      case 'CHECKOUT':
        setCurrentScreen('CART');
        break;
      default:
        // Do nothing or handle exit
        break;
    }
  };

  // Logic Handlers
  const handleSelectRestaurant = (resto: Restaurant) => {
    setSelectedRestaurant(resto);
    setCurrentScreen('RESTAURANT');
  };

  const handleSelectDish = (dish: Dish) => {
    setSelectedDish(dish);
    setCurrentScreen('DISH_DETAIL');
  };

  const handleAddToCart = (dish: Dish, quantity: number, options: string[]) => {
    if (!selectedRestaurant) return;
    
    const newItem: CartItem = {
      ...dish,
      quantity,
      options,
      restaurantId: selectedRestaurant.id,
      restaurantName: selectedRestaurant.name
    };

    setCart([...cart, newItem]);
    // setCurrentScreen('RESTAURANT'); // Removed to keep user on same screen if quick add
    if (currentScreen === 'DISH_DETAIL') {
        setCurrentScreen('RESTAURANT');
    }
  };

  const handleRemoveFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleCheckout = () => {
    setCurrentScreen('CHECKOUT');
  };

  const handlePaymentSuccess = () => {
    setCart([]);
    setCurrentScreen('SUCCESS');
  };

  // Render logic
  const renderScreen = () => {
    switch (currentScreen) {
      case 'ONBOARDING':
        return <OnboardingScreen onStart={() => setCurrentScreen('HOME')} />;
      
      case 'HOME':
      case 'SEARCH':     // Placeholder logic
      case 'FAVORITES':  // Placeholder logic
      case 'PROFILE':    // Placeholder logic
      case 'ORDERS':     // Placeholder logic
        // For prototype, Search/Fav/Profile just render Home or a placeholder.
        // We will render Home for now to keep it simple as per request scope.
        return <HomeScreen onSelectRestaurant={handleSelectRestaurant} />;
      
      case 'RESTAURANT':
        return selectedRestaurant ? (
          <RestaurantDetailScreen 
            restaurant={selectedRestaurant} 
            onBack={goBack} 
            onSelectDish={handleSelectDish}
            onAddToCart={handleAddToCart}
          />
        ) : null;
      
      case 'DISH_DETAIL':
        return selectedDish && selectedRestaurant ? (
          <DishDetailScreen 
            dish={selectedDish} 
            restaurantName={selectedRestaurant.name}
            onBack={goBack} 
            onAddToCart={handleAddToCart}
          />
        ) : null;

      case 'CART':
        return (
          <CartScreen 
            cart={cart} 
            onBack={() => setCurrentScreen('HOME')} 
            onRemove={handleRemoveFromCart}
            onCheckout={handleCheckout}
          />
        );

      case 'CHECKOUT':
        const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) + 2000;
        return (
          <CheckoutScreen 
            total={cartTotal} 
            onBack={goBack} 
            onConfirm={handlePaymentSuccess}
          />
        );

      case 'SUCCESS':
        return <SuccessScreen onHome={() => setCurrentScreen('HOME')} />;
        
      default:
        return <HomeScreen onSelectRestaurant={handleSelectRestaurant} />;
    }
  };

  // Navigation Visibility
  const showBottomNav = ['HOME', 'SEARCH', 'FAVORITES', 'PROFILE', 'ORDERS'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-cheff-brown text-cheff-cream font-sans selection:bg-cheff-orange selection:text-white">
      {renderScreen()}
      
      {showBottomNav && (
        <BottomNav 
          currentScreen={currentScreen} 
          onNavigate={setCurrentScreen} 
          cartCount={cart.length}
        />
      )}
    </div>
  );
};

export default App;