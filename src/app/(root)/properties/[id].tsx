import { Image, ImageBackground } from "expo-image";
import { Text, View } from "react-native";

import icons from "@/constants/icons";
import { usePropertyDetails } from "@/hooks/useProperties";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const PropertyDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: propertyDetails } = usePropertyDetails(Number(id));
  const {
    image,
    address,
    rating,
    bathroo
    bedrooms,
    area,
    type,
    agents,
    description,
  } = propertyDetails || {};
  return (
    <SafeAreaView>
      <View className="w-full h-96">
        <ImageBackground
          source={image}
          contentFit="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <View className="p-5 gap-4 flex">
        <Text className="font-rubik-bold text-2xl">{address}</Text>
        <View className="flex flex-row gap-4 items-center">
          <Text className="font-rubik-medium text-xl text-primary-300">
            {type}
          </Text>
          <Image
            source={icons.star}
            style={{
              width: 20,
              height: 20,
            }}
          />
          <Text>{rating}</Text>
        </View>
        <View className="flex items-center flex-row justify-between mt-4 pr-10">
          <View className="flex flex-row gap-3 items-center">
            <Image
              source={icons.bath}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text className="font-semibold text-base">{bedrooms}</Text>
          </View>
          <View className="flex flex-row gap-3 items-center">
            <Image
              source={icons.bath}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text className="font-semibold text-base">{bathrooms}</Text>
          </View>
          <View className="flex flex-row gap-3 items-center">
            <Image
              source={icons.area}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text className="font-semibold text-base">{area} sqft</Text>
          </View>
        </View>
        <View className="flex flex-row gap-4 mt-5">
          <View>
            <Text>{agents?.name}</Text>
            <Image
              source={agents?.avatar}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </View>
        </View>
        <View className="flex gap-2">
          <Text className="text-lg font-semibold">Overview</Text>
          <Text>{description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PropertyDetails;
