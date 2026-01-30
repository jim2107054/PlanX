import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
} from "react-native-reanimated";

const iconDataSets = {
  set1: [
    { emoji: "🍕", color: "#FFE5CC" },
    { emoji: "🍔", color: "#F4D03F" },
    { emoji: "🍟", color: "#F8D7DA" },
    { emoji: "🌮", color: "#D5EDDA" },
    { emoji: "🍗", color: "#FADBD8" },
  ],

  set2: [
    { emoji: "🎮", color: "#D1ECF1" },
    { emoji: "🎧", color: "#E2E3E5" },
    { emoji: "☕", color: "#F4D03F" },
    { emoji: "🍿", color: "#FFE5CC" },
    { emoji: "🥤", color: "#F8D7DA" },
  ],

  set3: [
    { emoji: "🍰", color: "#FADBD8" },
    { emoji: "🍦", color: "#D1ECF1" },
    { emoji: "🍪", color: "#FFE5CC" },
    { emoji: "🎲", color: "#D5EDDA" },
    { emoji: "🎂", color: "#E2E3E5" },
  ],
};

const ITEM_HEIGHT = 160;
const SCROLL_SPEED = 20; // pixels per second
const FRAME_RATE = 60; // frames per second

interface SmoothInfiniteScrollProps {
  scrollDirection?: "up" | "down";
  iconSet?: "set1" | "set2" | "set3";
}

const SmoothInfiniteScroll = ({
  scrollDirection = "down",
  iconSet = "set1",
}: SmoothInfiniteScrollProps) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);

  const iconData = iconDataSets[iconSet];
  const items = [...iconData, ...iconData]; // Duplicate for seamless scrolling
  const totalContentHeight = items.length * ITEM_HEIGHT; // Calculate total content height for scrolling

  useEffect(() => {
    if (scrollDirection === "up") {
      scrollY.value = totalContentHeight;
    } else {
      scrollY.value = 0;
    }

    const interval = setInterval(() => {
      const increment =
        (SCROLL_SPEED / FRAME_RATE) * (scrollDirection === "down" ? 1 : -1);
      scrollY.value += increment;
    }, 1000 / FRAME_RATE);

    return () => {
      clearInterval(interval);
    };
  }, [scrollDirection, scrollY, totalContentHeight]);

  useAnimatedReaction(
    () => scrollY.value,
    (value) => {
      if (scrollDirection === "down") {
        if (value >= totalContentHeight) {
          scrollY.value = 0;
          scrollTo(scrollRef, 0, 0, false);
        } else {
          scrollTo(scrollRef, 0, value, false);
        }
      } else {
        if (value <= 0) {
          scrollY.value = totalContentHeight;
          scrollTo(scrollRef, 0, totalContentHeight, false);
        } else {
          scrollTo(scrollRef, 0, value, false);
        }
      }
    },
  );

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.container}
      ref={scrollRef}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    >
      {items.map((item, idx) => (
        <View
          key={idx}
          style={[styles.itemContainer, { backgroundColor: item.color }]}
        >
          <Text style={{ fontSize: 48 }}>{item.emoji}</Text>
        </View>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingVertical: 20,
  },
  itemContainer: {
    width: 160,
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 5,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
});

export default SmoothInfiniteScroll;
