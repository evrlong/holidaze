import { useQuery } from "@tanstack/react-query";
import { fetchMyVenues } from "../myVenuesApi";

export function useMyVenues(username: string, token: string) {
  return useQuery({
    queryKey: ["profile", username, "venues"],
    queryFn: () => fetchMyVenues(username, token),
    enabled: !!username && !!token,
  });
}
