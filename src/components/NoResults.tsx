import { Text, View } from "react-native";

import images from "@/constants/images";
import { Image } from "expo-image";
import React from "react";

const NoResults = () => {
  return (
    <View className="flex items-center gap-5 my-10">
      <Image
        source={images.noResult}
        style={{
          width: 200,
          height: 200,
        }}
        contentFit="cover"
      />
      <Text>We could not find any results</Text>
    </View>
  );
};

export default NoResults;
