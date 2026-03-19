import { getCurrentUser } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: Infinity, // The user doesn't change often
  });
};
