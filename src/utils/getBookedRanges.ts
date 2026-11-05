import type { DateRange } from "react-day-picker";
import type { BookedDates } from "../features/bookingSystem/types";

export function getBookedRanges(bookings: BookedDates[]): DateRange[] {
  return bookings.map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));
}
