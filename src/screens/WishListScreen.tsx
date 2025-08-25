import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useWishlistStore } from '../store/wishlistStore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';
type RootStackParamList = {
  Home: undefined;
  // Add other screen params as needed
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2; // Same as in ProductCard

const WishListScreen = () => {
  const { wishlist, removeFromWishlist } = useWishlistStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderEmptyWishlist = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={60} color="#B84953" />
      <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
      <Text style={styles.emptyText}>Save your favorite items here</Text>
      <TouchableOpacity 
        style={styles.continueShoppingButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.continueShoppingText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  const renderWishlistItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromWishlist(item.id)}
      >
        <Ionicons name="close" size={20} color="#4B4B4B" />
      </TouchableOpacity>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productInfo}>
        <Text style={styles.titleText} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity 
          style={styles.moveToCartButton}
          onPress={() => {
            // TODO: Add to cart functionality
          }}
        >
          <Text style={styles.moveToCartText}>Move to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFEDE8" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <Text style={styles.itemCount}>
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
        </Text>
      </View>

      {wishlist.length === 0 ? (
        renderEmptyWishlist()
      ) : (
        <FlatList
          data={wishlist}
          renderItem={renderWishlistItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_18pt-Bold',
    color: '#070707',
  },
  itemCount: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
    marginTop: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter_18pt-SemiBold',
    color: '#1A1A1A',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  continueShoppingButton: {
    backgroundColor: '#B84953',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  continueShoppingText: {
    color: 'white',
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 14,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#070707',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 12,
  },
  productInfo: {
    paddingHorizontal: 4,
  },
  titleText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Medium',
    color: '#333',
    marginBottom: 8,
    minHeight: 20,
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-SemiBold',
    color: '#B84953',
    marginBottom: 12,
  },
  moveToCartButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  moveToCartText: {
    color: '#333',
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 12,
  },
});

export default WishListScreen;
