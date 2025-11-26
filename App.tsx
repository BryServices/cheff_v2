
import React, { useState } from 'react';
import { ScreenName, Restaurant, Dish, CartItem, Notification, Order, UserProfile } from './types';
import { BottomNav } from './components/UIComponents';
import { MOCK_NOTIFICATIONS, MOCK_ORDERS, RESTAURANTS } from './data';
import { 
  OnboardingScreen, 
  HomeScreen, 
  RestaurantDetailScreen, 
  DishDetailScreen, 
  CartScreen, 
  CheckoutScreen,
  SuccessScreen,
  ProfileScreen,
  NotificationScreen,
  AllDishesScreen,
  OrdersScreen,
  FavoritesScreen
} from './components/AppScreens';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('ONBOARDING');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['101', '201']); // Default some favorite dishes
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  
  // Auth State & User Data with Preferences
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    name: 'Utilisateur',
    phone: '',
    email: '',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80',
    preferences: [], // Goûts culinaires
    loyaltyPoints: 120 // Points de fidélité par défaut
  });

  // Computed
  const unreadNotifications = notifications.filter(n => !n.read).length;

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
      case 'NOTIFICATIONS':
        setCurrentScreen('HOME');
        break;
      case 'FAVORITES':
        setCurrentScreen('PROFILE');
        break;
      case 'ORDERS':
        setCurrentScreen('PROFILE');
        break;
      case 'DISHES':
        setCurrentScreen('HOME');
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

  // Helper pour charger le contexte du restaurant (important pour la navigation retour)
  const handleSelectDishWithContext = (dish: Dish) => {
    const d = dish as any;
    if (d.restaurantId) {
      const fullResto = RESTAURANTS.find(r => r.id === d.restaurantId);
      if (fullResto) {
        setSelectedRestaurant(fullResto);
      } else {
        // Fallback si on ne trouve pas (ex: données mocks incohérentes)
        setSelectedRestaurant({ id: d.restaurantId, name: d.restaurantName || 'Restaurant' } as any);
      }
    }
    handleSelectDish(dish);
  };

  const handleAddToCart = (dish: Dish, quantity: number, options: string[]) => {
    // If adding directly from AllDishesScreen, we need to find the restaurant
    let targetResto = selectedRestaurant;
    
    // Fallback logic to find restaurant if not set
    if (!targetResto) {
       // @ts-ignore - checking custom prop if passed, or searching
       if (dish.restaurantId) {
          // @ts-ignore
           targetResto = { id: dish.restaurantId, name: dish.restaurantName } as Restaurant;
       }
    }

    if (!targetResto && (dish as any).restaurantId) {
       targetResto = { id: (dish as any).restaurantId, name: (dish as any).restaurantName } as any;
    }

    if (!targetResto) return; // Should not happen

    
    // Check if item already exists with same options
    const existingItemIndex = cart.findIndex(item => 
      item.id === dish.id && 
      item.restaurantId === targetResto!.id &&
      JSON.stringify(item.options?.sort()) === JSON.stringify(options.sort())
    );

    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += quantity;
      setCart(newCart);
    } else {
      const newItem: CartItem = {
        ...dish,
        quantity,
        options,
        restaurantId: targetResto!.id,
        restaurantName: targetResto!.name
      };
      setCart([...cart, newItem]);
    }

    if (currentScreen === 'DISH_DETAIL') {
        setCurrentScreen('RESTAURANT');
    }
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty < 1) return;
    const newCart = [...cart];
    newCart[index].quantity = newQty;
    setCart(newCart);
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
    // Create a new Order from Cart
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const uniqueRestaurants = new Set(cart.map(item => item.restaurantId));
    const totalDeliveryFee = uniqueRestaurants.size * 1000; // 1000 FCFA Delivery Fee
    
    const mainRestoId = cart[0]?.restaurantId || '0';
    const mainRestoName = cart[0]?.restaurantName || 'Commande Groupée';

    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      restaurantId: mainRestoId,
      restaurantName: mainRestoName,
      items: [...cart],
      total: subtotal + totalDeliveryFee,
      status: 'PREPARING', // Start as preparing
      date: new Date().toISOString(),
      deliveryAddress: 'Brazzaville, Poto-Poto'
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    // Add loyalty points
    setUser(prev => ({ ...prev, loyaltyPoints: (prev.loyaltyPoints || 0) + 50 }));
    setCurrentScreen('SUCCESS');
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({
      name: 'Utilisateur',
      phone: '',
      email: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80',
      preferences: [],
      loyaltyPoints: 0
    });
    setCurrentScreen('HOME');
  };
  
  // Mise à jour de la fonction login pour accepter des données
  const handleLogin = (userData?: Partial<UserProfile>) => {
    if (userData) {
      setUser(prev => ({ ...prev, ...userData }));
    }
    setIsLoggedIn(true);
  };

  // Mise à jour du profil depuis l'écran profil
  const handleUpdateUser = (updatedData: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const handleSavePreferences = (prefs: string[]) => {
    setUser(prev => ({ ...prev, preferences: prefs }));
    setCurrentScreen('HOME');
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleOpenNotifications = () => {
    setCurrentScreen('NOTIFICATIONS');
  };

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  // Render logic
  const renderScreen = () => {
    switch (currentScreen) {
      case 'ONBOARDING':
        return <OnboardingScreen onFinish={handleSavePreferences} />;
      
      case 'HOME':
      case 'SEARCH':
        return <HomeScreen 
          onSelectRestaurant={handleSelectRestaurant}
          onSelectDish={handleSelectDishWithContext}
          onNotifications={handleOpenNotifications}
          notificationCount={unreadNotifications}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
          userPreferences={user.preferences || []}
        />;
      
      case 'DISHES':
        return (
          <AllDishesScreen 
            onSelectDish={handleSelectDishWithContext}
            onAddToCart={(dish: Dish) => handleAddToCart(dish, 1, [])}
            userPreferences={user.preferences || []}
          />
        );
      
      case 'ORDERS':
        return <OrdersScreen orders={orders} />;

      case 'PROFILE':
        return (
          <ProfileScreen 
            onNavigate={setCurrentScreen} 
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
            onLogin={handleLogin}
            user={user}
            onUpdateUser={handleUpdateUser}
          />
        );

      case 'NOTIFICATIONS':
        return (
          <NotificationScreen 
            notifications={notifications} 
            onMarkRead={handleMarkNotificationRead}
            onBack={goBack}
          />
        );
      
      case 'FAVORITES':
        return (
          <FavoritesScreen 
            favoriteIds={favoriteIds}
            onSelectRestaurant={handleSelectRestaurant}
            onSelectDish={handleSelectDishWithContext}
            onToggleFavorite={handleToggleFavorite}
            onBack={goBack}
          />
        );
      
      case 'RESTAURANT':
        return selectedRestaurant ? (
          <RestaurantDetailScreen 
            restaurant={selectedRestaurant} 
            onBack={goBack} 
            onSelectDish={handleSelectDish}
            onAddToCart={handleAddToCart}
            isFavorite={favoriteIds.includes(selectedRestaurant.id)}
            onToggleFavorite={() => handleToggleFavorite(selectedRestaurant.id)}
          />
        ) : null;
      
      case 'DISH_DETAIL':
        return selectedDish && selectedRestaurant ? (
          <DishDetailScreen 
            dish={selectedDish} 
            restaurantName={selectedRestaurant.name}
            onBack={goBack} 
            onAddToCart={handleAddToCart}
            isFavorite={favoriteIds.includes(selectedDish.id)}
            onToggleFavorite={() => handleToggleFavorite(selectedDish.id)}
          />
        ) : null;

      case 'CART':
        return (
          <CartScreen 
            cart={cart} 
            onBack={() => setCurrentScreen('HOME')} 
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemove={handleRemoveFromCart}
            onCheckout={handleCheckout}
          />
        );

      case 'CHECKOUT':
        const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const uniqueRestaurants = new Set(cart.map(item => item.restaurantId)).size;
        const totalDeliveryFee = uniqueRestaurants * 1000;
        const cartTotal = subtotal + totalDeliveryFee;

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
        return <HomeScreen 
          onSelectRestaurant={handleSelectRestaurant}
          onSelectDish={handleSelectDishWithContext}
          onNotifications={handleOpenNotifications}
          notificationCount={unreadNotifications}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
          userPreferences={user.preferences || []}
        />;
    }
  };

  const showBottomNav = !['ONBOARDING', 'CHECKOUT', 'SUCCESS'].includes(currentScreen);

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
