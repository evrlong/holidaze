import type { ApiResponse } from "../../lib/types";
import { API_BASE, API_KEY } from "../../lib/constants";
import type { MyBooking } from "./types";

export async function getMyBookings(
  username: string,
  token: string,
): Promise<MyBooking[]> {
  if (!token) {
    throw new Error("You must be logged in to view your bookings");
  }

  const response = await fetch(
    `${API_BASE}/holidaze/profiles/${username}/bookings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch bookings: ${response.statusText}`);
  }
  const data: ApiResponse<MyBooking[]> = await response.json();
  return data.data;
}
