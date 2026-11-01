import { API_BASE, API_KEY } from "../../lib/constants";
import type { ApiResponse } from "../../lib/types";
import type { Venue, VenueInput } from "./types";

const MAX_PAGES = 20;

export async function fetchVenues(): Promise<Venue[]> {
  const url = (page: number) =>
    `${API_BASE}/holidaze/venues?_bookings=true&limit=100&page=${page}&sort=created&sortOrder=desc`;

  const fetchPage = async (page: number) => {
    const response = await fetch(url(page));
    if (!response.ok) throw new Error("Could not fetch venues");
    const json: ApiResponse<Venue[]> = await response.json();
    return json;
  };

  const first = await fetchPage(1);

  const pageCount = Math.min(first.meta?.pageCount ?? 1, MAX_PAGES);

  const rest = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, i) => fetchPage(i + 2)),
  );

  return [first, ...rest].flatMap((json) => json.data);
}
export async function fetchVenueById(id: string): Promise<Venue> {
  const response = await fetch(
    `${API_BASE}/holidaze/venues/${id}?_bookings=true&_owner=true`,
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
export async function updateVenue(
  id: string,
  input: VenueInput,
  token: string,
): Promise<Venue> {
  const response = await fetch(`${API_BASE}/holidaze/venues/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.errors?.[0]?.message ?? "Could not update venue");
  }

  const json: ApiResponse<Venue> = await response.json();
  return json.data;
}

export async function deleteVenue(id: string, token: string): Promise<void> {
  const response = await fetch(`${API_BASE}/holidaze/venues/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.errors?.[0]?.message ?? "Could not delete venue");
  }
}
