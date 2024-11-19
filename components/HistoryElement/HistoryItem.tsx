import { HistoryType } from "@/types/data";
import { View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

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
      <TouchableOpacity>
        <Text>Resume</Text>
      </TouchableOpacity>
    </View>
  );
}
