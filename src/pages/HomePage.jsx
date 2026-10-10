import { Link } from "react-router";
import { useVenues } from "../features/venues/useVenues.js";

export function HomePage() {
  const { data, isLoading, error } = useVenues();

  if (isLoading) return <p className="p-8">Laster...</p>;
  if (error) return <p className="p-8">Noe gikk galt: {error.message}</p>;

  return (
    <main className="p-8">
      <h1 className="mb-4 text-3xl font-bold">Venues</h1>
      <h2 className="mb-4 text-2xl font-bold">showing {data.length} venues</h2>
      <ul className="space-y-2">
        {data.map((venue) => (
          <li key={venue.id}>
            <Link
              to={`/venues/${venue.id}`}
              className="text-blue-600 underline"
            >
              {venue.name} -{venue.rating}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
