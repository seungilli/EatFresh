import { View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
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

export default function HistoryElement() {
  return (
    <View>
      <Text style={styles.sectionTitle}>History</Text>
      <FlatList
        data={[{ key: "1" }, { key: "2" }]}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyTime}>Time</Text>
            <Text style={styles.historyText}>Previous Search</Text>
            <TouchableOpacity>
              <Text>Resume</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}
