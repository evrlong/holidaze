import type { Venue } from "../../features/venues/types";

type VenueCardProps = {
  venue: Venue;
  compact?: boolean;
};

export function VenueCard({ venue, compact = false }: VenueCardProps) {
  const image = venue.media?.[0];
  const imageUrl = image?.url ?? "/placeholder.jpg";
  const imageAlt = image?.alt || venue.name;

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
      <img
        src={imageUrl}
        alt={imageAlt}
        loading="lazy"
        className={`w-full object-cover ${compact ? "aspect-[2.4/1]" : "aspect-[3/2]"}`}
      />

      <div className={compact ? "p-2" : "p-4"}>
        <h3
          className={`truncate font-medium text-gray-900 ${compact ? "text-xs" : "text-base"}`}
        >
          {venue.name}
        </h3>
        <p className={`text-gray-400 ${compact ? "text-[10px]" : "text-sm"}`}>
          {venue.location.city || "Unknown location"}
        </p>

        <div
          className={`flex items-end justify-between ${compact ? "mt-4" : "mt-6"}`}
        >
          <div>
            <p
              className={`font-semibold text-gray-900 ${compact ? "text-base" : "text-2xl"}`}
            >
              ${venue.price}
            </p>
            <p
              className={`text-gray-600 ${compact ? "text-[10px]" : "text-sm"}`}
            >
              Each night
            </p>
          </div>

          <span
            className={`bg-mint-600 rounded-lg font-medium text-white ${compact ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"}`}
          >
            <span>Max guests: {venue.maxGuests}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
