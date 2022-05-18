import { StyleSheet, View } from "react-native";
import { FC, useEffect } from "react";

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
}> = ({ index, width, height, count, topScale }) => {
  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor: "black",
        },
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
