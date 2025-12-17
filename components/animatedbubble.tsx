import { View, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";

export default function ThinkingBubble() {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  const animateDot = (dot: Animated.Value, delay: number) =>
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(dot, {
          toValue: 1,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(dot, {
          toValue: 0.3,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

  useEffect(() => {
    Animated.parallel([
      animateDot(dot1, 0),
      animateDot(dot2, 150),
      animateDot(dot3, 300),
    ]).start();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        padding: 12,
        // borderRadius: 20,
        backgroundColor: "#27272A",
        alignSelf: "flex-start",
      }}
      className="rounded-lg"
    >
      <Animated.View
        style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: "#555",
          marginHorizontal: 3,
          opacity: dot1,
        }}
      />
      <Animated.View
        style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: "#555",
          marginHorizontal: 3,
          opacity: dot2,
        }}
      />
      <Animated.View
        style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: "#555",
          marginHorizontal: 3,
          opacity: dot3,
        }}
      />
    </View>
  );
}
