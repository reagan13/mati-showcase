import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProviderWrapper, useAppTheme } from "../context/ThemeContext";

function RootLayoutContent() {
  const { theme } = useAppTheme();

  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding/index" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
      </Stack>
      {/* This line controls the battery/clock visibility */}
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProviderWrapper>
        <RootLayoutContent />
      </ThemeProviderWrapper>
    </SafeAreaProvider>
  );
}
