import HistoryElement from "@/components/HistoryElement/HistoryElement";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  randomButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  noRecipeText: {
    marginBottom: 20,
  },
});

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>EatFresh 🌱</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a recipe..."
          placeholderTextColor="gray"
        />

        <Button>
          <Text>Random Recipe</Text>
        </Button>
      </View>

      {/* Recipes Section */}
      <Text style={styles.sectionTitle}>Recipes</Text>
      <Text style={styles.noRecipeText}>No Recipe searched...</Text>

      <RecipeCard />
      <HistoryElement />
    </View>
  );
}
