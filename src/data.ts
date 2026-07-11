export interface ClothingItem {
  id: string;
  name: string;
  category: string;
  image: string;
  price: string;
  lensId: string;
  lensGroupId: string;
}

export const CATEGORIES = ['All', 'Coats', 'Tops', 'Eyewear', 'Dresses', 'Skirts', 'Misc'];

const defaultLensGroupId = 'bf5f5394-2619-438c-a66d-88c1586114a2';

export const CLOTHING_ITEMS: ClothingItem[] = [
  {
    id: 'denim-coat',
    name: 'Denim Coat',
    category: 'Coats',
    price: '$89.99',
    image: 'src/assets/items/DenimCoat.png',
    lensId: 'b873a3b8-4d0c-430d-856f-c85d39dfed3d',
    lensGroupId: defaultLensGroupId,
  },
  {
    id: 'leather-coat',
    name: 'LeatherCoat',
    category: 'Coats',
    price: '$129.99',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400&h=400',
    lensId: 'a644038b-7378-4cbd-8ab6-1ec0a989287d',
    lensGroupId: defaultLensGroupId,
  },
  {
    id: 'brown-coat',
    name: 'Brown Coat',
    category: 'Coats',
    price: '$109.99',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=400&h=400',
    lensId: 'e01e4328-c0ec-44ca-92b8-2eb1192033b6',
    lensGroupId: defaultLensGroupId,
  },
  {
    id: 'white-coat',
    name: 'White Coat',
    category: 'Coats',
    price: '$99.99',
    image: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?auto=format&fit=crop&q=80&w=400&h=400',
    lensId: '198f1a29-ed6e-4c14-8d95-5457386281ff',
    lensGroupId: defaultLensGroupId,
  },
  {
    id: 'winter-dress',
    name: 'WinterDress',
    category: 'Dresses',
    price: '$79.99',
    image: 'src/assets/items/winterDress.png',
    lensId: '24a02616-2500-4804-bf9f-371821d3f83f',
    lensGroupId: defaultLensGroupId,
  },
  {
    id: 'try-on-test',
    name: 'Try On - Test',
    category: 'Misc',
    price: '$0.00',
    image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=400&h=400',
    lensId: 'e367feb5-69cd-4bb8-bc2e-9701902de01e',
    lensGroupId: defaultLensGroupId,
  },
  {
    id: 'sweater',
    name: 'Sweater',
    category: 'Tops',
    price: '$49.99',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400&h=400',
    lensId: 'f33a388a-41a5-4f2f-ab40-e6e27f48536b',
    lensGroupId: defaultLensGroupId,
  },
  {
    id: 'sweatshirt',
    name: 'Sweatshirt',
    category: 'Tops',
    price: '$39.99',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400&h=400',
    lensId: '8b2ca834-ee01-42b0-a4ce-e6a27a9ef031',
    lensGroupId: defaultLensGroupId,
  },
  {
    id: 'glasses',
    name: 'Glasses',
    category: 'Eyewear',
    price: '$59.99',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=400&h=400',
    lensId: '5b206f55-7f7b-4d2c-bfcb-9e33c38deb56',
    lensGroupId: defaultLensGroupId,
  },
  {
    id: 'sun-glasses-2',
    name: 'Sun Glasses 2',
    category: 'Eyewear',
    price: '$69.99',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400&h=400',
    lensId: '63c9c606-9f74-4810-862c-13cc0366f3a7',
    lensGroupId: defaultLensGroupId,
  },
  {
    id: 'sun-glasses-1',
    name: 'Sun Glasses 1',
    category: 'Eyewear',
    price: '$79.99',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400&h=400',
    lensId: 'cbb148ce-d6e0-43bf-bd5e-9fdd72f09009',
    lensGroupId: defaultLensGroupId,
  },
  {
    id: 'skirtover',
    name: 'skirtover',
    category: 'Skirts',
    price: '$45.99',
    image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&q=80&w=400&h=400',
    lensId: 'e67586a9-3b02-4d67-be3c-7b3185d29ce0',
    lensGroupId: defaultLensGroupId,
  }
];
