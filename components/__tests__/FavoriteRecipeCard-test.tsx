import React from "react";
import renderer, { act } from "react-test-renderer";
import { TouchableOpacity, Text, Image } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FavoriteRecipeCard from "../RecipeCard/FavoriteRecipeCard";
import { Meal } from "@/types/data";
import { mockMeal1 } from "@/types/mock-data";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

jest.mock("@/hooks/useFavoritesProvider", () => ({
  useFavoritesContext: jest.fn(),
}));

describe("<FavoriteRecipeCard />", () => {
  const mockFavoritesContext =
    require("@/hooks/useFavoritesProvider").useFavoritesContext;

  const mockMeal = mockMeal1;

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
