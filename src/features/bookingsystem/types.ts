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
}

export interface createBookingBody {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}
