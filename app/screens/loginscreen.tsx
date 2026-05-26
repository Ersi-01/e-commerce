import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radius, Typography } from '@/app/styles/global';
import S from '@/app/styles/global';
import storage from '@/app/utils/storage';

type LoginErrors = {
  email?: string | null;
  password?: string | null;
};

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();

    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    try {
      const savedEmail = await storage.get("@user_email");
      if (savedEmail) {
        router.replace('/(tabs)' as any);
      }
    } catch (e) {
      console.log("Storage error", e);
    }
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const sanitize = (value: string) =>
    value.replace(/[<>'"`;\\]/g, '').trim();

  const validate = () => {
    const newErrors: LoginErrors = {};

    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 6) newErrors.password = 'Min 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      triggerShake();
      return;
    }

    setLoading(true);

    try {
      const savedEmail = await storage.get("@user_email");
      const savedName = await storage.get("@user_name");

      if (!savedEmail) {
        setErrors({ email: "No account found. Please register first." });
        triggerShake();
        setLoading(false);
        return;
      }

      // simple check (demo only)
      if (savedEmail !== email.trim()) {
        setErrors({ email: "Email not found" });
        triggerShake();
        setLoading(false);
        return;
      }

      // login success (local)
      await new Promise(res => setTimeout(res, 600));

      router.replace('/(tabs)' as any);

    } catch (e) {
      console.log("Login error", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={S.screenNoPad}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        <View style={S.blobTop} />
        <View style={S.blobBottom} />

        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { translateX: shakeAnim },
              ],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.brandName}>ShopApp</Text>
            <Text style={S.caption}>Sign in to continue</Text>
          </View>

          <View style={S.cardElevated}>

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              ref={passwordRef}
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              style={S.btnPrimary}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={S.btnPrimaryText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/register' as any)}>
              <Text style={S.caption}>
                Don't have an account? Create one
              </Text>
            </TouchableOpacity>

          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  container: {
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 30,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  input: {
    backgroundColor: Colors.input,
    borderRadius: Radius.lg,
    padding: 14,
    marginBottom: 12,
    color: Colors.textPrimary,
  },
});