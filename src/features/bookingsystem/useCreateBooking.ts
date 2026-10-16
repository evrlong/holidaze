import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "./api";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["venues", variables.venueId],
      });
    },
  });
}
