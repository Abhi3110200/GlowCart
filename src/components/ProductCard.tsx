import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../types';
import { useWishlistStore } from '../store/wishlistStore';

type RootStackParamList = {
  ProductDetailScreen: { product: Product };
};

import Ionicons from 'react-native-vector-icons/Ionicons';

interface ProductCardProps {
  product: Product;
  onAddToWishlist?: () => void;
  onPress?: () => void;
  index?: number;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2; // 60 = total horizontal padding + gap

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToWishlist, onPress, index = 0 }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  useEffect(() => {
    // Stagger the animation based on index
    const delay = Math.min(index * 50, 500); // Max 500ms delay
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        delay,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('ProductDetailScreen', { product });
    }
  };

  const handleWishlistPress = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
      console.log("Product added to wishlist:", product);
    }
    
    // Call the onAddToWishlist prop if provided (for any additional handling)
    if (onAddToWishlist) {
      onAddToWishlist();
    }
  };

  return (
    <Animated.View
      style={[
        styles.productCard,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        style={styles.touchable}
      >
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productInfo}>
        <Text style={styles.titleText} numberOfLines={1}>
          {product.title}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${product.price.toFixed(2)}</Text>
          <TouchableOpacity 
            onPress={handleWishlistPress}
            activeOpacity={0.8}
            style={styles.wishlistButton}
          >
            <Ionicons 
              name={isWishlisted ? "heart" : "heart-outline"} 
              size={22} 
              color={isWishlisted ? "#B84953" : "#4B4B4B"} 
            />
          </TouchableOpacity>
        </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
    overflow: 'hidden',
  },
  touchable: {
    flex: 1,
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
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-SemiBold',
    color: '#B84953',
  },
  wishlistButton: {
    // padding: 4,
  },
});

export default ProductCard;
