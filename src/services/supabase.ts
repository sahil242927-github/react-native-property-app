import supabase from "@/lib/db";

export interface Property {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  rating: number;
  address: string;
  agent_id: number;
}

export interface FetchPropertiesParams {
  filter?: string; // e.g., "Apartment"
  query?: string; // e.g., "New York"
  limit?: number;
}

export const getProperties = async ({
  filter,
  query,
  limit,
}: FetchPropertiesParams): Promise<Property[]> => {
  // Start the base query
  let supabaseQuery = supabase
    .from("properties")
    .select("*, agents(*)")
    .order("created_at", { ascending: false });

  // 1. Apply Category Filter (e.g., "All", "House", "Apartment")
  if (filter && filter !== "All") {
    supabaseQuery = supabaseQuery.eq("type", filter);
  }

  // 2. Apply Search Query (Searching across Name or Address)
  if (query) {
    // .ilike makes it case-insensitive search
    supabaseQuery = supabaseQuery.or(
      `name.ilike.%${query}%,address.ilike.%${query}%`,
    );
  }

  // 3. Apply Limit
  if (limit) {
    supabaseQuery = supabaseQuery.limit(limit);
  }

  const { data, error } = await supabaseQuery;

  if (error) {
    console.error("Supabase Fetch Error:", error.message);
    throw new Error(error.message);
  }

  return data as Property[];
};

export const getPropertyById = async (id: string): Promise<Property> => {
  const { data, error } = await supabase
    .from("properties")
    .select("*, agents(*)") // Joins the agent data automatically
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data as Property;
};

/**
 * Fetches only the latest 5 properties for the Featured section.
 */
export const getFeaturedProperties = async (): Promise<Property[]> => {
  const { data, error } = await supabase
    .from("properties")
    .select("*, agents(*)")
    .order("created_at", { ascending: false }) // Get newest first
    .limit(5); // Restrict to top 5

  if (error) {
    console.error("Featured Fetch Error:", error.message);
    throw new Error(error.message);
  }

  return data as Property[];
};
