import {
  KulimPark_300Light,
  KulimPark_400Regular,
} from "@expo-google-fonts/kulim-park";
import {
  Unbounded_700Bold,
  Unbounded_800ExtraBold,
} from "@expo-google-fonts/unbounded";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ArrowRight,
  Moon,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Sun,
  X,
} from "lucide-react-native";
import { MotiView } from "moti";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../context/ThemeContext";

const { width } = Dimensions.get("window");
const GRID_SIZE = 200;
const STEP = 20;

const THEME = {
  light: {
    background: "#ffffff",
    foreground: "#09090b",
    card: "#ffffff",
    border: "#e4e4e7",
    muted: "#71717a",
    accent: "#09090b",
    invert: "#ffffff",
    overlay: "rgba(0,0,0,0.4)",
    gridV: "rgba(249, 115, 22, 0.15)",
    gridH: "rgba(14, 165, 233, 0.15)",
  },
  dark: {
    background: "#09090b",
    foreground: "#ffffff",
    card: "#18181b",
    border: "#27272a",
    muted: "#a1a1aa",
    accent: "#ffffff",
    invert: "#09090b",
    overlay: "rgba(0,0,0,0.7)",
    gridV: "rgba(249, 115, 22, 0.3)",
    gridH: "rgba(14, 165, 233, 0.3)",
  },
} as const;

const SLIDES = [
  {
    id: "1",
    tag: "Marketplace",
    title: "The modern way\nto farm and trade.",
    body: "Premium e-commerce built for local empowerment. Seamlessly connecting Mati's best to the digital world.",
    Icon: Store,
  },
  {
    id: "2",
    tag: "Logistics",
    title: "From farm gates\nto front doors.",
    body: "Efficient tracking and professional handling. Your goods, moved with the strength and speed of a lion.",
    Icon: Package,
  },
  {
    id: "3",
    tag: "Experience",
    title: "Elevated shopping.\nLocal roots.",
    body: "A curated experience designed for trust. Discover the highest quality local produce in a single tap.",
    Icon: ShoppingCart,
  },
];

function SlideIllustration({ Icon, C }: { Icon: any; C: any }) {
  const lines = Array.from({ length: GRID_SIZE / STEP + 1 });
  return (
    <View style={styles.illustrationWrapper}>
      <View
        style={[styles.gridCanvas, { width: GRID_SIZE, height: GRID_SIZE }]}
      >
        {lines.map((_, i) => (
          <View
            key={`v-${i}`}
            style={[styles.lineV, { left: i * STEP, backgroundColor: C.gridV }]}
          />
        ))}
        {lines.map((_, i) => (
          <View
            key={`h-${i}`}
            style={[styles.lineH, { top: i * STEP, backgroundColor: C.gridH }]}
          />
        ))}
        <LinearGradient
          colors={[C.background, "transparent", "transparent", C.background]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={[C.background, "transparent", "transparent", C.background]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </View>
      <View
        style={[
          styles.iconCard,
          { backgroundColor: C.card, borderColor: C.border },
        ]}
      >
        <Icon size={42} color={C.foreground} strokeWidth={1.2} />
      </View>
      <View style={[styles.decorationRing, { borderColor: C.border }]} />
    </View>
  );
}

function Slide({
  item,
  fontsLoaded,
  C,
  isActive,
}: {
  item: any;
  fontsLoaded: boolean;
  C: any;
  isActive: boolean;
}) {
  return (
    <View style={[styles.slide, { width }]}>
      <View style={styles.slideTop}>
        <MotiView
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
          transition={{ type: "timing", duration: 600 }}
        >
          <SlideIllustration Icon={item.Icon} C={C} />
        </MotiView>
      </View>

      <View style={styles.slideContent}>
        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{
            opacity: isActive ? 1 : 0,
            translateX: isActive ? 0 : -20,
          }}
          transition={{ type: "timing", duration: 500, delay: 100 }}
          style={[styles.tagPill, { borderColor: C.border }]}
        >
          <Text
            style={[
              styles.tagText,
              { color: C.foreground },
              fontsLoaded && { fontFamily: "KulimPark_400Regular" },
            ]}
          >
            {item.tag.toUpperCase()}
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: isActive ? 1 : 0, translateY: isActive ? 0 : 20 }}
          transition={{ type: "timing", duration: 600, delay: 200 }}
        >
          <Text
            style={[
              styles.title,
              { color: C.foreground },
              fontsLoaded && { fontFamily: "Unbounded_800ExtraBold" },
            ]}
          >
            {item.title}
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateX: 20 }}
          animate={{ opacity: isActive ? 1 : 0, translateX: isActive ? 0 : 20 }}
          transition={{ type: "timing", duration: 700, delay: 300 }}
        >
          <Text
            style={[
              styles.body,
              { color: C.muted },
              fontsLoaded && { fontFamily: "KulimPark_400Regular" },
            ]}
          >
            {item.body}
          </Text>
        </MotiView>
      </View>
    </View>
  );
}

export default function Onboarding() {
  const { theme, toggleTheme } = useAppTheme();
  const C = THEME[theme];
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    Unbounded_800ExtraBold,
    Unbounded_700Bold,
    KulimPark_400Regular,
    KulimPark_300Light,
  });

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) setActiveIndex(viewableItems[0].index ?? 0);
    },
  ).current;

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      router.replace("/(auth)/login");
    }
  };

  const isLast = activeIndex === SLIDES.length - 1;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: C.background }]}
      edges={["top", "left", "right"]}
    >
      <View style={styles.topBar}>
        <Pressable onPress={() => setMenuVisible(true)} style={styles.iconBtn}>
          <Settings size={20} color={C.muted} strokeWidth={2} />
        </Pressable>
        {!isLast && (
          <Pressable
            onPress={() => router.replace("/(auth)/login")}
            style={styles.skipBtn}
          >
            <Text
              style={[
                styles.skipText,
                { color: C.muted },
                fontsLoaded && { fontFamily: "KulimPark_400Regular" },
              ]}
            >
              Skip
            </Text>
          </Pressable>
        )}
      </View>

      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        renderItem={({ item, index }) => (
          <Slide
            item={item}
            fontsLoaded={!!fontsLoaded}
            C={C}
            isActive={activeIndex === index}
          />
        )}
      />

      <View style={styles.bottomBar}>
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.2, 1, 0.2],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={[styles.dot, { backgroundColor: C.foreground, opacity }]}
              />
            );
          })}
        </View>
        <Pressable
          style={[styles.ctaBtn, { backgroundColor: C.accent }]}
          onPress={handleNext}
        >
          <Text
            style={[
              styles.ctaText,
              { color: C.invert },
              fontsLoaded && { fontFamily: "Unbounded_700Bold" },
            ]}
          >
            {isLast ? "Get Started" : "Next"}
          </Text>
          <ArrowRight size={16} color={C.invert} strokeWidth={3} />
        </Pressable>
      </View>

      <Modal transparent visible={menuVisible} animationType="fade">
        <Pressable
          style={[styles.modalOverlay, { backgroundColor: C.overlay }]}
          onPress={() => setMenuVisible(false)}
        >
          <View
            style={[
              styles.menuCard,
              { backgroundColor: C.card, borderColor: C.border },
            ]}
          >
            <View style={styles.menuHeader}>
              <Text
                style={[
                  styles.menuTitle,
                  { color: C.foreground },
                  fontsLoaded && { fontFamily: "Unbounded_700Bold" },
                ]}
              >
                Appearance
              </Text>
              <Pressable onPress={() => setMenuVisible(false)}>
                <X size={18} color={C.muted} />
              </Pressable>
            </View>
            <Pressable
              style={[
                styles.menuOption,
                theme === "light" && { backgroundColor: C.border },
              ]}
              onPress={() => {
                if (theme !== "light") toggleTheme();
                setMenuVisible(false);
              }}
            >
              <Sun size={18} color={C.foreground} />
              <Text
                style={[
                  styles.optionText,
                  { color: C.foreground },
                  fontsLoaded && { fontFamily: "KulimPark_400Regular" },
                ]}
              >
                Light Mode
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.menuOption,
                theme === "dark" && { backgroundColor: C.border },
              ]}
              onPress={() => {
                if (theme !== "dark") toggleTheme();
                setMenuVisible(false);
              }}
            >
              <Moon size={18} color={C.foreground} />
              <Text
                style={[
                  styles.optionText,
                  { color: C.foreground },
                  fontsLoaded && { fontFamily: "KulimPark_400Regular" },
                ]}
              >
                Dark Mode
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 50,
    alignItems: "center",
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  skipBtn: { paddingVertical: 8 },
  skipText: { fontSize: 14 },
  slide: { flex: 1 },
  slideTop: { flex: 1, justifyContent: "center", alignItems: "center" },
  slideContent: { paddingHorizontal: 16, paddingBottom: 40, gap: 16 },
  illustrationWrapper: {
    width: 240,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  gridCanvas: { position: "absolute", overflow: "hidden" },
  lineV: { position: "absolute", width: 1, height: "100%" },
  lineH: { position: "absolute", height: 1, width: "100%" },
  iconCard: {
    width: 100,
    height: 100,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  decorationRing: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderStyle: "dashed",
    opacity: 0.2,
  },
  tagPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  tagText: { fontSize: 10, letterSpacing: 1, fontWeight: "700" },
  title: { fontSize: 32, lineHeight: 40, letterSpacing: -1 },
  body: { fontSize: 16, lineHeight: 24 },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  dotsRow: { flexDirection: "row", gap: 8 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaText: { fontSize: 14, marginRight: 8 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  menuCard: {
    width: "100%",
    maxWidth: 300,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  menuTitle: { fontSize: 16 },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  optionText: { fontSize: 15 },
});
