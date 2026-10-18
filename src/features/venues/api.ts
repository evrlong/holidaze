import { API_BASE } from "../../lib/constants";
import type { ApiResponse } from "../../lib/types";
import type { Venue, VenueInput } from "./types";

export async function fetchVenues(): Promise<Venue[]> {
  const response = await fetch(`${API_BASE}/holidaze/venues`);
  if (!response.ok) throw new Error("Could not fetch venues");
  const json: ApiResponse<Venue[]> = await response.json();
  return json.data;
}

export async function fetchVenueById(id: string): Promise<Venue> {
  const response = await fetch(
    `${API_BASE}/holidaze/venues/${id}?_bookings=true`,
  );
  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.errors?.[0]?.message ?? "Could not fetch venue");
  }
  const json: ApiResponse<Venue> = await response.json();
  return json.data;
}

export async function createVenues(
  input: VenueInput,
  token: string,
): Promise<Venue> {
  const response = await fetch(`${API_BASE}/holidaze/venues`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": import.meta.env.VITE_NOROFF_API_KEY,
    },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.errors?.[0]?.message ?? "Could not create venue");
  }
  const json: ApiResponse<Venue> = await response.json();
  return json.data;
}
