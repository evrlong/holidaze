import { useState } from "react";
import {
  FaStar,
  FaMapMarkerAlt,
  FaRegUser,
  FaWifi,
  FaParking,
  FaCoffee,
  FaPaw,
  FaRegImage,
} from "react-icons/fa";
import type { Venue } from "../../features/venues/types";

type VenueCardProps = {
  venue: Venue;
  compact?: boolean;
};

const amenities = [
  { key: "wifi", label: "Wifi", Icon: FaWifi },
  { key: "parking", label: "Parking", Icon: FaParking },
  { key: "breakfast", label: "Breakfast", Icon: FaCoffee },
  { key: "pets", label: "Pets allowed", Icon: FaPaw },
] as const;

export function VenueCard({ venue, compact = false }: VenueCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const image = venue.media?.[0];
  const imageAlt = image?.alt || venue.name;
  const showImage = image?.url && !imageFailed;

  const location = [venue.location.city, venue.location.country]
    .filter(Boolean)
    .join(", ");
  const activeAmenities = amenities.filter(({ key }) => venue.meta?.[key]);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
      <div
        className={`overflow-hidden bg-gray-100 ${compact ? "aspect-[2.4/1]" : "aspect-[3/2]"}`}
      >
        {showImage ? (
          <img
            src={image.url}
            alt={imageAlt}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-115 hover:border hover:opacity-90"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <FaRegImage className="text-mint-400 h-8 w-8" aria-hidden="true" />
            <span className="sr-only">No image available</span>
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "p-2" : "p-4"}`}>
        <div className="flex items-start justify-between gap-2">
          <h3
            className={`truncate font-semibold text-gray-900 ${compact ? "text-xs" : "text-base"}`}
          >
            {venue.name}
          </h3>
          {venue.rating > 0 && (
            <span
              className={`flex shrink-0 items-center gap-1 text-gray-700 ${compact ? "text-[10px]" : "text-sm"}`}
              aria-label={`Rating ${venue.rating} of 5`}
            >
              <FaStar className="text-korall-500" aria-hidden="true" />
              {Number.isInteger(venue.rating)
                ? venue.rating
                : venue.rating.toFixed(1)}
            </span>
          )}
        </div>

        <p
          className={`flex items-center gap-1 text-gray-600 ${compact ? "text-[10px]" : "text-sm"}`}
        >
          <FaMapMarkerAlt
            className="text-mint-700 shrink-0"
            aria-hidden="true"
          />
          <span className="truncate">{location || "Unknown"}</span>
        </p>

        {!compact && (
          <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
            <span
              className="flex items-center gap-1"
              title={`Up to ${venue.maxGuests} guests`}
            >
              <FaRegUser aria-hidden="true" />
              {venue.maxGuests}
              <span className="sr-only">guests</span>
            </span>
            {activeAmenities.length > 0 && (
              <ul className="flex items-center gap-2 border-l border-gray-200 pl-3">
                {activeAmenities.map(({ key, label, Icon }) => (
                  <li key={key} title={label}>
                    <Icon aria-hidden="true" />
                    <span className="sr-only">{label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <p
          className={`mt-auto flex items-baseline gap-1 ${compact ? "pt-2" : "pt-4"}`}
        >
          <span
            className={`font-semibold text-gray-900 ${compact ? "text-base" : "text-xl"}`}
          >
            ${venue.price}
          </span>
          <span
            className={`text-gray-600 ${compact ? "text-[10px]" : "text-sm"}`}
          >
            / night
          </span>
        </p>
      </div>
    </article>
  );
}
