import HistoryElement from "@/components/HistoryElement/HistoryElement";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import { Meal } from "@/hooks/useFetchData";
import React, { useEffect, useState } from "react";
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
  const [list, setList] = useState<Meal[] | null>(null);

  const [searchText, setSearchText] = useState("");

  const handleTextChange = (text: string) => {
    setSearchText(text);
    fetchAllMeals(text.charAt(0));
    filterMeals(searchText);
  };

  const fetchAllMeals = async (letter: string) => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?f=" + letter
      );
      const data = await response.json();
      if (data.meals) {
        setList(data.meals);
      }
      return data.meals;
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const filterMeals = async (text: string) => {
    setList(
      (prevList) =>
        prevList?.filter((meal) =>
          meal.strMeal.toLowerCase().includes(text.toLowerCase())
        ) || null
    );
  };

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
          onChangeText={handleTextChange}
        />

        <Button>
          <Text>Random Recipe</Text>
        </Button>
      </View>

      {/* Recipes Section */}
      <Text style={styles.sectionTitle}>Recipes</Text>
      {list && list.length > 0 ? (
        <FlatList
          data={list}
          keyExtractor={(item) => item.idMeal.toString()}
          renderItem={({ item }) => <Text>{item.strMeal}</Text>}
        />
      ) : (
        <Text style={styles.noRecipeText}>No Recipe searched...</Text>
      )}

      {/* Favorites Section  */}
      <RecipeCard />

      {/* History Section */}
      <HistoryElement />
    </View>
  );
}
