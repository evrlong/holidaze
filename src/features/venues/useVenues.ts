import { useQuery } from "@tanstack/react-query";
import { fetchVenues, fetchVenueById } from "./api";

export function useVenues() {
  return useQuery({
    queryKey: ["venues"],
    queryFn: fetchVenues,
  });
}

export function useVenueById(id: string | undefined) {
  return useQuery({
    queryKey: ["venue", id],
    queryFn: () => fetchVenueById(id!),
    enabled: !!id,
  });
}
