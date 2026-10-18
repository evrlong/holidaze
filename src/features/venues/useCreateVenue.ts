import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVenues } from "./api";
import type { VenueInput } from "./types";

export function useCreateVenue(token: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: VenueInput) => {
      if (!token) throw new Error("No access token provided");
      return createVenues(input, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venues"] });
    },
  });
}
