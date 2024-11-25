import React from "react";
import renderer, { act } from "react-test-renderer";
import { TouchableOpacity, Text, Image } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FavoriteRecipeCard from "../RecipeCard/FavoriteRecipeCard";
import { Meal } from "@/types/data";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

jest.mock("@/hooks/useFavoritesProvider", () => ({
  useFavoritesContext: jest.fn(),
}));

describe("<FavoriteRecipeCard />", () => {
  const mockFavoritesContext =
    require("@/hooks/useFavoritesProvider").useFavoritesContext;

  const mockMeal: Meal = {
    idMeal: "12345",
    strMeal: "Test Meal",
    strMealThumb: "https://via.placeholder.com/100",
    strCategory: "Test Category",
    strArea: "Test Area",
    strDrinkAlternate: null,
    strInstructions: "Test instructions",
    strTags: "Test tags",
    strYoutube: "Test Video",
    strIngredient1: "Ingredient1",
    strIngredient2: "Ingredient2",
    strIngredient3: "Ingredient3",
    strIngredient4: "Ingredient4",
    strIngredient5: "Ingredient5",
    strIngredient6: "Ingredient6",
    strIngredient7: "Ingredient7",
    strIngredient8: "Ingredient8",
    strIngredient9: "Ingredient9",
    strIngredient10: "Ingredient10",
    strIngredient11: "Ingredient11",
    strIngredient12: "Ingredient12",
    strIngredient13: "Ingredient13",
    strIngredient14: "Ingredient14",
    strIngredient15: "Ingredient15",
    strIngredient16: "Ingredient16",
    strIngredient17: "Ingredient17",
    strIngredient18: "Ingredient18",
    strIngredient19: "Ingredient19",
    strIngredient20: "Ingredient20",
    strMeasure1: "1 cup",
    strMeasure2: "2 tbsp",
    strMeasure3: "3 tsp",
    strMeasure4: "4 oz",
    strMeasure5: "5 grams",
    strMeasure6: "6 ml",
    strMeasure7: "7 slices",
    strMeasure8: "8 pieces",
    strMeasure9: "9 cups",
    strMeasure10: "10 tbsp",
    strMeasure11: "11 tsp",
    strMeasure12: "12 oz",
    strMeasure13: "13 grams",
    strMeasure14: "14 ml",
    strMeasure15: "15 slices",
    strMeasure16: "16 pieces",
    strMeasure17: "17 cups",
    strMeasure18: "18 tbsp",
    strMeasure19: "19 tsp",
    strMeasure20: "20 oz",
    strSource: "Test Source",
    strImageSource: "Test Image Source",
    strCreativeCommonsConfirmed: "Yes",
    dateModified: "2023-01-01",
  };

  const mockAddFavorite = jest.fn();
  const mockRemoveFavorite = jest.fn();

  beforeEach(() => {
    mockFavoritesContext.mockReturnValue({
      favorites: [],
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    const tree = renderer.create(<FavoriteRecipeCard item={mockMeal} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should render the meal image and title", () => {
    const component = renderer.create(<FavoriteRecipeCard item={mockMeal} />);
    const root = component.root;

    const image = root.findByType(Image);
    expect(image.props.source.uri).toBe(mockMeal.strMealThumb);

    const textNodes = root.findAllByType(Text);
    const titleNode = textNodes.find(
      (node) => node.props.children === mockMeal.strMeal
    );

    expect(titleNode).toBeDefined();
    expect(titleNode?.props.children).toBe(mockMeal.strMeal);
  });

  it("should render category and area tags", () => {
    const component = renderer.create(<FavoriteRecipeCard item={mockMeal} />);
    const root = component.root;

    const textNodes = root.findAllByType(Text);

    const categoryNode = textNodes.find(
      (node) => node.props.children === mockMeal.strCategory
    );
    const areaNode = textNodes.find(
      (node) => node.props.children === mockMeal.strArea
    );

    expect(categoryNode).toBeDefined();
    expect(categoryNode?.props.children).toBe(mockMeal.strCategory);

    expect(areaNode).toBeDefined();
    expect(areaNode?.props.children).toBe(mockMeal.strArea);
  });

  it("should navigate to the details page when clicked", () => {
    const component = renderer.create(<FavoriteRecipeCard item={mockMeal} />);
    const root = component.root;

    const link = root.findByType(Link);
    expect(link.props.href).toBe(`/details?recipeId=${mockMeal.idMeal}`);
  });

  it("should display an outline heart icon when not in favorites", () => {
    const component = renderer.create(<FavoriteRecipeCard item={mockMeal} />);
    const root = component.root;

    const heartIcon = root.findByType(Ionicons);
    expect(heartIcon.props.name).toBe("heart-outline");
  });

  it("should display a filled heart icon when in favorites", () => {
    mockFavoritesContext.mockReturnValue({
      favorites: [mockMeal],
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    });

    const component = renderer.create(<FavoriteRecipeCard item={mockMeal} />);
    const root = component.root;

    const heartIcon = root.findByType(Ionicons);
    expect(heartIcon.props.name).toBe("heart");
  });

  it("should call addFavorite when heart icon is pressed", () => {
    const component = renderer.create(<FavoriteRecipeCard item={mockMeal} />);
    const root = component.root;

    const heartButton = root.findByType(TouchableOpacity);

    act(() => {
      heartButton.props.onPress();
    });

    expect(mockAddFavorite).toHaveBeenCalledWith(mockMeal);
    expect(mockRemoveFavorite).not.toHaveBeenCalled();
  });

  it("should call removeFavorite when heart icon is pressed", () => {
    mockFavoritesContext.mockReturnValue({
      favorites: [mockMeal],
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    });

    const component = renderer.create(<FavoriteRecipeCard item={mockMeal} />);
    const root = component.root;

    const heartButton = root.findByType(TouchableOpacity);

    act(() => {
      heartButton.props.onPress();
    });

    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockMeal.idMeal);
    expect(mockAddFavorite).not.toHaveBeenCalled();
  });
});
