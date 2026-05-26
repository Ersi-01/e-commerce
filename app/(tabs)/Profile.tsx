import {
  Camera,
  CreditCard,
  Heart,
  LogOut,
  PackageCheck,
  Settings,
  ShoppingBag,
  Star,
} from "lucide-react-native"
import React, { useEffect, useMemo, useState } from "react"
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { useRouter } from "expo-router"
import { useWishlist } from "../context/WishlistContext"
import { useTheme } from "../context/ThemeContext"
import S, { Colors, Radius, Spacing, Typography, getColors } from "@/app/styles/global"
import storage from "@/app/utils/storage"

export default function Profile() {
  const { isDark } = useTheme()
  const Colors = getColors(isDark)
  const router = useRouter()
  const { wishlist } = useWishlist()

  const [email, setEmail] = useState("user@store.com")
  const [name, setName] = useState("")
  const [balance, setBalance] = useState(0)
  const [orders, setOrders] = useState<any[]>([])

  const [topupVisible, setTopupVisible] = useState(false)
  const [topupAmount, setTopupAmount] = useState("")

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const savedEmail = await storage.get("@user_email")
      const savedName = await storage.get("@user_name")

      if (savedEmail) setEmail(savedEmail)
      if (savedName) setName(savedName)

      const savedBalance = await storage.get("@user_balance")
      if (savedBalance) {
        setBalance(Number(savedBalance))
      } else {
        await storage.set("@user_balance", "0")
      }

      const savedOrders = await storage.get("@user_orders")
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const displayName = useMemo(() => {
    if (name) return name
    return (
      email
        .split("@")[0]
        ?.replace(/[._-]/g, " ")
        ?.replace(/\b\w/g, (l) => l.toUpperCase()) || "User"
    )
  }, [email, name])

  const initials = useMemo(() => {
    return displayName
      .split(" ")
      .map((x) => x[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }, [displayName])

  const deliveredCount = useMemo(() => {
    return orders.filter((x) => x.status?.toLowerCase() === "delivered").length
  }, [orders])

  const handleTopup = async () => {
    const amount = Number(topupAmount)

    if (!amount || amount <= 0) {
      Alert.alert("Error", "Invalid amount")
      return
    }

    const updated = balance + amount
    setBalance(updated)
    await storage.set("@user_balance", String(updated))
    setTopupVisible(false)
    setTopupAmount("")
    Alert.alert("Success", `Balance updated: EUR ${updated.toFixed(2)}`)
  }

  const handleSignOut = async () => {
  await storage.remove("@user_email");
  await storage.remove("@user_name");
  await storage.remove("@user_balance");
  await storage.remove("@user_orders");

  router.replace("/login" as any);
};

  return (
    <View style={[S.screenNoPad, { backgroundColor: Colors.bg, flex: 1 }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingTop: 54,
          paddingBottom: 160,
        }}
      >
        {/* HEADER */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: Spacing.xl,
          }}
        >
          <View>
            <Text style={S.label}>My account</Text>
            <Text style={S.heading}>Profile</Text>
          </View>

          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              borderRadius: Radius.lg,
              backgroundColor: Colors.card,
              borderWidth: 1,
              borderColor: Colors.border,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Settings size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* PROFILE CARD */}
        <View
          style={[
            S.cardElevated,
            { flexDirection: "row", alignItems: "center", marginBottom: Spacing.lg },
          ]}
        >
          <View style={{ marginRight: Spacing.lg }}>
            <View
              style={{
                width: 78,
                height: 78,
                borderRadius: Radius.lg,
                backgroundColor: Colors.accent,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 26, fontWeight: "900" }}>
                {initials}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                position: "absolute",
                right: -4,
                bottom: -4,
                width: 30,
                height: 30,
                borderRadius: Radius.md,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Camera size={15} color="#111" />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={S.subheading}>{displayName}</Text>
            <Text style={[S.caption, { marginTop: 4 }]}>{email}</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 12,
                backgroundColor: Colors.accent + "18",
                borderRadius: 999,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <Star size={12} color={Colors.accent} />
              <Text style={{ color: Colors.accent, fontWeight: "700", marginLeft: 6 }}>
                Gold member
              </Text>
            </View>
          </View>
        </View>

        {/* BALANCE */}
        <View
          style={{
            backgroundColor: Colors.accent,
            borderRadius: Radius.xxl,
            padding: Spacing.xl,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: Spacing.xl,
          }}
        >
          <View>
            <Text style={{ color: "#ffffff99", fontSize: 12, fontWeight: "700" }}>
              Available balance
            </Text>

            <Text style={{ color: "#fff", fontSize: 30, fontWeight: "900" }}>
              EUR {balance.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setTopupVisible(true)}
            style={{
              backgroundColor: "#fff",
              borderRadius: Radius.lg,
              paddingHorizontal: 16,
              paddingVertical: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CreditCard size={16} color="#111" />
            <Text style={{ marginLeft: 8, fontWeight: "800" }}>Top up</Text>
          </TouchableOpacity>
        </View>

        {/* STATS */}
        <View style={{ flexDirection: "row", gap: Spacing.sm, marginBottom: Spacing.xl }}>
          <StatCard icon={ShoppingBag} label="Purchases" value={String(orders.length)} />
          <StatCard icon={PackageCheck} label="Delivered" value={String(deliveredCount)} />
          <StatCard icon={Heart} label="Wishlist" value={String(wishlist.length)} />
        </View>

        {/* MENU */}
        <MenuRow
          icon={LogOut}
          title="Sign out"
          subtitle="Disconnect account"
          danger
          onPress={handleSignOut}
        />
      </ScrollView>

      {/* TOPUP MODAL */}
      <Modal visible={topupVisible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.card,
              borderRadius: Radius.xl,
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 16 }}>
              Top up balance
            </Text>

            <TextInput
              value={topupAmount}
              onChangeText={setTopupAmount}
              placeholder="Enter amount"
              keyboardType="numeric"
              style={{
                backgroundColor: Colors.input,
                borderRadius: Radius.lg,
                padding: 14,
                marginBottom: 20,
              }}
            />

            <TouchableOpacity
              onPress={handleTopup}
              style={{
                backgroundColor: Colors.accent,
                padding: 14,
                borderRadius: Radius.lg,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "800" }}>Add balance</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setTopupVisible(false)}>
              <Text style={{ textAlign: "center", marginTop: 12 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

/* ---------- COMPONENTS ---------- */

function StatCard({ icon: Icon, label, value }: any) {
  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: Colors.card, borderRadius: 12 }}>
      <Icon size={20} color={Colors.accent} />
      <Text style={{ fontSize: 22, fontWeight: "900" }}>{value}</Text>
      <Text style={{ fontSize: 12 }}>{label}</Text>
    </View>
  )
}

function MenuRow({ icon: Icon, title, subtitle, danger, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        backgroundColor: Colors.card,
        borderRadius: 12,
      }}
    >
      <Icon size={18} color={danger ? Colors.danger : Colors.accent} />
      <View style={{ marginLeft: 12 }}>
        <Text style={{ fontWeight: "700" }}>{title}</Text>
        <Text style={{ fontSize: 12 }}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  )
}