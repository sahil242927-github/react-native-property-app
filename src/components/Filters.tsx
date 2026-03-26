import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

import { categories } from "@/constants/data";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string; query?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || params.query || "All",
  );

  const handleSelectedCategory = (category: string) => {
    // 1. Determine the new category
    const newCategory = selectedCategory === category ? "All" : category;

    // 2. Update Local State for immediate UI feedback
    setSelectedCategory(newCategory);

    // 3. Update Router Params in a single batch
    // We clear the query AND set the new filter simultaneously
    router.setParams({
      query: "",
      filter: newCategory === "All" ? "" : newCategory,
    });

    console.log(`Switched to: ${newCategory}`);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories?.map(({ category, title }) => (
        <TouchableOpacity
          onPress={() => handleSelectedCategory(category)}
          key={title}
          className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${category === selectedCategory ? "bg-primary-300" : "bg-primary-100 border border-primary-200"}`}
        >
          <Text
            className={`text-sm font-rubik-medium ${category === selectedCategory ? "text-white" : "text-primary-300"}`}
          >
            {title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
