import { useParams } from "react-router";
import { useVenueById } from "../features/venues/useVenues";
import { VenueBookingsPanel } from "../features/venues/VenueBookingsPanel";

export function VenueBookingsPage() {
  const { id } = useParams();
  const { data: venue, isLoading, error } = useVenueById(id);

  if (isLoading)
    return <p className="p-8 text-center text-gray-600">Loading...</p>;
  if (error)
    return (
      <p role="alert" className="p-8 text-center text-red-600">
        {error.message}
      </p>
    );
  if (!venue)
    return <p className="p-8 text-center text-gray-600">Venue not found.</p>;

  return (
    <main className="mx-auto max-w-5xl p-6 sm:p-8">
      <header className="mb-6">
        <p className="text-mint-800 text-sm font-semibold tracking-wide uppercase">
          Venue bookings
        </p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">{venue.name}</h1>
      </header>
      <VenueBookingsPanel venue={venue} />
    </main>
  );
}
