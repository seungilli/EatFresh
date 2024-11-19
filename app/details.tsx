import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ingredient, Meal } from "@/types/data";
import { Ionicons } from "@expo/vector-icons";
import { useFavoritesContext } from "@/hooks/useFavoritesProvider";

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  heartIcon: {
    fontSize: 24,
  },
  mealImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
  },
  ingredientText: {
    fontSize: 16,
  },
  measureText: {
    fontSize: 16,
  },
  instructionsText: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default function DetailsScreen() {
  const { recipeId } = useLocalSearchParams();
  const [item, setItem] = useState<Meal | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { favorites, addFavorite, removeFavorite } = useFavoritesContext();

  const handleFavorites = async (newItem: Meal) => {
    if (!favorites.find((t) => t.idMeal == newItem.idMeal)) {
      addFavorite(newItem);
    } else {
      removeFavorite(newItem.idMeal);
    }
  };

  const fetchMealDetail = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
      );
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        const mealData = data.meals[0];
        setItem(mealData);
        const ingredientList = [];

        for (let i = 1; i <= 20; i++) {
          const ingredient = mealData[`strIngredient${i}` as keyof Meal];
          const measure = mealData[`strMeasure${i}` as keyof Meal];

          if (ingredient && measure) {
            ingredientList.push({ ingredient, measure });
          }
        }

        setIngredients(ingredientList);
      }
    } catch (error) {
      console.error("Error fetching meal details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (recipeId) {
      fetchMealDetail(recipeId.toString());
    }
  }, [recipeId]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>No meal data found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{item.strMeal}</Text>
        <TouchableOpacity onPress={() => handleFavorites(item)}>
          {favorites.find((t) => t.idMeal == item.idMeal) ? (
            <Ionicons name="heart" size={20} color="pink" />
          ) : (
            <Ionicons name="heart-outline" size={20} color="grey" />
          )}
        </TouchableOpacity>
      </View>

      <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />

      {ingredients.length > 0 ? (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View>
            {ingredients.map((item, index) => (
              <View key={index.toString()} style={styles.ingredientRow}>
                <Text style={styles.ingredientText}>{item.ingredient}</Text>
                <Text style={styles.measureText}>{item.measure}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text style={styles.errorText}>No ingredients found.</Text>
      )}

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructionsText}>{item.strInstructions}</Text>
      </View>
    </ScrollView>
  );
}
