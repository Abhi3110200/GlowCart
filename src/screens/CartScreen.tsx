import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Dimensions,
  Alert,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCart } from '../hooks/useCart';
import type { CartItem } from '../store/cartStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
};

const { width } = Dimensions.get('window');

const CartScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { items, totalItems, totalPrice, addItem, removeItem, updateItem, clearCart } = useCart();
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartTotal(totalPrice);
  }, [items]);

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItem(item.id, newQuantity);
  };

  const handleRemoveItem = (item: CartItem) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove ${item.title} from your cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => removeItem(item.id), style: 'destructive' }
      ]
    );
  };

  const handleCheckout = () => {
    if (totalItems === 0) {
      Alert.alert('Your cart is empty', 'Add some products to your cart before checkout');
      return;
    }
    navigation.navigate('Home');
  };

  const renderCartItem = (item: CartItem) => (
    <View key={item.id} style={styles.cartItem}>
      <View style={styles.itemImageContainer}>
        <Image 
          source={{ uri: item.thumbnail }} 
          style={styles.itemImage} 
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.itemBrand}>{item.brand}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item, (item.quantity || 1) - 1)}
          >
            <Ionicons name="remove" size={16} color="#4B4B4B" />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity || 1}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item, (item.quantity || 1) + 1)}
          >
            <Ionicons name="add" size={16} color="#4B4B4B" />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item)}
      >
        <Ionicons name="trash-outline" size={20} color="#B84953" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#B84953' />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={styles.headerRight} />
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#CCCCCC" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubText}>Looks like you haven't added any items yet</Text>
          <TouchableOpacity 
            style={styles.continueShoppingButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.continueShoppingText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView 
            style={styles.cartItemsContainer}
            showsVerticalScrollIndicator={false}
          >
            {items.map(renderCartItem)}
          </ScrollView>

          {/* Order Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryAmount}>${totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Shipping</Text>
              <Text style={styles.summaryAmount}>
                {totalPrice > 50 ? 'Free' : '$5.00'}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>
                ${(totalPrice + (totalPrice > 50 ? 0 : 5)).toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              <MaterialIcons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEDE8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#B84953',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Inter_18pt-Medium',
  },
  headerRight: {
    width: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    fontFamily: 'Inter_18pt-Medium',
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Inter_14pt-Regular',
  },
  continueShoppingButton: {
    backgroundColor: '#B84953',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  continueShoppingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_18pt-Medium',
  },
  cartItemsContainer: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'Inter_18pt-Medium',
  },
  itemBrand: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    fontFamily: 'Inter_14pt-Regular',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B84953',
    marginTop: 4,
    fontFamily: 'Inter_18pt-SemiBold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    padding: 6,
  },
  quantityText: {
    width: 30,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter_14pt-Regular',
  },
  removeButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  summaryContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter_14pt-Regular',
  },
  summaryAmount: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter_14pt-SemiBold',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Inter_18pt-SemiBold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#B84953',
    fontFamily: 'Inter_18pt-Bold',
  },
  checkoutButton: {
    backgroundColor: '#B84953',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    fontFamily: 'Inter_18pt-SemiBold',
  },
});

export default CartScreen;
