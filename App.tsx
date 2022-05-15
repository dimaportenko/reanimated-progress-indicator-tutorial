import { StyleSheet, View } from "react-native";
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
        itemWidth={16}
        itemHeight={8}
        itemsOffset={4}
        topScale={4}
      />
    </View>
  );
}

export const ProgressIndicator: FC<{
  count?: number;
  itemWidth?: number;
  itemHeight?: number;
  duration?: number;
  itemsOffset?: number;
  topScale?: number;
}> = ({
  count = 8,
  itemWidth = 16,
  itemHeight = 4,
  duration = 5000,
  itemsOffset = 4,
  topScale = 4,
}) => {
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
        height: itemHeight * topScale,
        width: (itemWidth + itemsOffset) * count,
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
          topScale={topScale}
        />
      ))}
    </View>
  );
};

export const ProgressItem: FC<{
  index: number;
  count: number;
  width: number;
  height: number;
  progress: SharedValue<number>;
  topScale: number;
}> = ({ index, width, height, progress, count, topScale }) => {
  const animtedStyle = useAnimatedStyle(() => {
    const tak = 3;
    // const ticks = count * tak;
    const ticks = count - 1 + 2 * tak;
    const scaleY = interpolate(
      progress.value,
      [index / ticks, (index + tak) / ticks, (index + 2 * tak) / ticks],
      [1, topScale, 1],
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
