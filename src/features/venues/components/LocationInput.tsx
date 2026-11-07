import type { Venue } from "../types";

type LocationInputProps = {
  venues: Venue[];
  value: string;
  onChange: (value: string) => void;
};

const hasLetter = (city: string) => /\p{L}/u.test(city);

function formatCity(city: string) {
  const trimmedCity = city.trim();
  return (
    trimmedCity.charAt(0).toUpperCase() + trimmedCity.slice(1).toLowerCase()
  );
}

export function LocationInput({ venues, value, onChange }: LocationInputProps) {
  const cities = [
    ...new Set(
      venues
        .map((venue) => venue.location?.city)
        .filter(
          (city): city is string => Boolean(city?.trim()) && hasLetter(city!),
        )
        .map(formatCity),
    ),
  ].sort((a, b) => a.localeCompare(b, "nb"));

  const query = value.trim().toLowerCase();

  const suggestions = query
    ? [
        ...cities.filter((c) => c.toLowerCase().startsWith(query)),
        ...cities.filter(
          (c) =>
            !c.toLowerCase().startsWith(query) &&
            c.toLowerCase().includes(query),
        ),
      ]
    : cities;

  return (
    <>
      <input
        list="cities"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Where are you going?"
        className="w-full min-w-0 bg-transparent text-sm outline-none"
      />
      <datalist id="cities">
        {suggestions.map((city) => (
          <option key={city} value={city} />
        ))}
      </datalist>
    </>
  );
}
