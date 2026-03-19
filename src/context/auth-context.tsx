import React, { createContext, useContext, useEffect, useMemo } from "react";

import { queryClient } from "@/lib/queryClient";
import supabase from "@/lib/db";
import { useUser } from "@/hooks/useUser";

// 1. Define the TypeScript interface
interface AuthContextType {
  user: any; // Ideally replace 'any' with your User type later
  loading: boolean;
  isLoggedIn: boolean;
}

// 2. Create the Context object
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    // Sync React Query cache with Supabase Auth events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    });

    return () => subscription.unsubscribe();
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      loading: isLoading,
      isLoggedIn: !!user,
    }),
    [user, isLoading],
  ); // Only recreate this object if user or isLoading changes

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useGlobalContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an AuthProvider");
  }
  return context;
};
