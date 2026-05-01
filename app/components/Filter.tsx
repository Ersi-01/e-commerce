import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";

const CATEGORIES = [
  "All", "Hoodies", "Pants", "T-Shirts", "Jackets",
  "Jeans", "Shorts", "Shirts", "Tops", "Sweaters", "Sweatshirts",
];

export type FilterOptions = {
  category: string;
  sortBy: "price_asc" | "price_desc" | null;
  inStockOnly: boolean;
};

const DEFAULT_FILTERS: FilterOptions = {
  category: "All",
  sortBy: null,
  inStockOnly: false,
};

type Props = {
  onFilterChange: (filters: FilterOptions) => void;
};

export default function Filter({ onFilterChange }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>(DEFAULT_FILTERS);

  const activeCount = [
    activeFilters.category !== "All",
    activeFilters.sortBy !== null,
    activeFilters.inStockOnly,
  ].filter(Boolean).length;

  const openModal = () => {
    setTempFilters(activeFilters);
    setModalVisible(true);
  };

  const applyFilters = () => {
    setActiveFilters(tempFilters);
    onFilterChange(tempFilters);
    setModalVisible(false);
  };

  const resetFilters = () => {
    setTempFilters(DEFAULT_FILTERS);
  };

  return (
    <>
      {/* Butoni Filter */}
      <TouchableOpacity style={styles.filterBtn} onPress={openModal}>
        <Text style={styles.filterBtnText}>⚙ Filter</Text>
        {activeCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{activeCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.sheet}>

            {/* Header */}
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Category */}
            <Text style={styles.sectionTitle}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.chipRow}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.chip, tempFilters.category === cat && styles.chipActive]}
                    onPress={() => setTempFilters((f: FilterOptions) => ({ ...f, category: cat }))}
                  >
                    <Text style={[styles.chipText, tempFilters.category === cat && styles.chipTextActive]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Sort */}
            <Text style={styles.sectionTitle}>Sort by Price</Text>
            <View style={styles.chipRow}>
              {[
                { label: "Default", value: null },
                { label: "↑ Low to High", value: "price_asc" },
                { label: "↓ High to Low", value: "price_desc" },
              ].map((opt) => (
                <TouchableOpacity
                  key={String(opt.value)}
                  style={[styles.chip, tempFilters.sortBy === opt.value && styles.chipActive]}
                  onPress={() => setTempFilters((f: FilterOptions) => ({ ...f, sortBy: opt.value as FilterOptions["sortBy"] }))}
                >
                  <Text style={[styles.chipText, tempFilters.sortBy === opt.value && styles.chipTextActive]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* In Stock Only */}
            <Text style={styles.sectionTitle}>Availability</Text>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setTempFilters((f: FilterOptions) => ({ ...f, inStockOnly: !f.inStockOnly }))}
            >
              <View style={[styles.checkbox, tempFilters.inStockOnly && styles.checkboxActive]}>
                {tempFilters.inStockOnly && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxLabel}>In Stock Only</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </>
  );
}

const ACCENT = "#f0c060";
const CARD_BG = "#13131a";
const BORDER = "#2a2a3a";

const styles = StyleSheet.create({
  filterBtn: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: ACCENT, paddingHorizontal: 14,
    paddingVertical: 8, borderRadius: 10, gap: 6,
  },
  filterBtnText: { color: "#0a0a0f", fontWeight: "700", fontSize: 14 },
  badge: {
    backgroundColor: "#0a0a0f", borderRadius: 10,
    minWidth: 18, height: 18, alignItems: "center",
    justifyContent: "center", paddingHorizontal: 4,
  },
  badgeText: { color: ACCENT, fontSize: 11, fontWeight: "800" },

  overlay: { flex: 1, backgroundColor: "#000000aa", justifyContent: "flex-end" },
  sheet: {
    backgroundColor: CARD_BG, borderTopLeftRadius: 24,
    borderTopRightRadius: 24, padding: 24,
    borderWidth: 1, borderColor: BORDER,
  },
  sheetHeader: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginBottom: 20,
  },
  sheetTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  closeBtn: { color: "#fff", fontSize: 20, fontWeight: "300" },

  sectionTitle: {
    color: "#888", fontSize: 11, fontWeight: "600",
    letterSpacing: 0.8, textTransform: "uppercase",
    marginTop: 20, marginBottom: 10,
  },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1,
    borderColor: BORDER, backgroundColor: "#1a1a24",
  },
  chipActive: { backgroundColor: ACCENT, borderColor: ACCENT },
  chipText: { color: "#aaa", fontSize: 13 },
  chipTextActive: { color: "#0a0a0f", fontWeight: "700" },

  checkboxRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 8 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: BORDER,
    alignItems: "center", justifyContent: "center",
  },
  checkboxActive: { backgroundColor: ACCENT, borderColor: ACCENT },
  checkmark: { color: "#0a0a0f", fontSize: 13, fontWeight: "700" },
  checkboxLabel: { color: "#ccc", fontSize: 14 },

  footer: {
    flexDirection: "row", gap: 12,
    paddingTop: 24, marginTop: 8,
    borderTopWidth: 1, borderColor: BORDER,
  },
  resetBtn: {
    flex: 1, height: 50, borderRadius: 12,
    borderWidth: 1, borderColor: BORDER,
    alignItems: "center", justifyContent: "center",
  },
  resetText: { color: "#aaa", fontWeight: "600", fontSize: 15 },
  applyBtn: {
    flex: 2, height: 50, borderRadius: 12,
    backgroundColor: ACCENT, alignItems: "center", justifyContent: "center",
  },
  applyText: { color: "#0a0a0f", fontWeight: "800", fontSize: 15 },
});