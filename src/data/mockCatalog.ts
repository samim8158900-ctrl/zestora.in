// Mock catalog data for the e-commerce platform

export const CATEGORIES = [
  { id: 'cat-1', name: 'Electronics', slug: 'electronics', active: true },
  { id: 'cat-2', name: 'Fashion', slug: 'fashion', active: true },
  { id: 'cat-3', name: 'Home & Kitchen', slug: 'home-kitchen', active: true },
  { id: 'cat-4', name: 'Beauty', slug: 'beauty', active: true },
  { id: 'cat-5', name: 'Sports', slug: 'sports', active: true },
];

export const DEMO_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Sample Product',
    slug: 'sample-product',
    description: 'This is a sample product',
    price: 999,
    categoryId: 'cat-1',
    stock: 10,
    images: [],
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    title: 'Welcome to Zestora',
    subtitle: 'Discover More. Shop Smarter.',
    image: '',
  },
];
