import { useRef } from "react";
import type { SearchFilters, Venue } from "./types";
import { LocationInput } from "./LocationInput";
import { FaMapMarkerAlt, FaRegCalendarAlt, FaRegUser } from "react-icons/fa";

type DateButtonProps = {
  label: string;
  value: string;
  min?: string;
  onChange: (value: string) => void;
};

function DateButton({ label, value, min, onChange }: DateButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const display = value
    ? new Date(`${value}T00:00`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : label;

  return (
    <div className="relative flex-1">
      <button
        type="button"
        onClick={() => inputRef.current?.showPicker()}
        className="hover:bg-mint-50 focus-visible:outline-mint-700 flex min-h-12 w-full items-center gap-3 px-5 py-3 text-left text-sm focus-visible:outline-2 focus-visible:-outline-offset-2"
      >
        <FaRegCalendarAlt
          aria-hidden="true"
          className="text-mint-800 shrink-0"
        />
        <span className={value ? "text-black" : "text-gray-500"}>
          {display}
        </span>
      </button>
      <input
        ref={inputRef}
        type="date"
        aria-label={`${label} date`}
        tabIndex={-1}
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        className="pointer-events-none absolute inset-0 opacity-0"
      />
    </div>
  );
}

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
    <div className="border-mint-700 divide-mint-700 mx-auto flex w-full max-w-4xl flex-col divide-y overflow-hidden rounded-3xl border bg-white shadow-sm md:flex-row md:divide-x md:divide-y-0 md:rounded-full">
      <div className="flex flex-1 items-center gap-3 px-5 py-3">
        <FaMapMarkerAlt aria-hidden="true" className="text-mint-800 shrink-0" />
        <LocationInput
          venues={venues}
          value={filters.location}
          onChange={(value) => update("location", value)}
        />
      </div>

      <div className="flex flex-1 flex-col sm:flex-row sm:items-center">
        <DateButton
          label="From"
          value={filters.dateFrom}
          min={new Date().toISOString().split("T")[0]}
          onChange={(value) => update("dateFrom", value)}
        />
        <span aria-hidden="true" className="hidden text-gray-400 sm:inline">
          –
        </span>
        <DateButton
          label="To"
          value={filters.dateTo}
          min={filters.dateFrom}
          onChange={(value) => update("dateTo", value)}
        />
      </div>

      <div className="flex items-center gap-3 px-5 py-3 md:w-44">
        <FaRegUser aria-hidden="true" className="text-mint-800 shrink-0" />
        <input
          type="number"
          min={1}
          aria-label="Guests"
          value={filters.guests}
          onChange={(e) => update("guests", e.target.value)}
          placeholder="Guests"
          className="w-full min-w-0 bg-transparent text-sm outline-none"
        />
      </div>
    </div>
  );
}
