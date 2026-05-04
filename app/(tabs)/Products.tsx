import { View, Text, FlatList, TouchableOpacity, Animated } from "react-native";
import { router } from "expo-router";
import products from "../data/products";
import { useWishlist } from "../context/WishlistContext";
import { addToCart } from "../storage/cartStorage";
import S from "@/app/styles/global";
import { useRef, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
  inStock: boolean;
  description: string;
};

export default function ProductsScreen() {
  const { addToWishlist, isInWishlist } = useWishlist();
  const [toastMessage, setToastMessage] = useState("");
  const opacity = useRef(new Animated.Value(0)).current;

  function showToast(message: string) {
    setToastMessage(message);
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(1500),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  }

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => router.push({ pathname: "/productdetails", params: { id: item.id } })}>
      <View style={S.card}>
        <Text style={S.subheading}>{item.name}</Text>
        <Text style={S.label}>{item.category}</Text>
        <Text style={S.body}>{item.description}</Text>
        <Text style={S.price}>${item.price}</Text>
        <Text style={S.rating}>⭐ {item.rating}</Text>
        <Text style={item.inStock ? S.inStock : S.outOfStock}>
          {item.inStock ? `In Stock: ${item.stock}` : "Out of Stock"}
        </Text>

        <TouchableOpacity
          style={[S.btnSecondary, !item.inStock && S.btnDisabled]}
          disabled={!item.inStock}
          onPress={(e) => { e.stopPropagation(); addToCart(item); showToast(`${item.name} added to cart!`); }}
        >
          <Text style={S.btnSecondaryText}>
            {item.inStock ? "Add to Cart" : "Unavailable"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[S.btnChip, isInWishlist(item.id) && S.btnDisabled]}
          onPress={(e) => { e.stopPropagation(); addToWishlist(item); }}
          disabled={isInWishlist(item.id)}
        >
          <Text style={S.btnChipText}>
            {isInWishlist(item.id) ? "In Wishlist" : "Add to Wishlist"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={S.screen}>
      <Text style={S.heading}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item: { id: number }) => item.id.toString()}
        renderItem={renderItem}
      />
      <Animated.View style={{
        opacity,
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
        backgroundColor: "#333",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 24,
      }}>
        <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>{toastMessage}</Text>
      </Animated.View>
    </View>
  );
}