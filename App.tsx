import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { FC, useEffect } from "react";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function App() {
  return (
    <View style={styles.container}>
      <ProgressIndicator
        duration={1000}
        // itemWidth={8} itemHeight={2}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export const ProgressIndicator: FC<{
  count?: number;
  itemWidth?: number;
  itemHeight?: number;
  duration?: number;
}> = ({ count = 8, itemWidth = 16, itemHeight = 4, duration = 5000 }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: itemHeight * 4,
        width: (itemWidth + 4) * count,
      }}
    >
      {[...Array(count)].map((x, index) => (
        <ProgressItem
          key={`progressItem${index}`}
          index={index}
          width={itemWidth}
          height={itemHeight}
          progress={progress}
          count={count}
        />
      ))}
    </View>
  );
};

export const ProgressItem: FC<{
  index: number;
  count: number;
  width?: number;
  height?: number;
  progress: SharedValue<number>;
}> = ({ index, width = 16, height = 4, progress, count }) => {
  const animtedStyle = useAnimatedStyle(() => {
    const tak = 3;
    // const ticks = count * tak;
    const ticks = count - 1 + 2 * tak;
    const scaleY = interpolate(
      progress.value,
      [index / ticks, (index + tak) / ticks, (index + 2 * tak) / ticks],
      [height, height * 4, height],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scaleY }],
    };
  });
  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: "black",
        },
        animtedStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  progressItem: {},
});
