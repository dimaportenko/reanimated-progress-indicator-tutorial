import React, { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  SharedValue,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withRepeat,
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
    progress.value = withRepeat(withTiming(1, { duration }), -1, true);
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
          count={count}
          topScale={topScale}
          progress={progress}
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
  topScale: number;
  progress: SharedValue<number>;
}> = ({ index, width, height, count, topScale, progress }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const parts = 3;
    const wholeCount = count - 1 + 2 * parts;
    const scaleY = interpolate(
      progress.value,
      [
        index / wholeCount,
        (index + parts) / wholeCount,
        (index + 2 * parts) / wholeCount,
      ],
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
        animatedStyle,
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
});
