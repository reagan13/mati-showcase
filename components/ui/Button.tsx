import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ─── Palette (shared) ─────────────────────────────────────────────────────────
const C = {
  navy: "#0B1120",
  navyLight: "#111827",
  navyMid: "#1E2D45",
  white: "#FFFFFF",
  whiteDim: "#64748B",
  orange: "#F97316",
};

type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  /** Optional Lucide-style icon component placed before the label */
  iconLeft?: React.ReactNode;
  /** Optional Lucide-style icon component placed after the label */
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

// ─── Size tokens ──────────────────────────────────────────────────────────────
// Min touch target: 48px (Apple HIG / Material). lg = 56px for hero CTAs.
const SIZE = {
  sm: {
    height: 40,
    paddingHorizontal: 16,
    fontSize: 13,
    gap: 6,
    borderRadius: 10,
  },
  md: {
    height: 48,
    paddingHorizontal: 20,
    fontSize: 14,
    gap: 8,
    borderRadius: 12,
  },
  lg: {
    height: 56,
    paddingHorizontal: 28,
    fontSize: 15,
    gap: 10,
    borderRadius: 14,
  },
};

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  fullWidth = false,
}: ButtonProps) {
  const s = SIZE[size];
  const isDisabled = disabled || loading;

  // ─── Variant-based styles ─────────────────────────────────────────────────
  const containerVariant =
    variant === "primary"
      ? styles.containerPrimary
      : variant === "outline"
        ? styles.containerOutline
        : styles.containerGhost;

  const labelVariant =
    variant === "primary" ? styles.labelPrimary : styles.labelMuted;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        containerVariant,
        {
          height: s.height,
          paddingHorizontal: s.paddingHorizontal,
          borderRadius: s.borderRadius,
          gap: s.gap,
          ...(fullWidth && { alignSelf: "stretch" }),
          opacity: pressed ? 0.8 : isDisabled ? 0.45 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? C.white : C.orange}
        />
      ) : (
        <>
          {iconLeft && <View style={styles.icon}>{iconLeft}</View>}
          <Text style={[styles.label, labelVariant, { fontSize: s.fontSize }]}>
            {label}
          </Text>
          {iconRight && <View style={styles.icon}>{iconRight}</View>}
        </>
      )}
    </Pressable>
  );
}

// ─── Ghost text-only button (for Skip / secondary actions) ───────────────────
interface TextButtonProps {
  label: string;
  onPress: () => void;
  size?: ButtonSize;
}

export function TextButton({ label, onPress, size = "md" }: TextButtonProps) {
  const s = SIZE[size];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.textBtn,
        {
          height: s.height,
          paddingHorizontal: s.paddingHorizontal,
          borderRadius: s.borderRadius,
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    >
      <Text style={[styles.textBtnLabel, { fontSize: s.fontSize }]}>
        {label}
      </Text>
    </Pressable>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  // Variants
  containerPrimary: {
    backgroundColor: C.orange,
    shadowColor: C.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  containerOutline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: C.orange,
  },
  containerGhost: {
    backgroundColor: C.navyLight,
    borderWidth: 1,
    borderColor: C.navyMid,
  },

  label: {
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  labelPrimary: {
    color: C.white,
  },
  labelMuted: {
    color: C.whiteDim,
  },

  icon: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Text button
  textBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textBtnLabel: {
    color: C.whiteDim,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});
