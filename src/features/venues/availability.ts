import type { Venue } from "./types";

export function overlaps(
  aFrom: string,
  aTo: string,
  bFrom: string,
  bTo: string,
): boolean {
  return new Date(aFrom) <= new Date(bTo) && new Date(bFrom) <= new Date(aTo);
}

export function isAvailable(
  venue: Venue,
  dateFrom: string,
  dateTo: string,
): boolean {
  if (!venue.bookings) return true;
  return !venue.bookings.some((booking) =>
    overlaps(dateFrom, dateTo, booking.dateFrom, booking.dateTo),
  );
}
