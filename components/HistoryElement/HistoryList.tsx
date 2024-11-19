import { View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import HistoryItem from "./HistoryItem";
import { useHistoryContext } from "@/hooks/useHistoryProvider";

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default function HistoryList() {
  const { history, clearHistory } = useHistoryContext();

  return (
    <View>
      <Text style={styles.sectionTitle}>History</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => <HistoryItem item={item} />}
        keyExtractor={(item) => item.time}
      />
    </View>
  );
}
