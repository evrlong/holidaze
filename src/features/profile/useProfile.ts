import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./api";

export function useProfile(name: string, token: string) {
  return useQuery({
    queryKey: ["profile", name],
    queryFn: () => getProfile(name, token),
    enabled: !!name && !!token,
  });
}
