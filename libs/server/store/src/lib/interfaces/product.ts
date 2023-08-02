export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  thumbnail: string;
  images: string[];
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
}
