export type Venue = {
  id: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  rating: number;
  location: {
    city: string;
    country: string;
  };
  media?: {
    url: string;
    alt: string;
  }[];
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
