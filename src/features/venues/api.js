import { API_BASE } from "../../lib/constants.js";

export async function fetchVenues() {
  const response = await fetch(`${API_BASE}/holidaze/venues`);
  if (!response.ok) throw new Error("Could not fetch venues");
  const json = await response.json();
  return json.data;
}

export async function fetchVenueById(id) {
  const response = await fetch(`${API_BASE}/holidaze/venues/${id}`);
  if (!response.ok) throw new Error("Could not fetch venue");
  const json = await response.json();
  return json.data;
}
