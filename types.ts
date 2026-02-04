export type Category = 'mom_care' | 'pumping' | 'feeding' | 'storage';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description?: string;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}