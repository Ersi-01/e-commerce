import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react-native";
import React from "react";

export default function NavbarAlt() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = 2;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>MyShop</Text>

        <View style={styles.actions}>
          {/* Cart */}
          <View style={styles.iconWrapper}>
            <ShoppingCart size={22} color="#222" />
            {cartItems > 0 && (
              <View style={styles.counter}>
                <Text style={styles.counterText}>{cartItems}</Text>
              </View>
            )}
          </View>

          {/* User */}
          <TouchableOpacity style={styles.iconSpacing}>
            <User size={22} color="#222" />
          </TouchableOpacity>

          {/* Menu Button */}
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X size={24} color="#222" />
            ) : (
              <Menu size={24} color="#222" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Search size={18} color="#888" />
        <TextInput
          placeholder="Search items..."
          style={styles.searchInput}
        />
      </View>

      {/* Dropdown Menu */}
      {menuOpen && (
        <View style={styles.dropdown}>
          <NavItem label="Home" />
          <NavItem label="Products" />
          <NavItem label="Categories" />
          <NavItem label="Offers" />
        </View>
      )}
    </View>
  );
}

/* Reusable Menu Item */
function NavItem({ label }: { label: string }) {
  return (
    <TouchableOpacity style={styles.navItem}>
      <Text style={styles.navText}>{label}</Text>
    </TouchableOpacity>
  );
}

/* Styles */
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 12,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 22,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    position: "relative",
    marginRight: 15,
  },
  iconSpacing: {
    marginRight: 15,
  },
  counter: {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: "#ff3b30",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  counterText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    height: 40,
  },
  dropdown: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  navItem: {
    paddingVertical: 10,
  },
  navText: {
    fontSize: 16,
    color: "#333",
  },
});