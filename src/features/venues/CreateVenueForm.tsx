import type { SubmitEvent } from "react";
import { useNavigate } from "react-router";
import type { VenueInput } from "./types";
import { useCreateVenue } from "./useCreateVenue";
import { useAuthStore } from "../auth/authStore";
import { FaWifi, FaParking, FaCoffee, FaPaw } from "react-icons/fa";

const amenities = [
  { name: "wifi", label: "Wifi", icon: FaWifi },
  { name: "parking", label: "Parking", icon: FaParking },
  { name: "breakfast", label: "Breakfast", icon: FaCoffee },
  { name: "pets", label: "Pets allowed", icon: FaPaw },
];

const inputClass =
  "w-full rounded border border-gray-300 p-2 text-base text-black";
const labelClass = "block text-sm font-medium text-neutral-400";

export function CreateVenueForm() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.accessToken);
  const { mutate, isPending, error } = useCreateVenue(token);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const mediaUrl = String(formData.get("mediaUrl") ?? "");

    const input: VenueInput = {
      name,
      description: String(formData.get("description") ?? ""),
      price: Number(formData.get("price") ?? 0),
      maxGuests: Number(formData.get("maxGuests") ?? 0),
      media: mediaUrl ? [{ url: mediaUrl, alt: name }] : [],
      meta: {
        wifi: formData.has("wifi"),
        parking: formData.has("parking"),
        pets: formData.has("pets"),
        breakfast: formData.has("breakfast"),
      },
      location: {
        address: String(formData.get("address") ?? ""),
        city: String(formData.get("city") ?? ""),
        zip: String(formData.get("zip") ?? ""),
        country: String(formData.get("country") ?? ""),
      },
    };

    mutate(input, {
      onSuccess: (venue) => navigate(`/venues/${venue.id}`),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto space-y-6">
      <fieldset className="space-y-4">
        <legend className="sr-only">Venue details</legend>

        <label className={labelClass}>
          Title
          <input name="name" required className={inputClass} />
        </label>

        <label className={labelClass}>
          Description
          <textarea
            name="description"
            required
            rows={4}
            className={inputClass}
          />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Price per night
            <input
              name="price"
              type="number"
              min={0}
              required
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
              className={inputClass}
            />
          </label>
        </div>

        <label className={labelClass}>
          Image URL
          <input
            name="mediaUrl"
            type="url"
            placeholder="https://..."
            className={inputClass}
          />
        </label>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-xl font-bold text-neutral-400">
          Facilities
        </legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {amenities.map(({ name, label, icon: Icon }) => (
            <label key={name} className="flex items-center gap-2">
              <input
                name={name}
                type="checkbox"
                className="accent-mint-900 size-4"
              />
              <Icon aria-hidden="true" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-2 text-xl font-bold text-neutral-400">
          Location
        </legend>

        <label className={labelClass}>
          Address
          <input name="address" className={inputClass} />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            ZIP
            <input name="zip" className={inputClass} />
          </label>
          <label className={labelClass}>
            City
            <input name="city" className={inputClass} />
          </label>
        </div>

        <label className={labelClass}>
          Country
          <input name="country" className={inputClass} />
        </label>
      </fieldset>

      {error && (
        <p role="alert" className="rounded bg-red-50 p-3 text-red-700">
          {error.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-mint-900 w-full rounded px-4 py-2 font-bold text-white disabled:opacity-50"
      >
        {isPending ? "Creating venue..." : "Create venue"}
      </button>
    </form>
  );
}
