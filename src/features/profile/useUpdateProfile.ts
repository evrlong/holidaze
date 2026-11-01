import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "./api";
import type { ProfileUpdate } from "./types";
import { useAuthStore } from "../auth/authStore";

export function useUpdateProfile(name: string, token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ProfileUpdate) => updateProfile(name, token, input),
    onSuccess: (profile) => {
      queryClient.invalidateQueries({ queryKey: ["profile", name] });

      const { user, setUser } = useAuthStore.getState();
      if (user && token && user.venueManager !== profile.venueManager) {
        setUser({ ...user, venueManager: profile.venueManager }, token);
      }
    },
  });
}
