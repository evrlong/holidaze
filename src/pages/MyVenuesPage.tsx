import { Link } from "react-router";
import { useAuthStore } from "../features/auth/authStore";
import { useMyVenues } from "../features/venues/useMyVenues";
import { VenueCard } from "../components/venue/VenueCard";

export function MyVenuesPage() {
  const { user, accessToken } = useAuthStore();
  const username = user?.name ?? "";
  const token = accessToken ?? "";
  const { data: venues, isLoading, error } = useMyVenues(username, token);

  if (isLoading)
    return <p className="text-center text-gray-600">Loading your venues...</p>;
  if (error)
    return (
      <p role="alert" className="text-center text-red-600">
        {error.message}
      </p>
    );

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-600">My venues</h2>
      </div>
      {venues?.length ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {venues.map((venue) => (
            <div key={venue.id} className="space-y-3">
              <Link
                to={`/venues/${venue.id}`}
                className="focus-visible:outline-mint-700 block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <VenueCard venue={venue} compact />
              </Link>
              <Link
                to={`/profile/venues/${venue.id}/edit`}
                className="border-mint-700 text-mint-800 hover:bg-mint-50 block rounded-full border px-4 py-2 text-center text-sm font-semibold"
              >
                Edit venue
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-gray-50 px-6 py-10 text-center">
          <p className="text-gray-600">You haven't listed any venues yet.</p>
          <Link
            to="/profile/venues/new"
            className="text-mint-800 mt-4 inline-block font-semibold underline"
          >
            List your first venue
          </Link>
        </div>
      )}
    </section>
  );
}
