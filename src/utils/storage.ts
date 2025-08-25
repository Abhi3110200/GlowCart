import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_STORAGE_KEY = '@cart_items';

export const storeCart = async (items: any[]) => {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error storing cart:', error);
  }
};

export const getCart = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CART_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

export const clearCart = async () => {
  try {
    await AsyncStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};
