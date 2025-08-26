import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

export const useAuth = () => {
  const { 
    user, 
    token, 
    isAuthenticated, 
    loading, 
    error, 
    login, 
    register, 
    logout,
    setLoading,
    setError,
    initializeAuth,
  } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    setLoading,
    setError,
    initializeAuth,
  };
};

export const useCart = () => {
  return useCartStore((state) => ({
    // State
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    
    // Actions
    addItem: state.addItem,
    removeItem: state.removeItem,
    updateItem: state.updateItem,
    clearCart: state.clearCart,
  }));
};
