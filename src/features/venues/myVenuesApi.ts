import { API_BASE, API_KEY } from "../../lib/constants";
import type { ApiResponse } from "../../lib/types";
import type { Venue } from "./types";

export async function fetchMyVenues(
  username: string,
  token: string,
): Promise<Venue[]> {
  if (!token) {
    throw new Error("You must be logged in to view your venues");
  }

  const response = await fetch(
    `${API_BASE}/holidaze/profiles/${encodeURIComponent(username)}/venues?_bookings=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch your venues: ${response.statusText}`);
  }

  const json: ApiResponse<Venue[]> = await response.json();
  return json.data;
}
