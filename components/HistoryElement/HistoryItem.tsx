import { HistoryType } from "@/types/data";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  historyTime: {
    marginRight: 10,
  },
  historyText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
});

type HistoryItemProps = {
  item: HistoryType;
};

export default function HistoryItem({ item }: HistoryItemProps) {
  return (
    <View style={styles.historyItem}>
      <Text style={styles.historyTime}>{item.time}</Text>
      <Text style={styles.historyText}>{item.searchedText}</Text>
    </View>
  );
}
