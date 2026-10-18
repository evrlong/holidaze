import { useParams, Link } from "react-router";
import { useVenueById } from "../features/venues/useVenues";
import { BookingForm } from "../features/bookingSystem/BookingForm";

export function VenuePage() {
  const { id } = useParams();
  const { data: venue, isLoading, error } = useVenueById(id);
  if (isLoading || !venue) return <p className="p-8">Laster...</p>;
  if (error) return <p className="p-8">Noe gikk galt: {error.message}</p>;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{venue.name}</h1>
      <img
        src={venue.media?.[0].url}
        alt={venue.name}
        className="my-4 w-full max-w-md rounded-lg"
      />
      <p>{venue.description}</p>
      <p>Rating: {venue.rating}</p>
      <p>
        Location: {venue.location.city}, {venue.location.country}
      </p>
      <p>Price: {venue.price}</p>
      <p>Capacity: {venue.maxGuests}</p>
      <Link to="/" className="text-blue-600 underline">
        Back to venues
      </Link>
      <BookingForm
        price={venue.price}
        maxGuests={venue.maxGuests}
        venueId={venue.id}
      />
    </main>
  );
}
