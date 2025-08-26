import React, { useEffect, useState, useRef, FC } from 'react';
import { View, Text, StatusBar, TextInput, Dimensions, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Animated } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import CartIcon from '../assets/svg/CartIcon';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useCart } from '../hooks/useCart';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    CartScreen: undefined;
};

const { width, height } = Dimensions.get('window');

const HomeScreen: FC = () => {

    const bottomSheetRef = useRef<any>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const { items } = useCart()

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products')
            const data = await response.json()
            setProducts(data.products);
            setFilteredProducts(data.products);  // The API returns an object with a 'products' array
            setLoading(false)
        } catch (error) {
            console.error('Error fetching products:', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchQuery, products]);

    useEffect(() => {
        fetchProducts();
    }, []);



    console.log(products)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFEDE8' }}>
            <StatusBar barStyle='dark-content' backgroundColor='white' />
            <View style={{
                padding: 20, backgroundColor: 'white',
                borderBottomWidth: 0.4,
                borderColor: '#333333',
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{
                        color: '#B84953',
                        fontFamily: 'Italiana-Regular',
                        fontSize: 30,
                    }}>Viorra</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <View style={{
                            position: 'relative',
                            padding: 5,
                        }}>
                            <MaterialIcons name="notifications-none" size={width * 0.05} color="#4B4B4B" />
                            <View style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    minWidth: 18,
                                    height: 18,
                                    backgroundColor: '#B84953',
                                    borderRadius: 9,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 4,
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 10,
                                        fontFamily: 'Inter_18pt-Medium',
                                    }}>
                                        0
                                    </Text>
                                </View>
                        </View>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('CartScreen')} 
                            activeOpacity={0.8}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                padding: 5,
                            }}
                        >
                            <CartIcon width={width * 0.05} height={width * 0.05} color="#4B4B4B" />
                            {items.length > 0 && (
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    minWidth: 18,
                                    height: 18,
                                    backgroundColor: '#B84953',
                                    borderRadius: 9,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 4,
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 10,
                                        fontFamily: 'Inter_18pt-Medium',
                                    }}>
                                        {items.length > 9 ? '9+' : items.length}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    marginTop: 20,
                    height: 42,
                    borderWidth: 0.6,
                    borderColor: '#8F8F8F',
                    borderRadius: 24,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                }}>
                    <Ionicons name="search" size={width * 0.05} color="#4B4B4B" />

                    <TextInput value={searchQuery} onChangeText={setSearchQuery} placeholder='Search for all products' placeholderTextColor='#4B4B4B' style={{
                        paddingLeft: 10,
                        fontSize: 14,
                        lineHeight: 21,
                        letterSpacing: 0.2,
                        color: '#4B4B4B',
                        fontFamily: 'Inter_18pt-Regular',
                    }} />
                </View>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#B84953" />
                </View>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        marginVertical: 20,
                    }}>
                        <View>
                            <Text style={{
                                fontSize: 24,
                                color: '#000000',
                                fontFamily: 'Inter_18pt-Medium',
                            }}>Best Products</Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#4B4B4B',
                                fontFamily: 'Inter_14pt-Regular',
                            }}>{products.length} products</Text>
                        </View>
                        <TouchableOpacity onPress={() => bottomSheetRef.current.open()} activeOpacity={0.8} style={{
                            backgroundColor: 'white',
                            borderRadius: 8,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderWidth: 0.6,
                            borderColor: '#8F8F8F',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 20,
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#424242',
                                fontFamily: 'Inter_18pt-Medium',
                            }}>Apply Filter</Text>
                            <Ionicons name="chevron-down" size={width * 0.045} color="#4B4B4B" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.productsContainer}>
                        <View style={styles.productsGrid}>
                            {filteredProducts.map((item) => (
                                <ProductCard
                                    key={item.id.toString()}
                                    product={item}
                                    onAddToWishlist={() => {
                                        // Add your wishlist logic here
                                        console.log('Added to wishlist:', item.id);
                                    }}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </ScrollView>
            )}

            <RBSheet
                ref={bottomSheetRef}
                height={height * 0.2}
                openDuration={250}
                closeDuration={200}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                    draggableIcon: {
                        backgroundColor: "#B84953",
                        width: 40,
                    },
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: "white",
                    },
                }}
            >
                <View style={styles.bottomSheetContent}>
                    <Text style={styles.bottomSheetTitle}>Filter Products</Text>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.resetButton}>
                            <Text style={styles.resetButtonText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.applyButton} onPress={() => bottomSheetRef.current.close()}>
                            <Text style={styles.applyButtonText}>Apply Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </RBSheet>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEDE8',
        position: 'relative',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetContent: {
        flex: 1,
        padding: 20,
    },
    bottomSheetTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "#000",
        marginBottom: 30,
        textAlign: "center",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    productsContainer: {
        paddingHorizontal: 20,
    },
    actionButtons: {
        flexDirection: "row",
        gap: 15,
        marginTop: 30,
    },
    resetButton: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 8,
        backgroundColor: "#F5F5F5",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        alignItems: "center",
    },
    resetButtonText: {
        fontSize: 16,
        color: "#666",
        fontWeight: "600",
    },
    applyButton: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 8,
        backgroundColor: "#B84953",
        alignItems: "center",
    },
    applyButtonText: {
        fontSize: 16,
        color: "white",
        fontWeight: "600",
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        paddingBottom: 16,
        elevation: 2,
        shadowColor: '#eee',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 100,
        marginBottom: 16,
    },
    productImage: {
        width: '100%',
        height: 170,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    productInfo: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    titleText: {
        fontSize: 16,
        lineHeight: 21,
        color: 'black',
        fontFamily: 'Inter_18pt-Regular',
        marginBottom: 6,
    },
    priceText: {
        fontSize: 16,
        color: '#4B4B4B',
        fontFamily: 'Inter_18pt-Regular',
    },

    discountText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    brandText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
    },
    ratingText: {
        fontSize: 12,
        marginLeft: 2,
        color: '#666',
    },
});

export default HomeScreen;
