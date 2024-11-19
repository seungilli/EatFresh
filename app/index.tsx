import HistoryElement from "@/components/HistoryElement/HistoryItem";
import { HistoryType, Meal } from "@/types/data";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import SearchRecipeCard from "@/components/RecipeCard/SearchRecipeCard";
import FavoriteRecipeCard from "@/components/RecipeCard/FavoriteRecipeCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFavorites from "@/hooks/useFavorites";
import { useFavoritesContext } from "@/hooks/useFavoritesProvider";
import { useHistoryContext } from "@/hooks/useHistoryProvider";
import HistoryList from "@/components/HistoryElement/HistoryList";

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

  const [randomMeal, setRandomMeal] = useState<Meal | null>(null);

  const { favorites, refreshFavorites } = useFavoritesContext();

  const { addHistoryItem } = useHistoryContext();

  const handleSubmit = async () => {
    setRandomMeal(null);
    const newHistoryItem: HistoryType = {
      searchedText: searchText,
      time: new Date().toString(),
    };
    addHistoryItem(newHistoryItem);
    if (searchText) {
      const meals = await fetchAllMeals(searchText.charAt(0));
      if (meals) {
        filterMeals(meals, searchText);
      }
    } else {
      setList(null);
    }
  };
  const handleTextChange = async (text: string) => {
    setSearchText(text);
  };

  const fetchAllMeals = async (letter: string) => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?f=" + letter
      );
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error("Error fetching meals:", error);
      return [];
    }
  };

  const fetchRandomMeal = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      return data.meals[0];
    } catch (error) {
      console.error("Error fetching random meal:", error);
    }
  };

  const getRandomMeal = async () => {
    setList(null);
    const data = await fetchRandomMeal();
    if (data) {
      setRandomMeal(data);
    }
  };

  const filterMeals = (meals: Meal[], text: string) => {
    const filteredMeals = meals.filter((meal) =>
      meal.strMeal.toLowerCase().startsWith(text.toLowerCase())
    );
    setList(filteredMeals);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a recipe..."
          placeholderTextColor="gray"
          onChangeText={handleTextChange}
          onSubmitEditing={handleSubmit}
        />
        <Button onPress={getRandomMeal}>
          <Text>Random Recipe</Text>
        </Button>
      </View>
      <Text style={styles.sectionTitle}>Recipes</Text>
      {list && list.length > 0 ? (
        <FlatList
          data={list}
          keyExtractor={(item) => item.idMeal.toString()}
          renderItem={({ item }) => <SearchRecipeCard item={item} />}
        />
      ) : randomMeal ? (
        <View>
          <SearchRecipeCard item={randomMeal} />
        </View>
      ) : (
        <Text style={styles.noRecipeText}>No Recipe searched...</Text>
      )}
      <Text style={styles.sectionTitle}>Favorites</Text>
      {favorites ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.idMeal.toString()}
          renderItem={({ item }) => <FavoriteRecipeCard item={item} />}
        />
      ) : null}
      <HistoryList />
    </View>
  );
}
