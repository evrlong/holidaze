export type Venue = {
  id: string;
  name: string;
  price: number;
  maxGuests: number;
  location: {
    city: string;
    country: string;
  };
  media: {
    url: string;
    alt: string;
  }[];
};
