import { View, Text, StatusBar, Dimensions, ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { useRoute, RouteProp } from "@react-navigation/native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import BagIcon from "../assets/svg/BagIcon"
import ShareIcon from "../assets/svg/ShareIcon"
import { FC } from "react"
import { useCart } from "../hooks/useCart"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
const { width } = Dimensions.get('window')

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    originalPrice: number;
    rating: number;
    stock: number;
    brand: string;
    reviews: any[];
    category: string;
    thumbnail: string;
    images: string[];
}

type ProductDetailScreenParams = {
    product: Product;
};

type RootStackParamList = {
    CartScreen: undefined;
};

const ProductDetailScreen: FC = () => {
    const route = useRoute<RouteProp<{ params: ProductDetailScreenParams }>>()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { product } = route.params
    console.log(product)

    const { addItem, items } = useCart()

    const renderStars = (rating: number, size: number) => {
        const stars = []
        const fullStars = Math.floor(rating) // full stars
        const halfStar = rating % 1 >= 0.5 // check if half star needed
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

        // full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(<Ionicons key={`full-${i}`} name="star" size={size} color="#000" />)
        }
        // half star
        if (halfStar) {
            stars.push(<Ionicons key="half" name="star-half" size={size} color="#000" />)
        }
        // empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={size} color="#000" />)
        }

        return stars
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase()
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFEDE8' }} contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 40,
        }} scrollEnabled={true} showsVerticalScrollIndicator={false}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFEDE8" />
            <ImageBackground source={{ uri: product.thumbnail }} style={{ width: '100%', height: 425, borderRadius: 16, backgroundColor: 'white' }} resizeMode="contain" >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10, backgroundColor: '#FFEDE8', borderRadius: 12 }} >
                        <Ionicons name="arrow-back" size={width * 0.06} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CartScreen')}
                        style={styles.cartButton}
                    >
                        <BagIcon width={width * 0.06} height={width * 0.06} color="black" />
                        {items.length > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {items.length > 9 ? '9+' : items.length}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 18 }}>
                <Text style={{ fontSize: 12, color: '#B84953', fontFamily: 'Inter_18pt-Medium', borderColor: '#B84953', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 99 }}>View Similar</Text>
                <ShareIcon width={width * 0.06} height={width * 0.06} />
            </View>
            <Text style={{ fontSize: 20, color: '#070707', fontFamily: 'Inter_18pt-SemiBold' }} numberOfLines={1}>{product.title}</Text>
            <Text style={{ fontSize: 14, color: '#333333', fontFamily: 'Inter_18pt-Regular', lineHeight: 21, letterSpacing: 0.2, marginVertical: 8 }}>{product.description}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                {renderStars(product.rating, 19)}
                <Text style={{ fontSize: 18, color: '#070707', fontFamily: 'Inter_18pt-Medium', marginLeft: 10 }}>{product.rating}</Text>
            </View>
            <View style={{
                borderTopWidth: 0.4,
                marginTop: 18,
                borderColor: '#333333',
            }} />

            {product.brand && (
                <View style={{
                    marginVertical: 10,
                }}>
                    <Text style={{ fontSize: 16, color: '#070707', fontFamily: 'Inter_18pt-Regular' }}>Sold by : <Text style={{ fontFamily: 'Inter_18pt-Medium', color: '#333333' }}>{product.brand}</Text></Text>
                </View>
            )}

            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10
            }}>

                {/* Price Section */}
                <View>
                    <Text style={{ fontSize: 32, fontFamily: 'Inter_18pt-Bold', color: "#070707" }}>
                        ${product.price}
                    </Text>
                    {product.originalPrice && <Text style={{
                        fontSize: 24,
                        color: "#767676",
                        textDecorationLine: "line-through",
                        marginTop: 2
                    }}>
                        ${product.originalPrice}
                    </Text>}
                </View>

                {/* Add to Bag Button */}
                <TouchableOpacity
                    style={{
                        backgroundColor: "#B84953",
                        paddingVertical: 10,
                        paddingHorizontal: 50,
                        borderRadius: 12
                    }}
                    activeOpacity={0.8}
                    onPress={() => addItem(product)}
                >
                    <Text style={{ color: "white", fontSize: 24, fontFamily: 'Inter_18pt-Medium' }}>
                        Add to Bag
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={styles.heading}>Highlights</Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.label}>Width</Text>
                            <Text style={styles.value}>15.14</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.label}>Height</Text>
                            <Text style={styles.value}>13.08</Text>
                        </View>
                    </View>

                    <View style={styles.row1}>
                        <View style={styles.col}>
                            <Text style={styles.label}>Warranty</Text>
                            <Text style={styles.value}>1 week</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.label}>Shipping</Text>
                            <Text style={styles.value}>In 3-5 business days</Text>
                        </View>
                    </View>
                </View>
            </View>


            {/* Review Card 2 */}
            <View style={{ marginTop: 30 }}>
                <Text style={styles.heading}>Ratings & Reviews</Text>

                {product.reviews.map((review: any, index: any) => (
                    <View key={index} style={styles.reviewCard}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{getInitials(review.reviewerName)}</Text>
                            </View>
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={styles.reviewerName}>{review.reviewerName}</Text>
                                <Text style={styles.reviewerEmail}>{review.reviewerEmail}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                {renderStars(review.rating, 14)}
                            </View>
                        </View>
                        <Text style={styles.reviewText}>{review.comment}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    cartButton: {
        padding: 10,
        backgroundColor: '#FFEDE8',
        borderRadius: 12,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
    },
    badge: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: '#B84953',
        borderRadius: 9,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Inter_18pt-Medium',
        lineHeight: 16,
    },
    container: {
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontFamily: 'Inter_18pt-SemiBold',
        marginBottom: 20,
        color: '#070707',
    },
    reviewCard: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    row1: {
        borderLeftWidth: 0.4,
        borderColor: "#333333",
        paddingLeft: 30,
    },
    row: {
        // marginTop: 10,
        // marginBottom: 10,
        // gap: 20,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#B84953",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: {
        color: "white",
        fontSize: 14,
        fontFamily: "Inter_18pt-Medium",
    },
    reviewerName: {
        fontSize: 14,
        fontFamily: "Inter_18pt-Medium",
        color: "#070707",
    },
    reviewerEmail: {
        fontSize: 10,
        fontFamily: "Inter_18pt-Regular",
        color: "#333333",
    },
    col: {
        flex: 1,
        marginBottom: 10,
        marginTop: 10,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Inter_18pt-Medium',
        color: "#333",
    },
    reviewText: {
        fontSize: 14,
        color: "#333",
        fontFamily: "Inter_18pt-Regular",
        lineHeight: 20,
    },
    value: {
        fontSize: 16,
        fontFamily: 'Inter_18pt-Regular',
        color: "#333",
    },
});
