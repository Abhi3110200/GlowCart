import { create } from 'zustand';
import { Product } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

type WishlistState = {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number | string) => void;
  isInWishlist: (productId: number | string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      
      addToWishlist: (product) => {
        set((state) => {
          // Check if product is already in wishlist
          if (state.wishlist.some(item => item.id === product.id)) {
            return state; // Don't add duplicate
          }
          return { wishlist: [...state.wishlist, product] };
        });
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        }));
      },

      isInWishlist: (productId) => {
        return get().wishlist.some(item => item.id === productId);
      },
    }),
    {
      name: 'wishlist-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage for persistence
    }
  )
);
