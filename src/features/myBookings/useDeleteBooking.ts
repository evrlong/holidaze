import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE, API_KEY } from "../../lib/constants";

async function deleteBooking(id: string, token: string): Promise<void> {
  const response = await fetch(`${API_BASE}/holidaze/bookings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.errors?.[0]?.message ?? "Could not delete booking");
  }
}

export function useDeleteBooking(username: string, token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: string) => {
      if (!token) throw new Error("You must be logged in to delete a booking");
      return deleteBooking(bookingId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings", username] });
    },
  });
}
