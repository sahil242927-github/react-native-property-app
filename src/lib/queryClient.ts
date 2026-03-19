import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevents infinite refetching if the user is offline
      retry: false,
    },
  },
});
