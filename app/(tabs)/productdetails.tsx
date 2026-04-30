import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  price: number;
  stock: number;
};

type Props = {
  products: Product[];
};

export default function ProductDetails({ products }: Props) {
  const { id } = useLocalSearchParams();
  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Product Details</Text>

      <View style={styles.card}>
        <DetailRow label="ID" value={product.id} />
        <DetailRow label="Name" value={product.name} />
        <DetailRow label="Category" value={product.category} />
        <DetailRow label="Description" value={product.description} />
        <DetailRow label="Rating" value={product.rating} />
        <DetailRow label="Price" value={`${product.price}€`} />
        <DetailRow label="Stock" value={product.stock} />
      </View>
    </ScrollView>
  );
}

type DetailRowProps = {
  label: string;
  value: string | number;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{String(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  notFound: { fontSize: 18, color: "red" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  label: { fontWeight: "600", fontSize: 15, color: "#333" },
  value: { fontSize: 15, color: "#555", flexShrink: 1 },
});