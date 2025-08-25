export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  reviews: any[];
  category: string;
  thumbnail: string;
  images: string[];
}

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { product: Product };
  // Add other screen params as needed
};
