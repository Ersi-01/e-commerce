import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function Profile() {
  const user = {
    name: "Guest User",
    email: "guest@email.com",
    balance: 120.5,
    orders: 8,
    wishlist: 14,
    address: "Tirana, Albania",
    memberSince: "2025",
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Account</Text>

      {/* HEADER CARD */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />

        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.muted}>
            Member since {user.memberSince}
          </Text>
        </View>
      </View>

      {/* BALANCE */}
      <View style={styles.balanceCard}>
        <Text style={styles.sectionTitle}>Wallet Balance</Text>
        <Text style={styles.balance}>
          ${user.balance.toFixed(2)}
        </Text>
      </View>

      {/* STATS */}
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.orders}</Text>
          <Text>Orders</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.wishlist}</Text>
          <Text>Wishlist</Text>
        </View>
      </View>

      {/* ADDRESS */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>📍 Shipping Address</Text>
        <Text>{user.address}</Text>
      </View>

      {/* ACTIONS */}
      <View style={styles.actions}>
        <Button label="Edit Profile" />
        <Button label="My Orders" />
        <Button label="Payment Methods" />
        <Button label="Logout" danger />
      </View>
    </ScrollView>
  );
}

/* Reusable Button */
function Button({ label, danger }: { label: string; danger?: boolean }) {
  return (
    <TouchableOpacity
      style={[styles.button, danger && styles.logoutButton]}
    >
      <Text style={[styles.buttonText, danger && styles.logoutText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  profileCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: "#555",
  },
  muted: {
    color: "#888",
    fontSize: 12,
  },
  balanceCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  balance: {
    fontSize: 22,
    fontWeight: "bold",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  actions: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#ff3b30",
  },
  logoutText: {
    color: "#fff",
  },
});
