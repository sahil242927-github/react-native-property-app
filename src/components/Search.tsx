import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Image } from "expo-image";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  /**
   * When the component first loads, it checks the URL for a ?query=... parameter. If it exists, it sets that as the initial value of your search state. This ensures that if a user refreshes the page or shares a link, the search bar isn't empty.
   */
  const { query, filter } = useLocalSearchParams<{
    query?: string;
    filter?: string;
  }>();
  const [search, setSearch] = useState(query || filter || "");

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text); // 1. Update UI immediately
    debouncedSearch(text); // 2. Queue the URL update
  };

  console.log(query);

  return (
    <View className="flex flex-row w-full px-4 items-center justify-between rounded-lg bg-accent-100 border border-gray-200 py-2 mt-5">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image
          source={icons.search}
          style={{
            width: 20,
            height: 20,
          }}
        />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          className="text-sm text-black-300 ml-2 flex-"
        />
      </View>
      <TouchableOpacity>
        <Image
          source={icons.filter}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
