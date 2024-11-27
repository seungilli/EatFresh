import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { FavoritesProvider } from "@/hooks/useFavoritesProvider";
import { HistoryProvider } from "@/hooks/useHistoryProvider";
import LeafIcon from "@/assets/icons/LeafIcon";
import { Colors } from "@/constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <FavoritesProvider>
        <HistoryProvider>
          <Stack>
            <Stack.Screen
              name="details"
              options={() => ({
                headerRight: () => <LeafIcon width={50} height={50} />,
                title: "EatFresh",
                headerTitleStyle: {
                  color: Colors.light.header,
                  fontWeight: "bold",
                },
              })}
            />
            <Stack.Screen name="+not-found" />
            <Stack.Screen
              name="index"
              options={() => ({
                headerRight: () => <LeafIcon width={50} height={50} />,
                title: "EatFresh",
                headerTitleStyle: {
                  color: Colors.light.header,
                  fontWeight: "bold",
                },
              })}
            />
          </Stack>
          <StatusBar style="auto" />
        </HistoryProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
