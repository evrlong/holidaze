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

  const [visibleCount, setVisibleCount] = useState(24);

  if (error) return <p className="p-8">Noe gikk galt: {error.message}</p>;
  if (isLoading || !data) return <p className="p-8">Laster...</p>;

  const filtered = data.filter((venue) => {
    const city = venue.location?.city?.toLowerCase() ?? "";
    return city.includes(filters.location.toLowerCase());
  });

  return (
    <main className="px-16 py-8">
      <h1 className="mb-4 text-3xl font-bold">Venues</h1>
      <SearchBar
        venues={data}
        filters={filters}
        onChange={(newFilters) => {
          setFilters(newFilters);
          setVisibleCount(24);
        }}
      />
      <h2 className="mb-4 text-2xl font-bold">
        showing {filtered.length} venues
      </h2>

      <ul className="grid grid-cols-1 gap-8 space-y-2 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.slice(0, visibleCount).map((venue) => (
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
      {visibleCount < filtered.length && (
        <div className="mt-6 flex justify-center">
          <button
            className="border-mint-200 text-mint-800 hover:bg-mint-100 hover:border-mint-300 focus-visible:outline-mint-700 rounded-full border bg-white/70 px-6 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => setVisibleCount(visibleCount + 24)}
          >
            View more
          </button>
        </div>
      )}
    </main>
  );
}
