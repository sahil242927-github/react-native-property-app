import { Card, FeaturedCard } from "@/components/Cards";
import { useFeaturedProperties, useProperties } from "@/hooks/useProperties"; // Ensure both are imported
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useUser } from "@/hooks/useUser";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { data: user } = useUser();
  const params = useLocalSearchParams<{ filter?: string; query?: string }>();

  console.log("params.filter = ", params.filter);

  // 1. Fetch Main Recommendations
  const { data: properties, isLoading } = useProperties({
    filter: params.filter || "All",
    query: params.query || "",
    limit: 6,
  });

  // 2. Fetch Featured Section
  const { data: featuredProperty, isLoading: isFeaturedLoading } =
    useFeaturedProperties();

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
            <View className="flex flex-row items-start justify-between mt-5">
              <View className="flex gap-2 flex-row items-center">
                <Image
                  source={user?.user_metadata?.avatar_url}
                  style={{ width: 44, height: 44, borderRadius: 22 }}
                />
                <View>
                  <Text className="text-xs text-zinc-500 font-rubik">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.user_metadata?.name || "Mohd Sahil"}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} style={{ width: 24, height: 24 }} />
            </View>

            <Search />

            {/* Featured Section */}
            <View className="flex flex-row items-center justify-between mt-5">
              <Text className="text-xl font-rubik-bold text-black-300">
                Featured
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal
              data={featuredProperty}
              renderItem={({ item }) => (
                <FeaturedCard
                  property={item}
                  onPress={() => handleCardPress(item.id)}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex gap-5 mt-5"
              ListEmptyComponent={
                isFeaturedLoading ? (
                  <ActivityIndicator
                    size="large"
                    className="text-primary-300 mt-5 flex-1 flex justify-center"
                  />
                ) : (
                  <NoResults />
                )
              }
            />

            {/* Recommendations Header & Filter */}
            <View className="flex flex-row items-center justify-between mt-5">
              <Text className="text-xl font-rubik-bold text-black-300">
                Our Recommendation
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <Filters />

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
