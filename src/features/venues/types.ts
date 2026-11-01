export type Venue = {
  id: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  rating: number;
  location: {
    city: string | null;
    country: string;
  };
  media?: {
    url: string;
    alt: string;
  }[];
  meta?: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  owner?: {
    name: string;
    email: string;
    bio: string;
    avatar: {
      url: string;
      alt: string;
    };
    banner: {
      url: string;
      alt: string;
    };
  };
  bookings?: Booking[];
};

export type VenueInput = {
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  media?: { url: string; alt: string }[];
  rating?: number;
  meta?: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pets?: boolean;
  };
  location?: {
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
  };
};

export type createVenueResponse = {
  data: Venue;
  errors?: { message: string }[];
};

export type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
};

export type SearchFilters = {
  location: string;
  dateFrom: string;
  dateTo: string;
  guests: string;
};
