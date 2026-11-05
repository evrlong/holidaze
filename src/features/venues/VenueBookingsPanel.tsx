import { differenceInCalendarDays, format } from "date-fns";
import type { Venue } from "./types";
import { FaEnvelope } from "react-icons/fa";

export function VenueBookingsPanel({ venue }: { venue: Venue }) {
  const bookings = [...(venue.bookings ?? [])].sort(
    (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime(),
  );

  if (!bookings.length) {
    return (
      <div className="rounded-xl bg-gray-50 px-6 py-10 text-center">
        <p className="text-gray-600">
          There are no bookings for this venue yet.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {bookings.map((booking) => {
        const nights = Math.max(
          0,
          differenceInCalendarDays(
            new Date(booking.dateTo),
            new Date(booking.dateFrom),
          ),
        );
        const totalCost = nights * venue.price;

        return (
          <li
            key={booking.id}
            className="flex items-center justify-between gap-4 px-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate font-semibold text-gray-900">
                {booking.customer.name}
                <span className="text-sm font-normal text-gray-500">
                  {" "}
                  · {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                </span>
              </p>
              <p className="text-sm text-gray-800">
                {format(new Date(booking.dateFrom), "dd.MM.yyyy")} –{" "}
                {format(new Date(booking.dateTo), "dd.MM.yyyy")} · {nights}{" "}
                {nights === 1 ? "night" : "nights"}
              </p>
            </div>
            <p className="text-mint-800 shrink-0 font-bold">+${totalCost}</p>
            <a
              className="flex shrink-0 items-center gap-1 text-sm text-gray-500"
              href={`mailto:${booking.customer.email}`}
            >
              <FaEnvelope />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
