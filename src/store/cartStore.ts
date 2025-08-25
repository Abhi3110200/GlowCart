import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types';

export type CartItem = Product & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string | number) => void;
  updateItem: (id: string | number, quantity: number) => void;
  clearCart: () => void;
};

type PersistedCartState = CartState;

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + item.price,
            };
          }
          
          return {
            items: [...state.items, { ...item, quantity: 1 }],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + item.price,
          };
        });
      },

      removeItem: (id) => {
        set((state) => {
          const itemToRemove = state.items.find((item) => item.id === id);
          if (!itemToRemove) return state;
          
          return {
            items: state.items.filter((item) => item.id !== id),
            totalItems: Math.max(0, state.totalItems - itemToRemove.quantity),
            totalPrice: Math.max(0, state.totalPrice - (itemToRemove.price * itemToRemove.quantity)),
          };
        });
      },

      updateItem: (id, quantity) => {
        set((state) => {
          const itemToUpdate = state.items.find((item) => item.id === id);
          if (!itemToUpdate) return state;
          
          const oldQuantity = itemToUpdate.quantity;
          const quantityDiff = quantity - oldQuantity;
          
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
            totalItems: Math.max(0, state.totalItems + quantityDiff),
            totalPrice: Math.max(0, state.totalPrice + (itemToUpdate.price * quantityDiff)),
          };
        });
      },

      clearCart: () => {
        return {
          items: [],
          totalItems: 0,
          totalPrice: 0,
        };
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  ) as (set: any, get: any, api: any) => CartState
);
