import { Redirect, Slot } from "expo-router";

import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/auth-context";

export default function RootLayout() {
  const { loading, isLoggedIn } = useGlobalContext();

  // 1. While checking the session, show a beautiful loading indicator
  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );
  }

  // 2. If the check is done and user is NOT logged in, kick them to Sign-In
  if (!isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  // 3. If logged in, render the child routes (the Tabs)
  return <Slot />;
}
