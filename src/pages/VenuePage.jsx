import { useParams, Link } from "react-router";
import { useVenueById } from "../features/venues/useVenues.js";

export function VenuePage() {
  const { id } = useParams();
  const { data: venue, isLoading, error } = useVenueById(id);
  if (isLoading) return <p className="p-8">Laster...</p>;
  if (error) return <p className="p-8">Noe gikk galt: {error.message}</p>;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{venue.name}</h1>
      <p>{venue.description}</p>
      <p>Rating: {venue.rating}</p>
      <p>
        Location: {venue.location.city}, {venue.location.country}
      </p>
      <p>Price: {venue.price}</p>
      <p>Capacity: {venue.maxGuests}</p>
      <Link to="/" className="text-blue-600 underline">
        Tilbake
      </Link>
    </main>
  );
}
