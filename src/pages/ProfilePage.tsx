import { useProfile } from "../features/profile/useProfile";
import { useAuthStore } from "../features/auth/authStore";

export function ProfilePage() {
  const { user, accessToken } = useAuthStore();

  const name = user?.name ?? "";
  const token = accessToken ?? "";

  const { data: profile, isLoading, error } = useProfile(name, token);

  if (!user) return <p>You must be logged in to see your profile.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!profile) return null;

  return (
    <main className="mx-auto max-w-sm p-8">
      <h1 className="mb-4 text-3xl font-bold text-neutral-400">Profile</h1>
      <img
        src={profile.avatar.url}
        alt={profile.avatar.alt || profile.name}
        className="mb-4 h-24 w-24 rounded-full object-cover"
      />
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
    </main>
  );
}
