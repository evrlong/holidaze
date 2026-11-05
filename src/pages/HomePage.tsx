import { Link } from "react-router";
import { useVenues } from "../features/venues/useVenues";
import { VenueCard } from "../components/venue/VenueCard";
import { useState } from "react";
import { SearchBar } from "../features/venues/SearchBar";
import type { SearchFilters } from "../features/venues/types";
import { isAvailable } from "../features/venues/availability";

type SortBy = "newest" | "price-asc" | "price-desc" | "rating";

export function HomePage() {
  const { data, isLoading, error } = useVenues();

  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    dateFrom: "",
    dateTo: "",
    guests: "",
  });

  const [visibleCount, setVisibleCount] = useState(24);
  const [sort, setSort] = useState<SortBy>("newest");

  if (error)
    return <p className="p-8">Something went wrong: {error.message}</p>;
  if (isLoading || !data) return <p className="p-8">Loading..</p>;

  const filtered = data.filter((venue) => {
    const city = venue.location?.city?.toLowerCase() ?? "";
    const matchesCity = city.includes(filters.location.toLowerCase());

    const guests = Number(filters.guests);
    const matchesGuests = !filters.guests || venue.maxGuests >= guests;

    const matchesAvailability =
      !filters.dateFrom ||
      !filters.dateTo ||
      isAvailable(venue, filters.dateFrom, filters.dateTo);
    return matchesCity && matchesGuests && matchesAvailability;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <main className="px-16 py-8">
      <h1 className="mb-6 text-center text-lg font-medium">
        Book your stay now
      </h1>
      <SearchBar
        venues={data}
        filters={filters}
        onChange={(newFilters) => {
          setFilters(newFilters);
          setVisibleCount(24);
        }}
      />
      <div className="flex items-center justify-between">
        <h2 className="mt-12 mb-4 text-base font-medium">
          Showing {filtered.length} venues
        </h2>
        <select
          className="border-mint-400 rounded-md border px-2 py-1"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortBy)}
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <ul className="grid grid-cols-1 gap-8 space-y-2 sm:grid-cols-2 lg:grid-cols-4">
        {sorted.slice(0, visibleCount).map((venue) => (
          <li key={venue.id}>
            <Link
              to={`/venues/${venue.id}`}
              className="block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2"
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
