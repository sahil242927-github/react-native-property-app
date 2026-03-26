/* 
Step 1: SQL Schema (The "Collections")
Run this in your Supabase SQL Editor first. This creates the tables and handles the relationships (agent, reviews, gallery) shown in your image.

-- 1. Agents Table (Matches your image exactly)
CREATE TABLE IF NOT EXISTS agents (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamptz DEFAULT now(),
  name text,
  email text,
  phone text,
  avatar text
);

-- 2. Properties Table (Using bigint for the foreign key)
CREATE TABLE IF NOT EXISTS properties (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamptz DEFAULT now(),
  name text,
  type text,
  description text,
  address text,
  geolocation text,
  price bigint,
  area bigint,
  bedrooms int,
  bathrooms int,
  rating numeric,
  facilities text[],
  image text,
  agent_id bigint REFERENCES agents(id) ON DELETE SET NULL
);

-- 3. Galleries Table
CREATE TABLE IF NOT EXISTS galleries (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  property_id bigint REFERENCES properties(id) ON DELETE CASCADE,
  image_url text
);

-- 4. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  property_id bigint REFERENCES properties(id) ON DELETE CASCADE,
  user_name text,
  avatar text,
  rating int,
  review_text text
);
*/

import supabase from "@/lib/db";

// High-quality architectural imagery from Unsplash

// Move these outside the function to keep the logic clean
const propertyTypes = ["House", "Apartment", "Villa", "Studio", "Condo"];
const facilitiesList = [
  "Laundry",
  "Car Parking",
  "Sports Center",
  "Free Wifi",
  "Swimming Pool",
  "Gym",
  "Pet Friendly",
];
const architecturalPhotos = [
  "1512917774080-9991f1c4c750",
  "1600585154340-be6199f7789a",
  "1600596542815-ffad4c1539a9",
  "1600607687920-4e2a09cf159d",
  "1564013799919-ab600027ffc6",
];

export const seedPropertyData = async () => {
  try {
    console.log("🔍 Checking for existing data...");

    // Check count first
    const { count, error: countErr } = await supabase
      .from("properties")
      .select("*", { count: "exact", head: true });

    if (countErr) throw countErr;

    // 1. Destructive Sync: Delete children first, then parents
    if (count && count > 0) {
      console.log(`🧹 Clearing ${count} existing records...`);
      // Delete in reverse order of foreign keys
      await supabase.from("reviews").delete().neq("id", 0);
      await supabase.from("properties").delete().neq("id", 0);
      await supabase.from("agents").delete().neq("id", 0);
    }

    // 2. Seed Agents using .upsert()
    // Using 'email' as the conflict target to ensure we don't duplicate Mohd Sahil
    const { data: agents, error: agentError } = await supabase
      .from("agents")
      .upsert(
        [
          {
            name: "Mohd Sahil",
            email: "sahil@kashrid.com",
            phone: "+123456789",
            avatar: "https://i.pravatar.cc/150?u=sahil",
          },
          {
            name: "Jane Agent",
            email: "jane@kashrid.com",
            phone: "+987654321",
            avatar: "https://i.pravatar.cc/150?u=jane",
          },
        ],
        { onConflict: "email" },
      )
      .select();

    if (agentError) throw agentError;
    if (!agents || agents.length === 0)
      throw new Error("Failed to retrieve seeded agents.");

    // 3. Seed Properties with all fields
    const totalToSeed = 12;
    for (let i = 1; i <= totalToSeed; i++) {
      const type = propertyTypes[i % propertyTypes.length];
      const photoId = architecturalPhotos[i % architecturalPhotos.length];

      const { data: property, error: propError } = await supabase
        .from("properties")
        .insert({
          name: `${type} ${i} in Central Park`,
          type: type,
          description: `A stunning ${type} featuring modern amenities. Perfect for your next move with Kashrid Nexus.`,
          address: `${Math.floor(Math.random() * 999)} Luxury Lane, NY`,
          geolocation: `${(Math.random() * 180 - 90).toFixed(4)}, ${(Math.random() * 360 - 180).toFixed(4)}`,
          price: Math.floor(Math.random() * 8000) + 1200,
          area: Math.floor(Math.random() * 2500) + 400,
          bedrooms: Math.floor(Math.random() * 5) + 1,
          bathrooms: Math.floor(Math.random() * 4) + 1,
          rating: Number.parseFloat((Math.random() * 2 + 3).toFixed(1)),
          facilities: [...facilitiesList]
            .sort(() => 0.5 - Math.random())
            .slice(0, 3),
          // Replace your current image line with this:
          image: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&q=80&sig=${Math.random()}`,
          agent_id: agents[i % agents.length].id, // Safely handle agent selection
        })
        .select()
        .single();

      if (propError) throw propError;

      // 4. Seed associated Review
      await supabase.from("reviews").insert({
        property_id: property.id,
        user_name: `Reviewer_${i}`,
        rating: 5,
        review_text:
          "Highly professional service and a great property structure!",
      });

      console.log(`✅ Seeding property ${i} of ${totalToSeed}...`);
    }

    console.log("🏁 Database refreshed with all fields and reliable images!");
  } catch (error: any) {
    console.error("❌ seedPropertyData failed:", error.message || error);
  }
};
