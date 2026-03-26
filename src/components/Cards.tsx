import { Text, TouchableOpacity, View } from "react-native";

import icons from "@/constants/icons";
import images from "@/constants/images";
import { Property } from "@/services/supabase";
import { Image } from "expo-image";
import React from "react";

interface Props {
  onPress?: (id: number) => void;
  property: Property;
}

export const FeaturedCard = ({ onPress, property }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex items-start w-60 h-80 relative"
    >
      <Image
        source={property.image}
        contentFit="cover"
        style={{
          width: 205,
          height: 280,
          borderRadius: 10,
        }}
      />
      <Image
        source={images.cardGradient}
        style={{
          width: 205,
          height: 280,
          borderRadius: 10,
          position: "absolute",
          inset: 0,
        }}
      />
      <View className="flex flex-row items-center justify-center bg-white/90 px-3 py-1.5 gap-1 rounded-full absolute top-5 right-5">
        <Image
          source={icons.star}
          style={{
            width: 16,
            height: 16,
          }}
        />
        <Text className="text-xs font-semibold font-rubik-semibold">
          {property.rating}
        </Text>
      </View>
      <View className="flex items-start absolute bottom-5 inset-x-5">
        <Text className="font-rubik-bold text-white">Modern Apartment</Text>
        <Text className="font-rubik-medium text-white/80">
          {property.address}
        </Text>
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white">
            ${property.price}
          </Text>
          <Image
            source={icons.heart}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ onPress, property }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 flex w-full flex-col mt-4 px-3 py-3 pb-4 rounded-2xl bg-white shadow-lg shadow-black-100/70 items-start relative"
    >
      {/* Image Container */}
      <View className="relative w-full h-40">
        <Image
          source={property.image}
          className="w-full h-full rounded-xl"
          contentFit="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
          }}
        />

        {/* Rating Badge */}
        <View className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex-row items-center gap-1">
          <Image
            source={icons.star}
            style={{
              width: 12,
              height: 12,
            }}
          />
          <Text className="text-xs font-rubik-bold text-primary-300">
            {property.rating}
          </Text>
        </View>
      </View>

      {/* Content Section */}
      <View className="flex flex-col mt-2 w-full">
        <Text
          className="text-base font-rubik-bold text-black-300"
          numberOfLines={1}
        >
          {property.type}
        </Text>
        <Text className="text-xs font-rubik text-black-100" numberOfLines={1}>
          {property.address}
        </Text>

        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">
            ${property.price}
          </Text>
          <Image
            source={icons.heart}
            tintColor="#191D31"
            style={{
              width: 20,
              height: 20,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
