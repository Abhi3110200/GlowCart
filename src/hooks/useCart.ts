import { useCartStore } from '../store/cartStore';

export const useCart = () => {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    addItem, 
    removeItem, 
    updateItem, 
    clearCart 
  } = useCartStore();

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateItem,
    clearCart
  };
};
