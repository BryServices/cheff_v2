
import { Restaurant, Notification, Order } from './types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Brazza Burger',
    cuisineType: 'Burger • Américain',
    description: 'Le goût de l\'Amérique au cœur de Poto-Poto. Nos steaks sont hachés minute et nos pains boulangers sont toastés à la perfection.',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 1000,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&q=80',
    promo: '-20%',
    isFeatured: true,
    featuredReason: 'Coup de cœur ❤️',
    menu: [
      {
        id: '101',
        name: 'Le Boss Burger',
        description: 'Double steak haché, cheddar fondu, oignons caramélisés, sauce secrète.',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
        category: 'Burgers',
        popular: true,
      },
      {
        id: '102',
        name: 'Chicken Crunch',
        description: 'Filet de poulet pané croustillant, laitue, mayonnaise épicée.',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1615297928064-24977384d0f9?w=600&q=80',
        category: 'Burgers',
      },
      {
        id: '103',
        name: 'Frites Maison',
        description: 'Pommes de terre locales, double cuisson.',
        price: 1000,
        image: 'https://images.unsplash.com/photo-1630384060421-a4323ceca041?w=600&q=80',
        category: 'Accompagnements',
      }
    ]
  },
  {
    id: '2',
    name: 'Chez Maman Pauline',
    cuisineType: 'Congolais • Traditionnel',
    description: 'La référence du goût à Bacongo. Maman Pauline prépare les classiques du pays : Saka-saka, poissons braisés et viandes de brousse.',
    rating: 4.9,
    deliveryTime: '40-50 min',
    deliveryFee: 1000,
    image: 'https://images.unsplash.com/photo-1543362906-ac1b452601d8?w=800&q=80',
    logo: 'https://ui-avatars.com/api/?name=MP&background=5D4037&color=fff',
    menu: [
      {
        id: '201',
        name: 'Poulet à la Moambe',
        description: 'Poulet mijoté dans une sauce onctueuse à la noix de palme, servi avec du riz.',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80',
        category: 'Plats',
        popular: true,
      },
      {
        id: '202',
        name: 'Saka-Saka & Poisson',
        description: 'Feuilles de manioc, poisson fumé et fufu ou manioc.',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80',
        category: 'Plats',
      },
      {
        id: '203',
        name: 'Mikate',
        description: 'Beignets chauds (5 pièces).',
        price: 500,
        image: 'https://images.unsplash.com/photo-1621251347683-fc0577a76c8c?w=600&q=80',
        category: 'Desserts',
      }
    ]
  },
  {
    id: '3',
    name: 'Sushi Maya',
    cuisineType: 'Japonais • Sain',
    description: 'Le meilleur sushi du Plateau. Fraîcheur garantie et cadre élégant, livrés directement chez vous.',
    rating: 4.5,
    deliveryTime: '30-40 min',
    deliveryFee: 1500,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=200&q=80',
    isFeatured: true,
    featuredReason: 'Livraison Gratuite',
    menu: [
      {
        id: '301',
        name: 'Plateau Mixte',
        description: '12 pièces : 4 Salmon Roll, 4 Tuna Maki, 4 Sushi Saumon.',
        price: 8000,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80',
        category: 'Plateaux',
      },
      {
        id: '302',
        name: 'Miso Soup',
        description: 'Soupe traditionnelle au tofu et algues wakame.',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1547592166-23acbe3a624b?w=600&q=80',
        category: 'Entrées',
      }
    ]
  },
  {
    id: '4',
    name: 'La Mie Dorée',
    cuisineType: 'Boulangerie • Pâtisserie',
    description: 'Viennoiseries fines et pâtisseries gourmandes situées sur l\'avenue de la Paix.',
    rating: 4.7,
    deliveryTime: '20-30 min',
    deliveryFee: 500,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    logo: 'https://ui-avatars.com/api/?name=MD&background=FF8A65&color=fff',
    isFeatured: true,
    featuredReason: 'Nouveau 🔥',
    menu: [
      {
        id: '401',
        name: 'Croissant au Beurre',
        description: 'Pur beurre, croustillant et fondant.',
        price: 500,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80',
        category: 'Viennoiseries',
      },
      {
        id: '402',
        name: 'Tarte aux Fraises',
        description: 'Crème pâtissière légère et fraises fraîches.',
        price: 2000,
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
        category: 'Pâtisseries',
      }
    ]
  },
  {
    id: '5',
    name: 'Pizza Roma',
    cuisineType: 'Italien • Pizza',
    description: 'Pizzas au feu de bois comme en Italie, en plein cœur de Moungali.',
    rating: 4.6,
    deliveryTime: '35-45 min',
    deliveryFee: 1000,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80',
    logo: 'https://ui-avatars.com/api/?name=PR&background=D84315&color=fff',
    promo: '-15%',
    isFeatured: true,
    featuredReason: 'Promo Flash ⚡️',
    menu: [
      {
        id: '501',
        name: 'Margherita',
        description: 'Sauce tomate, mozzarella, basilic frais.',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
        category: 'Pizzas',
      },
      {
        id: '502',
        name: 'Reine',
        description: 'Sauce tomate, mozzarella, jambon, champignons.',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80',
        category: 'Pizzas',
      }
    ]
  }
];

export const CATEGORIES = [
  { name: 'Tout', icon: '🍽️' },
  { name: 'Burger', icon: '🍔' },
  { name: 'Pizza', icon: '🍕' },
  { name: 'Africain', icon: '🍲' },
  { name: 'Sushi', icon: '🍣' },
  { name: 'Dessert', icon: '🍰' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Commande livrée 🎉',
    message: 'Votre commande chez Brazza Burger a été livrée avec succès. Bon appétit !',
    time: 'Il y a 2h',
    read: false,
    type: 'ORDER'
  },
  {
    id: '2',
    title: 'Promo Flash -20%',
    message: 'Profitez de -20% sur tous les sushis ce soir chez Sushi Maya ! 🍣',
    time: 'Il y a 5h',
    read: false,
    type: 'PROMO'
  },
  {
    id: '3',
    title: 'Bienvenue sur Cheffcongo',
    message: 'Merci d\'avoir rejoint la communauté gourmande de Brazzaville. Votre premier repas vous attend.',
    time: 'Hier',
    read: true,
    type: 'SYSTEM'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-8823',
    restaurantId: '1',
    restaurantName: 'Brazza Burger',
    items: [
      { id: '101', name: 'Le Boss Burger', price: 3500, quantity: 2, description: '', image: '', category: '', restaurantId: '1', restaurantName: 'Brazza Burger' }
    ],
    total: 8000,
    status: 'COMPLETED',
    date: new Date(Date.now() - 86400000).toISOString(),
    deliveryAddress: 'Brazzaville, Poto-Poto'
  },
  {
    id: 'ORD-7712',
    restaurantId: '2',
    restaurantName: 'Chez Maman Pauline',
    items: [
      { id: '201', name: 'Poulet à la Moambe', price: 4500, quantity: 1, description: '', image: '', category: '', restaurantId: '2', restaurantName: 'Chez Maman Pauline' }
    ],
    total: 5500,
    status: 'COMPLETED',
    date: new Date(Date.now() - 172800000).toISOString(),
    deliveryAddress: 'Brazzaville, Bacongo'
  }
];
