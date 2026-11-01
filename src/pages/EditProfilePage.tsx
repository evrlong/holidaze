import type { SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../features/auth/authStore";
import { useProfile } from "../features/profile/useProfile";
import { useUpdateProfile } from "../features/profile/useUpdateProfile";
import type { ProfileUpdate } from "../features/profile/types";

const inputClass =
  "w-full rounded border border-gray-300 p-2 text-base text-black";
const labelClass = "block text-sm font-medium text-neutral-500";

export function EditProfilePage() {
  const navigate = useNavigate();
  const { user, accessToken } = useAuthStore();
  const name = user?.name ?? "";
  const token = accessToken ?? "";
  const { data: profile, isLoading, error } = useProfile(name, token);
  const update = useUpdateProfile(name, token);

  if (!user) return <p className="p-8">You must be logged in.</p>;
  if (isLoading) return <p className="p-8">Loading profile...</p>;
  if (error)
    return (
      <p role="alert" className="p-8 text-red-600">
        {error.message}
      </p>
    );
  if (!profile) return null;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const avatarUrl = String(formData.get("avatarUrl") ?? "").trim();
    const bannerUrl = String(formData.get("bannerUrl") ?? "").trim();

    const input: ProfileUpdate = {
      bio: String(formData.get("bio") ?? ""),
      venueManager: formData.has("venueManager"),
    };
    if (avatarUrl) input.avatar = { url: avatarUrl, alt: `${name} avatar` };
    if (bannerUrl) input.banner = { url: bannerUrl, alt: `${name} banner` };

    update.mutate(input, { onSuccess: () => navigate("/profile") });
  }

  return (
    <main className="mx-auto max-w-2xl p-4 sm:p-8">
      <Link
        to="/profile"
        className="text-mint-800 text-sm font-semibold underline"
      >
        Back to profile
      </Link>
      <h1 className="my-6 text-3xl font-bold text-neutral-500">Edit profile</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-gray-100 bg-white p-5 shadow-md sm:p-8"
      >
        <label className={labelClass}>
          Avatar URL
          <input
            name="avatarUrl"
            type="url"
            placeholder="https://..."
            defaultValue={profile.avatar?.url ?? ""}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          About me
          <textarea
            name="bio"
            rows={4}
            maxLength={160}
            defaultValue={profile.bio ?? ""}
            className={inputClass}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            name="venueManager"
            type="checkbox"
            defaultChecked={profile.venueManager}
            className="accent-mint-800 size-4"
          />
          I want to host venues on Holidaze
        </label>

        {update.error && (
          <p role="alert" className="rounded bg-red-50 p-3 text-red-700">
            {update.error.message}
          </p>
        )}

        <button
          type="submit"
          disabled={update.isPending}
          className="bg-mint-700 hover:bg-mint-800 w-full rounded-full px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          {update.isPending ? "Saving..." : "Save changes"}
        </button>
      </form>
    </main>
  );
}
