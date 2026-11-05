import type { Venue } from "../../features/venues/types";

type MyVenueCardProps = {
  venue: Venue;
  selected?: boolean;
};

export function MyVenueCard({ venue, selected = false }: MyVenueCardProps) {
  const image = venue.media?.[0];
  const location = [venue.location.city, venue.location.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={`hover:border-mint-700 hover:ring-mint-500 flex cursor-pointer items-center gap-4 rounded-xl border bg-white p-3 shadow-sm transition-colors hover:ring-1 ${
        selected ? "border-mint-700 ring-mint-700 ring-1" : "border-gray-200"
      }`}
    >
      {image ? (
        <img
          src={image.url}
          alt={image.alt || venue.name}
          className="h-16 w-16 shrink-0 rounded-lg object-cover"
        />
      ) : (
        <div className="h-16 w-16 shrink-0 rounded-lg bg-gray-200" />
      )}

      <div className="min-w-0">
        <p className="truncate font-semibold text-gray-800">{venue.name}</p>
        {location && (
          <p className="truncate text-sm text-gray-500">{location}</p>
        )}
      </div>
    </div>
  );
}
