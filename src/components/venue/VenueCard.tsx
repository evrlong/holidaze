import type { Venue } from "../../features/venues/types";

type VenueCardProps = {
  venue: Venue;
};

export function VenueCard({ venue }: VenueCardProps) {
  const image = venue.media[0];
  const imageUrl = image?.url ?? "/placeholder.jpg";
  const imageAlt = image?.alt || venue.name;

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md">
      <img
        src={imageUrl}
        alt={imageAlt}
        loading="lazy"
        className="aspect-[3/2] w-full object-cover"
      />

      <div className="p-4">
        <h3 className="truncate text-base font-medium text-gray-900">
          {venue.name}
        </h3>
        <p className="text-sm text-gray-400">
          {venue.location.city || "Unknown location"}
        </p>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              ${venue.price}
            </p>
            <p className="text-sm text-gray-600">Each night</p>
          </div>

          <span className="rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white">
            <span className="sr-only">Max guests: </span>
            {venue.maxGuests}
          </span>
        </div>
      </div>
    </article>
  );
}
