import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  picturePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  favoriteDetails: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  heartIcon: {
    fontSize: 20,
  },
});

export default function RecipeCard() {
  return (
    <View>
      <Text style={styles.sectionTitle}>Favorites</Text>
      <Card style={styles.favoriteItem}>
        <Card.Content>
          <View style={styles.picturePlaceholder} />
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
          <View style={styles.tagsContainer}>
            <Text style={styles.tag}>Category</Text>
            <Text style={styles.tag}>Area</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.tag}>heart Icon</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
}
