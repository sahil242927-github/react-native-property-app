import {
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { loginWithGoogle } from "@/services/auth"; // Updated to use @/ alias
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

const { height } = Dimensions.get("window");

const SignIn = () => {
  const queryClient = useQueryClient();

  const handleSignIn = async () => {
    try {
      const success = await loginWithGoogle();

      if (success) {
        console.log("Login successful");

        // Refresh the user data in the cache immediately
        await queryClient.invalidateQueries({ queryKey: ["user"] });

        // Navigate to the main application
        router.replace("/");
      }
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.message || "An error occurred during sign in.",
      );
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={true}>
        <View className="flex-1">
          <Image
            source={images.onboarding}
            contentFit="cover"
            className="w-full rounded-xl"
            style={{ height: height * 0.6 }}
            transition={500}
          />

          <View className="px-10 mt-5">
            <Text className="text-center font-rubik-semibold text-primary-300 uppercase">
              Welcome to Real Estate
            </Text>

            <Text className="text-center font-rubik-bold text-3xl text-black-300 mt-2">
              Let's Get You Closer to {"\n"}
              <Text className="text-primary-300">Your Ideal Home</Text>
            </Text>

            <Text className="text-lg font-rubik text-black-200 text-center mt-12">
              Login to Real Estate with Google
            </Text>

            <TouchableOpacity
              onPress={handleSignIn}
              className="bg-white rounded-full w-full py-4 my-2 flex-row items-center justify-center shadow-zinc-300 shadow-sm shadow-opacity-20 elevation-3"
            >
              <Image
                source={icons.google}
                className="w-5 h-5"
                contentFit="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
