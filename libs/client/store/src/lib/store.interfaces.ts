export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
}

export interface StoreState {
  loading: boolean;
  error: string | null;
  products: Product[];
  product: Product | null;
}
