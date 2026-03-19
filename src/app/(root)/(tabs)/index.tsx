import { StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <View className="flex-1 items-center justify-center">
        <Text className="font-rubik text-2xl text-zinc-900">
          Welcome to ReState
        </Text>
        <Text className="text-sm text-zinc-500">
          4 Bedrooms • 3 Bathrooms • 2500 sqft
        </Text>
        <Text className="text-brand-primary mt-2">$450,000</Text>
        <Link href="/properties/1" className="my-2">
          Property Details*
        </Link>
        <Link href="/sign-in" className="my-2">
          Sign In
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
