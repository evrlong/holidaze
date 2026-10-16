import { API_BASE, API_KEY } from "../../lib/constants";
import type { ApiResponse } from "../../lib/types";
import type { Profile } from "./types";

export async function getProfile(name: string, token: string) {
  const response = await fetch(`${API_BASE}/holidaze/profiles/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch profile");
  const json: ApiResponse<Profile> = await response.json();
  return json.data;
}
