import { Restaurant } from './types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Kinshasa Burger',
    cuisineType: 'Burger • Américain',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 2000,
    image: 'https://picsum.photos/seed/burger/800/600',
    logo: 'https://picsum.photos/seed/logo1/200/200',
    promo: '-20%',
    isFeatured: true,
    featuredReason: 'Coup de cœur ❤️',
    menu: [
      {
        id: '101',
        name: 'Le Boss Burger',
        description: 'Double steak haché, cheddar fondu, oignons caramélisés, sauce secrète.',
        price: 12000,
        image: 'https://picsum.photos/seed/bigburger/600/600',
        category: 'Burgers',
        popular: true,
      },
      {
        id: '102',
        name: 'Chicken Crunch',
        description: 'Filet de poulet pané croustillant, laitue, mayonnaise épicée.',
        price: 10500,
        image: 'https://picsum.photos/seed/chicken/600/600',
        category: 'Burgers',
      },
      {
        id: '103',
        name: 'Frites Maison',
        description: 'Pommes de terre locales, double cuisson.',
        price: 3000,
        image: 'https://picsum.photos/seed/fries/600/600',
        category: 'Accompagnements',
      }
    ]
  },
  {
    id: '2',
    name: 'Chez Mama Nela',
    cuisineType: 'Congolais • Traditionnel',
    rating: 4.9,
    deliveryTime: '40-50 min',
    deliveryFee: 1500,
    image: 'https://picsum.photos/seed/congofood/800/600',
    logo: 'https://picsum.photos/seed/logo2/200/200',
    menu: [
      {
        id: '201',
        name: 'Poulet à la Moambe',
        description: 'Poulet mijoté dans une sauce onctueuse à la noix de palme, servi avec du riz.',
        price: 15000,
        image: 'https://picsum.photos/seed/moambe/600/600',
        category: 'Plats',
        popular: true,
      },
      {
        id: '202',
        name: 'Pondu & Fufu',
        description: 'Feuilles de manioc, poisson fumé et fufu de maïs.',
        price: 10000,
        image: 'https://picsum.photos/seed/pondu/600/600',
        category: 'Plats',
      },
      {
        id: '203',
        name: 'Mikate',
        description: 'Beignets congolais sucrés (5 pièces).',
        price: 2000,
        image: 'https://picsum.photos/seed/donuts/600/600',
        category: 'Desserts',
      }
    ]
  },
  {
    id: '3',
    name: 'Sushi Zen',
    cuisineType: 'Japonais • Sain',
    rating: 4.5,
    deliveryTime: '30-40 min',
    deliveryFee: 2500,
    image: 'https://picsum.photos/seed/sushi/800/600',
    logo: 'https://picsum.photos/seed/logo3/200/200',
    isFeatured: true,
    featuredReason: 'Livraison Gratuite',
    menu: [
      {
        id: '301',
        name: 'Plateau Mixte',
        description: '12 pièces : 4 Salmon Roll, 4 Tuna Maki, 4 Sushi Saumon.',
        price: 25000,
        image: 'https://picsum.photos/seed/sushis/600/600',
        category: 'Plateaux',
      },
      {
        id: '302',
        name: 'Miso Soup',
        description: 'Soupe traditionnelle au tofu et algues wakame.',
        price: 4000,
        image: 'https://picsum.photos/seed/miso/600/600',
        category: 'Entrées',
      }
    ]
  },
  {
    id: '4',
    name: 'Le Petit Paris',
    cuisineType: 'Boulangerie • Pâtisserie',
    rating: 4.7,
    deliveryTime: '20-30 min',
    deliveryFee: 1000,
    image: 'https://picsum.photos/seed/bakery/800/600',
    logo: 'https://picsum.photos/seed/logo4/200/200',
    isFeatured: true,
    featuredReason: 'Nouveau 🔥',
    menu: [
      {
        id: '401',
        name: 'Croissant au Beurre',
        description: 'Pur beurre AOP, croustillant et fondant.',
        price: 2000,
        image: 'https://picsum.photos/seed/croissant/600/600',
        category: 'Viennoiseries',
      },
      {
        id: '402',
        name: 'Tarte aux Fraises',
        description: 'Crème pâtissière légère et fraises fraîches.',
        price: 5000,
        image: 'https://picsum.photos/seed/tart/600/600',
        category: 'Pâtisseries',
      }
    ]
  },
  {
    id: '5',
    name: 'Pizza Mama',
    cuisineType: 'Italien • Pizza',
    rating: 4.6,
    deliveryTime: '35-45 min',
    deliveryFee: 2000,
    image: 'https://picsum.photos/seed/pizza/800/600',
    logo: 'https://picsum.photos/seed/logo5/200/200',
    promo: '-15%',
    isFeatured: true,
    featuredReason: 'Promo Flash ⚡️',
    menu: [
      {
        id: '501',
        name: 'Margherita',
        description: 'Sauce tomate, mozzarella di bufala, basilic frais.',
        price: 10000,
        image: 'https://picsum.photos/seed/margherita/600/600',
        category: 'Pizzas',
      },
      {
        id: '502',
        name: 'Reine',
        description: 'Sauce tomate, mozzarella, jambon, champignons.',
        price: 12000,
        image: 'https://picsum.photos/seed/regina/600/600',
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