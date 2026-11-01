import { useState } from "react";
import { Link } from "react-router";
import { differenceInCalendarDays, format } from "date-fns";
import { useMyBookings } from "./useMyBookings";
import { useDeleteBooking } from "./useDeleteBooking";

export function MyBookingsUi({
  username,
  token,
}: {
  username: string;
  token: string;
}) {
  const { data: bookings, isLoading, error } = useMyBookings(username, token);
  const {
    mutate: removeBooking,
    variables: deletingBookingId,
    isPending,
    error: deleteError,
  } = useDeleteBooking(username, token);
  const [openBookingId, setOpenBookingId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <p className="text-center text-gray-600">Loading your bookings...</p>
    );
  }

  if (error) {
    return (
      <p role="alert" className="text-center text-red-600">
        {error.message}
      </p>
    );
  }

  if (!bookings?.length) {
    return (
      <div className="rounded-xl bg-gray-50 px-6 py-10 text-center">
        <p className="text-gray-600">You don't have any bookings yet.</p>
        <Link
          to="/"
          className="text-mint-800 mt-3 inline-block font-semibold underline"
        >
          Browse venues
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {bookings.map((booking) => {
        const isOpen = openBookingId === booking.id;
        const isDeleting = isPending && deletingBookingId === booking.id;
        const venue = booking.venue;
        const nights = Math.max(
          0,
          differenceInCalendarDays(
            new Date(booking.dateTo),
            new Date(booking.dateFrom),
          ),
        );
        const totalCost = venue ? nights * venue.price : null;
        const image = venue?.media?.[0];
        const venueId = venue?.id ?? booking.venueId;

        return (
          <article
            key={booking.id}
            className="overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <Link
              to={venueId ? `/venues/${venueId}` : "/"}
              aria-label={`View ${venue?.name ?? "booked venue"}`}
              className="focus-visible:outline-mint-700 block focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
            >
              <img
                src={image?.url ?? "/placeholder.jpg"}
                alt={image?.alt || venue?.name || "Booked venue"}
                loading="lazy"
                className="aspect-[3/1] w-full object-cover"
              />
            </Link>

            <div className="px-3 py-2">
              <h3 className="truncate text-sm font-medium text-gray-900">
                {venue?.name ?? "Venue booking"}
              </h3>
              <p className="truncate text-xs text-gray-400">
                {venue?.location.city || "Location unavailable"}
              </p>
              <p className="mt-4 text-base font-semibold text-gray-900">
                {format(new Date(booking.dateFrom), "dd.MM.yyyy")} –{" "}
                {format(new Date(booking.dateTo), "dd.MM.yyyy")}
              </p>
              {isOpen && (
                <div className="mt-4 space-y-2 border-t border-gray-200 pt-3 text-xs text-gray-600">
                  <p>Guests: {booking.guests}</p>
                  <p>Nights: {nights}</p>
                  {totalCost !== null ? (
                    <p className="font-semibold text-gray-900">
                      Total cost: ${totalCost}
                    </p>
                  ) : (
                    <p>Total cost unavailable</p>
                  )}

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this booking?",
                        )
                      ) {
                        removeBooking(booking.id);
                      }
                    }}
                    className="mt-2 w-full rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                  >
                    {isDeleting ? "Deleting..." : "Delete booking"}
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenBookingId(isOpen ? null : booking.id)}
              className="bg-mint-700 hover:bg-mint-800 w-full border-t-2 border-white px-3 py-1.5 text-base font-semibold text-white transition-colors"
            >
              {isOpen ? "Hide details" : "Show details"}
            </button>
          </article>
        );
      })}
      {deleteError && (
        <p role="alert" className="text-red-600">
          {deleteError.message}
        </p>
      )}
    </div>
  );
}
