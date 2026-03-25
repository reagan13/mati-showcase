import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { TextButton } from "../../components/ui/TextButton";
import { THEME } from "../../constants/onboarding";
import { useAppTheme } from "../../context/ThemeContext";

export default function LoginScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const C = THEME[theme];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // 🔐 Replace with real auth (Supabase/Firebase)
      console.log("Logging in:", { email, password });

      setTimeout(() => {
        setLoading(false);
        Alert.alert("Success", "Logged in!");
        router.replace("/"); // go to home
      }, 1000);
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", "Login failed");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.inner}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER */}
          <Text style={[styles.title, { color: C.foreground }]}>
            Welcome Back
          </Text>
          <Text style={[styles.subtitle, { color: C.muted }]}>
            Log in to your account
          </Text>

          {/* FORM */}
          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button
              label={loading ? "Signing in..." : "Sign In"}
              onPress={handleLogin}
              loading={loading}
              fullWidth
            />
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={{ color: C.muted }}>Don&apos;t have an account? </Text>

            <TextButton
              label="Register"
              onPress={() => router.push("/(auth)/register")}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  inner: {
    padding: 24,
    flexGrow: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },

  form: {
    gap: 16,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    alignItems: "center",
  },
});
