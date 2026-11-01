import { Link } from "react-router";
import { useVenues } from "../features/venues/useVenues";
import { VenueCard } from "../components/venue/VenueCard";
import { useState } from "react";
import { SearchBar } from "../features/venues/SearchBar";
import type { SearchFilters } from "../features/venues/types";

export function HomePage() {
  const { data, isLoading, error } = useVenues();

  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    dateFrom: "",
    dateTo: "",
  });

  if (error) return <p className="p-8">Noe gikk galt: {error.message}</p>;
  if (isLoading || !data) return <p className="p-8">Laster...</p>;

  const filtered = data.filter((venue) => {
    const city = venue.location?.city?.toLowerCase() ?? "";
    return city.includes(filters.location.toLowerCase());
  });

  return (
    <main className="p-8">
      <h1 className="mb-4 text-3xl font-bold">Venues</h1>
      <SearchBar venues={data} filters={filters} onChange={setFilters} />
      <h2 className="mb-4 text-2xl font-bold">
        showing {filtered.length} venues
      </h2>

      <ul className="grid grid-cols-1 gap-4 space-y-2 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((venue) => (
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
