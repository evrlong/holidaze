import { useAuthStore } from "../auth/authStore";
import type { createBookingBody } from "./types";
import { API_BASE, API_KEY } from "../../lib/constants";

export async function createBooking(body: createBookingBody) {
  const { accessToken } = useAuthStore.getState();

  if (!accessToken) throw new Error("You must be logged in to book");

  const response = await fetch(`${API_BASE}/holidaze/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.errors?.[0]?.message ?? "Failed to create booking");
  }
  return response.json();
}
