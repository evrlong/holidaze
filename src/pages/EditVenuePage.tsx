import type { SubmitEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuthStore } from "../features/auth/authStore";
import { useVenueById } from "../features/venues/hooks/useVenues";
import {
  useUpdateVenue,
  useDeleteVenue,
} from "../features/venues/hooks/useUpdateVenue";
import { useToast } from "../context/ToastContext";

import type { VenueInput } from "../features/venues/types";

const inputClass =
  "w-full rounded border border-gray-300 p-2 text-base text-black";
const labelClass = "block text-sm font-medium text-neutral-500";

export function EditVenuePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, accessToken } = useAuthStore();
  const token = accessToken ?? "";
  const { data: venue, isLoading, error } = useVenueById(id);
  const update = useUpdateVenue(token || null, user?.name ?? "");
  const remove = useDeleteVenue(token || null, user?.name ?? "");
  const { showToast } = useToast();

  if (!user || !user.venueManager)
    return <p className="p-8">Only venue managers can edit venues.</p>;
  if (isLoading) return <p className="p-8">Loading venue...</p>;
  if (error)
    return (
      <p role="alert" className="p-8 text-red-600">
        {error.message}
      </p>
    );
  if (!venue || !id) return <p className="p-8">Venue not found.</p>;
  const venueId = id;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const mediaUrl = String(formData.get("mediaUrl") ?? "");
    const input: VenueInput = {
      name,
      description: String(formData.get("description") ?? ""),
      price: Number(formData.get("price")),
      maxGuests: Number(formData.get("maxGuests")),
      media: mediaUrl ? [{ url: mediaUrl, alt: name }] : [],
      meta: {
        wifi: formData.has("wifi"),
        parking: formData.has("parking"),
        breakfast: formData.has("breakfast"),
        pets: formData.has("pets"),
      },
      location: {
        city: String(formData.get("city") ?? ""),
        country: String(formData.get("country") ?? ""),
      },
    };
    update.mutate(
      { id: venueId, input },
      {
        onSuccess: () => {
          showToast("Venue updated successfully", "success");
          navigate("/profile/venues");
        },
      },
    );
  }

  function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;
    remove.mutate(
      { id: venueId },
      {
        onSuccess: () => {
          showToast("Venue deleted successfully", "success");
          navigate("/profile/venues");
        },
      },
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-4 sm:p-8">
      <Link
        to="/profile/venues"
        className="text-mint-800 text-sm font-semibold underline"
      >
        Back to my venues
      </Link>
      <h1 className="my-6 text-3xl font-bold text-neutral-500">Edit venue</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-gray-100 bg-white p-5 shadow-md sm:p-8"
      >
        <label className={labelClass}>
          Title
          <input
            name="name"
            required
            defaultValue={venue.name}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Description
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={venue.description}
            className={inputClass}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Price per night
            <input
              name="price"
              type="number"
              min={0}
              required
              defaultValue={venue.price}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Max guests
            <input
              name="maxGuests"
              type="number"
              min={1}
              max={100}
              required
              defaultValue={venue.maxGuests}
              className={inputClass}
            />
          </label>
        </div>
        <label className={labelClass}>
          Image URL
          <input
            name="mediaUrl"
            type="url"
            defaultValue={venue.media?.[0]?.url ?? ""}
            className={inputClass}
          />
        </label>
        <div className="grid gap-2 sm:grid-cols-2">
          <label>
            <input
              name="wifi"
              type="checkbox"
              defaultChecked={venue.meta?.wifi}
            />{" "}
            Wifi
          </label>
          <label>
            <input
              name="parking"
              type="checkbox"
              defaultChecked={venue.meta?.parking}
            />{" "}
            Parking
          </label>
          <label>
            <input
              name="breakfast"
              type="checkbox"
              defaultChecked={venue.meta?.breakfast}
            />{" "}
            Breakfast
          </label>
          <label>
            <input
              name="pets"
              type="checkbox"
              defaultChecked={venue.meta?.pets}
            />{" "}
            Pets allowed
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            City
            <input
              name="city"
              defaultValue={venue.location.city ?? ""}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Country
            <input
              name="country"
              defaultValue={venue.location.country}
              className={inputClass}
            />
          </label>
        </div>
        {(update.error || remove.error) && (
          <p role="alert" className="rounded bg-red-50 p-3 text-red-700">
            {(update.error ?? remove.error)?.message}
          </p>
        )}
        <button
          type="button"
          disabled={remove.isPending}
          onClick={handleDelete}
          className="w-full rounded-full bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
        >
          {remove.isPending ? "Deleting..." : "Delete venue"}
        </button>
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
