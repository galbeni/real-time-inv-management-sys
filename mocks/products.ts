export interface Header {
  name: string;
  classes: string;
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  lastUpdated: string;
}

export const tableHeaders: Header[] = [
  {
    name: 'ID',
    classes: 'w-10 font-bold'
  },
  { 
    name: 'Image',
    classes: 'w-20 font-normal' 
  },
  {
    name: 'Name',
    classes: 'font-normal'
  },
  { 
    name: 'Qty.',
    classes: 'w-20 font-normal'
  },
  { 
    name: 'Last Updated',
    classes: 'w-32 font-normal'
  },
  { 
    name: '',
    classes: 'w-32 font-normal'
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    quantity: 8,
    lastUpdated: '2025-02-27T09:23Z'
  },
  {
    id: 2,
    name: 'Mens Casual Premium Slim Fit T-Shirts',
    imageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    quantity: 13,
    lastUpdated: '2025-01-27T09:23Z'
  },
  {
    id: 3,
    name: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
    imageUrl: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
    quantity: 3,
    lastUpdated: '2025-02-27T09:23Z'
  },
  {
    id: 4,
    name: 'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',
    imageUrl: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg',
    quantity: 99,
    lastUpdated: '2025-02-27T09:23Z'
  },
  {
    id: 5,
    name: 'Opna Womens Short Sleeve Moisture',
    imageUrl: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
    quantity: 10,
    lastUpdated: '2025-02-27T09:23Z'
  }
];