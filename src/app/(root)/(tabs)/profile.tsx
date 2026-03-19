import {
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { logout } from "@/services/auth";
import { settings } from "@/constants/data";
import { useUser } from "@/hooks/useUser";

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row justify-between items-center py-4"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>
    {showArrow && (
      <Image
        source={icons.rightArrow}
        style={{
          width: 20,
          height: 20,
        }}
      />
    )}
  </TouchableOpacity>
);

const Profile = () => {
  const { data: user } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        {/* Header Section */}
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-6" />
        </View>

        {/* Avatar & User Info Section */}
        <View className="flex flex-col items-center mt-8">
          <View className="relative">
            <Image
              source={user?.user_metadata?.avatar_url}
              contentFit="cover"
              style={{ width: 120, height: 120, borderRadius: 100 }}
            />
            <TouchableOpacity className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md">
              <Image
                source={icons.edit}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </TouchableOpacity>
          </View>

          <Text className="text-2xl font-rubik-bold mt-4">
            {user?.user_metadata?.name || "Mohd Sahil"}
          </Text>
        </View>

        {/* Action Links Section */}
        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        {/* Dynamic Settings List */}
        <View className="flex flex-col mt-5 border-t border-primary-200 pt-5">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={item.title + index} {...item} />
          ))}
        </View>

        {/* Danger Zone */}
        <View className="flex flex-col mt-5 border-t border-primary-200 pt-5">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
