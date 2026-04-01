import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useProperties } from "@/hooks/useProperties"; // Ensure both are imported
import { useUser } from "@/hooks/useUser";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
  const { data: user } = useUser();
  const params = useLocalSearchParams<{ filter?: string; query?: string }>();

  console.log("params.filter = ", params.filter);

  // 1. Fetch Main Recommendations
  const { data: properties, isLoading } = useProperties({
    filter: params.filter || "All",
    query: params.query || "",
    limit: 12,
  });

  const handleCardPress = (id: number) => {
    router.push(`/properties/${id}`);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties} // This is the Main Recommendation List
        renderItem={({ item }) => (
          <Card property={item} onPress={() => handleCardPress(item.id)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            {/* Header / User Info */}
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-primary-200 rounded-full size-11 items-center justify-center flex flex-row"
              >
                <Image
                  source={icons.backArrow}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </TouchableOpacity>
              <Text className="text-base font-semibold">
                Search for your ideal home
              </Text>
              <Image source={icons.bell} style={{ width: 24, height: 24 }} />
            </View>

            <View className="mb-5">
              <Search />
            </View>

            {/* Recommendations Header & Filter */}

            <Filters />
            <Text className="text-xl text-black-300 mt-2">
              Found {properties?.length} properties
            </Text>

            {/* <Button
              title="Seed Property data"
              onPress={seedPropertyData}
              color="#0061ff"
            /> */}
          </View>
        }
      />
    </SafeAreaView>
  );
}
