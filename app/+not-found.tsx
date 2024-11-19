import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import WarningIcon from "@/assets/icons/WarningIcon ";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <WarningIcon width={100} height={100} />
        <ThemedText type="title" style={styles.title}>
          Oops! We couldn't load the recipe details right now.
        </ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          Please give it a moment and refresh, or come back later.
        </ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff", // Optional background color
  },
  title: {
    fontSize: 18,
    color: "#607e46",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#607e46",
    textAlign: "center",
    marginTop: 10,
  },
  link: {
    marginTop: 20,
    paddingVertical: 15,
  },
});
