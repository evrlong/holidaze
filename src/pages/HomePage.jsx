import { Link } from "react-router";
import { useVenues } from "../features/venues/useVenues.js";
import { VenueCard } from "../components/venue/VenueCard.jsx";

export function HomePage() {
  const { data, isLoading, error } = useVenues();

  if (isLoading) return <p className="p-8">Laster...</p>;
  if (error) return <p className="p-8">Noe gikk galt: {error.message}</p>;

  return (
    <main className="p-8">
      <h1 className="mb-4 text-3xl font-bold">Venues</h1>
      <h2 className="mb-4 text-2xl font-bold">showing {data.length} venues</h2>
      <ul className="grid grid-cols-1 gap-4 space-y-2 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((venue) => (
          <li key={venue.id}>
            <Link
              to={`/venues/${venue.id}`}
              className="text-blue-600 underline"
            >
              <VenueCard venue={venue} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
