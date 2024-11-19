import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import WarningIcon from "@/assets/icons/WarningIcon ";
import LeafIcon from "@/assets/icons/leaf_icon";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: Colors.light.header,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  link: {
    marginTop: 20,
    paddingVertical: 15,
  },
});

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "EatFresh",
          headerTitleStyle: {
            color: Colors.light.header,
            fontWeight: "bold",
          },
          headerRight: () => <LeafIcon width={50} height={50} />,
        }}
      />
      <ThemedView style={styles.container}>
        <WarningIcon width={250} height={250} />
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
