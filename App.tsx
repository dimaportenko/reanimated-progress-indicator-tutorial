import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { FC } from "react";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10 }}>
        Open up App.tsx to start working on your app!
      </Text>
      <ProgressIndicator />
      <StatusBar style="auto" />
    </View>
  );
}

export const ProgressIndicator: FC<{
  count?: number;
  itemWidth?: number;
  itemHeigth?: number;
}> = ({ count = 6, itemWidth = 16, itemHeigth = 4 }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: itemHeigth * 4,
        width: (itemWidth + 4) * count,
      }}
    >
      {[...Array(6)].map((x, index) => (
        <ProgressItem
          key={`progressItem${index}`}
          index={index}
          width={itemWidth}
          height={itemHeigth}
        />
      ))}
    </View>
  );
};

export const ProgressItem: FC<{
  index: number;
  width?: number;
  height?: number;
}> = ({ index, width = 16, height = 4 }) => {
  return (
    <View
      style={{
        width,
        height,
        backgroundColor: "blue",
      }}
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
