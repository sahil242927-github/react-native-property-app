import { Text, View } from "react-native";

import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Property = () => {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <View>
        <Text>Property - {id}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Property;
