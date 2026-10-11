import { API_BASE } from "../../lib/constants";
import type { ApiResponse } from "../../lib/types";
import type { Venue } from "./types";

export async function fetchVenues(): Promise<Venue[]> {
  const response = await fetch(`${API_BASE}/holidaze/venues`);
  if (!response.ok) throw new Error("Could not fetch venues");
  const json: ApiResponse<Venue[]> = await response.json();
  return json.data;
}

export async function fetchVenueById(id: string): Promise<Venue> {
  const response = await fetch(`${API_BASE}/holidaze/venues/${id}`);
  if (!response.ok) throw new Error("Could not fetch venue");
  const json: ApiResponse<Venue> = await response.json();
  return json.data;
}
