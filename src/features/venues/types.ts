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
  media: {
    url: string;
    alt: string;
  }[];
};
