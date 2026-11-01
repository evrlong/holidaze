import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVenue, deleteVenue } from "./api";
import type { VenueInput } from "./types";

export function useUpdateVenue(token: string | null, username: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: VenueInput }) => {
      if (!token) throw new Error("No access token provided");
      return updateVenue(id, input, token);
    },
    onSuccess: (venue) => {
      queryClient.invalidateQueries({ queryKey: ["venues"] });
      queryClient.invalidateQueries({
        queryKey: ["profile", username, "venues"],
      });
      queryClient.setQueryData(["venues", venue.id], venue);
    },
  });
}

export function useDeleteVenue(token: string | null, username: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      if (!token) throw new Error("No access token provided");
      return deleteVenue(id, token);
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["venues"] });
      queryClient.invalidateQueries({
        queryKey: ["profile", username, "venues"],
      });
      queryClient.removeQueries({ queryKey: ["venues", id] });
    },
  });
}
