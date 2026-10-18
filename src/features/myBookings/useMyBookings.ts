import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "./api";

export function useMyBookings(username: string, token: string) {
  return useQuery({
    queryKey: ["myBookings", username],
    queryFn: () => getMyBookings(username, token),
    enabled: !!username && !!token,
  });
}
