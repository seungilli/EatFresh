import { HistoryType, Meal } from "@/types/data";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import SearchRecipeCard from "@/components/RecipeCard/SearchRecipeCard";
import FavoriteRecipeCard from "@/components/RecipeCard/FavoriteRecipeCard";
import { useFavoritesContext } from "@/hooks/useFavoritesProvider";
import { useHistoryContext } from "@/hooks/useHistoryProvider";
import HistoryList from "@/components/HistoryElement/HistoryList";

import { Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";
const windowWidth = Dimensions.get("window").width;
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
  },
  randomContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth,
  },
  noIdeaText: {
    marginRight: 100,
  },
  searchInput: {
    flex: 1,
    height: 40,
    width: windowWidth,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sectionTitle: {
    color: Colors.light.header,
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  noRecipeText: {
    marginBottom: 20,
  },
  button: {
    marginTop: 5,
    backgroundColor: Colors.light.tint,
    width: 125,
    height: 25,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    elevation: 1,
  },
  buttonText: {
    fontSize: 12,
  },
  historyArrangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth,
  },
  historyButton: {
    marginLeft: 260,
    marginTop: 5,
    backgroundColor: Colors.light.tint,
    width: 50,
    height: 25,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 1,
  },
  historyButtonText: {
    fontSize: 12,
  },
  historyContainer: {
    height: 200,
  },
});

export default function HomeScreen() {
  const [list, setList] = useState<Meal[] | null>(null);

  const { history, clearHistory, addHistoryItem } = useHistoryContext();

  const [searchText, setSearchText] = useState("");

  const [randomMeal, setRandomMeal] = useState<Meal | null>(null);

  const { favorites } = useFavoritesContext();

  const handleSubmit = async () => {
    setRandomMeal(null);

    if (searchText) {
      const newHistoryItem: HistoryType = {
        searchedText: searchText,
        time:
          new Date().toLocaleDateString() +
          " " +
          new Date().toLocaleTimeString(),
      };
      addHistoryItem(newHistoryItem);
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
    setSearchText("");
    const data = await fetchRandomMeal();
    if (data) {
      setRandomMeal(data);
    }
  };

  const filterMeals = (meals: Meal[], text: string) => {
    const filteredMeals = meals.filter((meal) =>
      meal.strMeal.toLowerCase().startsWith(text.toLowerCase())
    );

    const sortedMeals = filteredMeals.sort((a, b) => {
      const isAFavorite = favorites.some((fav) => fav.idMeal === a.idMeal);
      const isBFavorite = favorites.some((fav) => fav.idMeal === b.idMeal);

      if (isAFavorite && !isBFavorite) return -1;
      if (!isAFavorite && isBFavorite) return 1;
      return 0;
    });

    setList(sortedMeals);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a recipe..."
          placeholderTextColor={Colors.light.tint}
          onChangeText={handleTextChange}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.randomContainer}>
        <Text style={styles.noIdeaText}>No idea what to cook?</Text>
        <TouchableOpacity style={styles.button} onPress={getRandomMeal}>
          <Text style={styles.buttonText}>Random Recipe</Text>
        </TouchableOpacity>
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
      ) : searchText && list?.length == 0 ? (
        <Text style={styles.noRecipeText}>No Recipe found</Text>
      ) : (
        <Text style={styles.noRecipeText}>No Recipe searched...</Text>
      )}
      <Text style={styles.sectionTitle}>Favorites</Text>
      {favorites && favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.idMeal.toString()}
          renderItem={({ item }) => <FavoriteRecipeCard item={item} />}
        />
      ) : (
        <Text style={styles.noRecipeText}>No Favorites yet</Text>
      )}
      <View style={styles.historyContainer}>
        <View style={styles.historyArrangeContainer}>
          <Text style={styles.sectionTitle}>History</Text>
          <TouchableOpacity style={styles.historyButton} onPress={clearHistory}>
            <Text style={styles.historyButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
        {history && history.length > 0 ? (
          <HistoryList />
        ) : (
          <Text style={styles.noRecipeText}>No Search History yet</Text>
        )}
      </View>
    </View>
  );
}
