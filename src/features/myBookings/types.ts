import type { Venue } from "../venues/types";

export type MyBooking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
  venue?: Venue;
};
