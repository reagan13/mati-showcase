import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { THEME } from "../../constants/onboarding";
import { useAppTheme } from "../../context/ThemeContext";

export default function RegisterScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const C = THEME[theme];

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleRegister = () => {
    // Add your registration logic here
    console.log("Registering user:", form);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <ScrollView
        contentContainerStyle={styles.inner}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: C.foreground }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: C.muted }]}>
            Join us to start your journey
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={form.name}
            onChangeText={(t) => setForm({ ...form, name: t })}
          />
          <Input
            label="Email"
            placeholder="name@example.com"
            value={form.email}
            onChangeText={(t) => setForm({ ...form, email: t })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            placeholder="••••••••"
            value={form.password}
            onChangeText={(t) => setForm({ ...form, password: t })}
            secureTextEntry
          />

          <Button
            label="Create Account"
            onPress={handleRegister}
            style={{ marginTop: 8 }}
          />
        </View>

        <View style={styles.footer}>
          <Button
            label="Back to Login"
            onPress={() => router.back()}
            variant="outline"
            style={styles.backButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { padding: 24, flexGrow: 1, justifyContent: "center" },
  header: { marginBottom: 32 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 16 },
  form: { gap: 4 }, // Gap handles the space between Inputs
  footer: { marginTop: 16 },
  backButton: { width: "100%" },
});
