import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Wishlist ({wishlist.length})</Text>

      {wishlist.length === 0 ? (
        <Text style={styles.empty}>Wishlist juaj është bosh</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>€{item.price}</Text>
              </View>
              <TouchableOpacity 
                style={styles.removeBtn}
                onPress={() => removeFromWishlist(item.id)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0a0a0f", 
    padding: 16 
  },
  title: { 
    color: "#fff", 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20 
  },
  empty: { 
    color: "#888", 
    textAlign: "center", 
    marginTop: 100, 
    fontSize: 18 
  },
  card: {
    backgroundColor: "#13131a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  name: { 
    color: "#fff", 
    fontSize: 17, 
    fontWeight: "600" 
  },
  price: { 
    color: "#f0c060", 
    fontSize: 16, 
    fontWeight: "700",
    marginTop: 4 
  },
  removeBtn: { 
    backgroundColor: "#f44336", 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 8 
  },
  removeText: { 
    color: "#fff", 
    fontWeight: "600" 
  },
});