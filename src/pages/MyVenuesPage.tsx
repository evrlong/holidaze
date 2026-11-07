import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../features/auth/authStore";
import { useMyVenues } from "../features/venues/hooks/useMyVenues";
import { MyVenueCard } from "../features/venues/components/MyVenueCard";
import { VenueBookingsPanel } from "../features/venues/components/VenueBookingsPanel";

export function MyVenuesPage() {
  const { user, accessToken } = useAuthStore();
  const username = user?.name ?? "";
  const token = accessToken ?? "";
  const { data: venues, isLoading, error } = useMyVenues(username, token);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (isLoading)
    return <p className="text-center text-gray-600">Loading your venues...</p>;
  if (error)
    return (
      <p role="alert" className="text-center text-red-600">
        {error.message}
      </p>
    );

  const selectedVenue = venues?.find((venue) => venue.id === selectedId);

  if (!venues?.length)
    return (
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-gray-600">My venues</h2>
        <div className="rounded-xl bg-gray-50 px-6 py-10 text-center">
          <p className="text-gray-600">You haven't listed any venues yet.</p>
          <Link
            to="/profile/venues/new"
            className="text-mint-800 mt-4 inline-block font-semibold underline"
          >
            List your first venue
          </Link>
        </div>
      </section>
    );

  return (
    <div className="lg:grid lg:grid-cols-[20rem_1fr] lg:gap-8">
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-gray-600">My venues</h2>
        <ul className="space-y-5">
          {venues.map((venue) => {
            const isSelected = venue.id === selectedId;

            return (
              <li key={venue.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(isSelected ? null : venue.id)}
                  className="focus-visible:outline-mint-700 block w-full rounded-xl text-left focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <MyVenueCard venue={venue} selected={isSelected} />
                </button>
                <div className="mt-2 flex gap-4 px-1 text-sm">
                  <Link
                    to={`/venues/${venue.id}`}
                    className="text-mint-800 font-semibold hover:underline"
                  >
                    View venue
                  </Link>
                  <Link
                    to={`/profile/venues/${venue.id}/edit`}
                    className="text-mint-800 font-semibold hover:underline"
                  >
                    Edit venue
                  </Link>
                </div>

                {isSelected && (
                  <div className="mt-4 lg:hidden">
                    <VenueBookingsPanel venue={venue} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <aside className="hidden self-start lg:sticky lg:top-8 lg:block">
        <h2 className="mb-6 truncate text-2xl font-semibold text-gray-600">
          {selectedVenue ? (
            <>
              Bookings for{" "}
              <span className="text-mint-600 font-semibold">
                {selectedVenue.name}
              </span>
            </>
          ) : (
            "Bookings"
          )}
        </h2>
        {selectedVenue ? (
          <VenueBookingsPanel venue={selectedVenue} />
        ) : (
          <div className="rounded-xl bg-gray-50 px-6 py-10 text-center">
            <p className="text-gray-600">
              <span className="font-semibold">Select a venue </span> to see its
              bookings.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
