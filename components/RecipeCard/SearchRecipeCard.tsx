import { Ionicons } from "@expo/vector-icons";
import { Meal } from "@/types/data";
import { Link } from "expo-router";
import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { useFavoritesContext } from "@/hooks/useFavoritesProvider";
import { Colors } from "@/constants/Colors";

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
    width: 50,
    height: 50,
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
    backgroundColor: Colors.light.tag,
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

type SearchRecipeCardProps = {
  item: Meal;
};

export default function SearchRecipeCard({ item }: SearchRecipeCardProps) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesContext();

  const handleFavorites = async (newItem: Meal) => {
    if (!favorites.find((t) => t.idMeal == newItem.idMeal)) {
      addFavorite(newItem);
    } else {
      removeFavorite(newItem.idMeal);
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
            onPress={() => handleFavorites(item)}
            style={styles.heartIconContainer}
          >
            {favorites.find((t) => t.idMeal == item.idMeal) ? (
              <Ionicons name="heart" size={30} color={Colors.light.favorite} />
            ) : (
              <Ionicons
                name="heart-outline"
                size={30}
                color={Colors.light.notFavorite}
              />
            )}
          </TouchableOpacity>
        </View>
      </Link>
    </Card>
  );
}
