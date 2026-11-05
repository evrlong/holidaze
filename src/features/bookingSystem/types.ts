export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

export interface BookingFormProps {
  price: number;
  maxGuests: number;
  venueId: string;
  bookings: BookedDates[];
}

export interface createBookingBody {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

export type BookedDates = Pick<Booking, "dateFrom" | "dateTo">;
