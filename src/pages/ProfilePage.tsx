import { Link, NavLink, Outlet } from "react-router";
import { useAuthStore } from "../features/auth/authStore";
import { useProfile } from "../features/profile/useProfile";
import { FaCrown, FaRegEdit } from "react-icons/fa";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-center text-sm font-medium shadow transition-colors ${
    isActive
      ? "bg-mint-800 text-white"
      : "bg-mint-700 text-white hover:bg-mint-800"
  }`;

export function ProfilePage() {
  const { user, accessToken } = useAuthStore();
  const username = user?.name ?? "";
  const token = accessToken ?? "";
  const { data: profile, isLoading, error } = useProfile(username, token);

  if (!user)
    return <p className="p-8">You must be logged in to see your profile.</p>;
  if (isLoading) return <p className="p-8">Loading profile...</p>;
  if (error)
    return (
      <p role="alert" className="p-8">
        {error.message}
      </p>
    );
  if (!profile) return null;

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-8 md:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="border-b border-gray-300 pb-8 md:min-h-[34rem] md:border-r md:border-b-0 md:pr-8">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            {profile.venueManager ? "Venue manager" : "Guest"}{" "}
            {profile.venueManager && (
              <FaCrown className="inline align-[-0.125em] text-yellow-500" />
            )}
          </p>
          <h1 className="mt-1 text-2xl font-bold">Hello, {profile.name}</h1>
          <p className="mt-1 text-sm break-words text-gray-500">
            {profile.email}
          </p>
          <img
            src={profile.avatar.url}
            alt={profile.avatar.alt || profile.name}
            className="mx-auto mt-5 h-24 w-24 rounded-full bg-gray-200 object-cover"
          />
          <Link
            to="/profile/edit"
            className="mt-3 inline-flex items-center gap-1.5 text-sm hover:underline"
          >
            <FaRegEdit aria-hidden="true" />
            Edit profile
          </Link>
        </div>

        <nav
          className="mt-6 flex flex-col gap-3"
          aria-label="Profile navigation"
        >
          {profile.venueManager && (
            <Link
              to="/profile/venues/new"
              className="bg-success-600 hover:bg-success-400 rounded-full px-4 py-2 text-center text-sm font-semibold text-white shadow"
            >
              + New venue
            </Link>
          )}
          {profile.venueManager && (
            <>
              <NavLink to="/profile/venues" className={navLinkClass}>
                My venues
              </NavLink>
              <NavLink to="/profile/bookings" className={navLinkClass}>
                My bookings
              </NavLink>
            </>
          )}
        </nav>

        <section className="mt-8">
          <h2 className="font-semibold">About me</h2>
          <p className="mt-2 text-sm text-gray-600">
            {profile.bio || "No info provided yet."}
          </p>
        </section>
      </aside>

      <div className="min-w-0">
        <Outlet />
      </div>
    </main>
  );
}
