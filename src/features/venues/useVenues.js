import { useQuery } from "@tanstack/react-query";
import { fetchVenues, fetchVenueById } from "./api.js";

export function useVenues() {
  return useQuery({
    queryKey: ["venues"],
    queryFn: fetchVenues,
  });
}

export function useVenueById(id) {
  return useQuery({
    queryKey: ["venue", id],
    queryFn: () => fetchVenueById(id),
  });
}
