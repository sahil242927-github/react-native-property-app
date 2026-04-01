import {
  FetchPropertiesParams,
  getFeaturedProperties,
  getProperties,
  getPropertyById,
} from "@/services/supabase";

import { useQuery } from "@tanstack/react-query";

// Hook for the full list
export const useProperties = (params: FetchPropertiesParams) => {
  return useQuery({
    // Include params in the key so the cache is unique to the search/filter
    queryKey: ["properties", params.filter, params.query, params.limit],
    queryFn: () => getProperties(params),
    // Keep the previous data visible while fetching new data (better UX)
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for a single property
export const usePropertyDetails = (id: number) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id),
    enabled: !!id, // Only run if ID exists
  });
};

export const useFeaturedProperties = () => {
  return useQuery({
    queryKey: ["properties", "featured"],
    queryFn: getFeaturedProperties,
    staleTime: 1000 * 60 * 10, // Featured properties change less often (10 mins)
  });
};
