import type { SearchFilters, Venue } from "./types";
import { LocationInput } from "./LocationInput";

type SearchBarProps = {
  venues: Venue[];
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
};

export function SearchBar({ venues, filters, onChange }: SearchBarProps) {
  function update(field: keyof SearchFilters, value: string) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <div>
      <LocationInput
        venues={venues}
        value={filters.location}
        onChange={(value) => update("location", value)}
      />
    </div>
  );
}
