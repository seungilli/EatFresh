import { Meal, RecipeCardProps } from "@/hooks/useFetchData";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
    elevation: 2,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: "bold",
  },
  heartIconContainer: {
    padding: 4,
  },
  heartIcon: {
    fontSize: 18,
  },
});

type FavoriteRecipeCardProps = {
  item: Meal;
};

export default function FavoriteRecipeCard({ item }: FavoriteRecipeCardProps) {
  const setItem = async (item: Meal) => {
    try {
      const existingFavorites = await AsyncStorage.getItem("favorite");
      let favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
      if (!Array.isArray(favorites)) {
        favorites = [];
      }
      favorites.push(item);
      await AsyncStorage.setItem("favorite", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error setting item:", error);
    }
  };

  return (
    <Card style={styles.card}>
      <Link href={`/details?recipeId=${item.idMeal}`}>
        <View style={styles.container}>
          {item.strMealThumb ? (
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
          ) : null}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{item.strMeal}</Text>
            <View style={styles.tagsContainer}>
              <Text style={styles.tag}>{item.strCategory}</Text>
              <Text style={styles.tag}>{item.strArea}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setItem(item)}
            style={styles.heartIconContainer}
          >
            <Ionicons name="heart-outline" size={20} color="grey" />
          </TouchableOpacity>
        </View>
      </Link>
    </Card>
  );
}
