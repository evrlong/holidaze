import { useState } from "react";
import { useCreateBooking } from "./useCreateBooking";
import { differenceInDays } from "date-fns";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import type { BookingFormProps } from "./types";

export function BookingForm({ price, maxGuests, venueId }: BookingFormProps) {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [guests, setGuests] = useState<number>(1);

  const { mutate, isPending, error, isSuccess } = useCreateBooking();

  const disabledDays = { before: new Date() };

  const nights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;

  const totalPrice = nights * price;

  function handleBooking() {
    if (!range?.from || !range?.to) return;
    mutate({
      dateFrom: range.from.toISOString(),
      dateTo: range.to.toISOString(),
      guests,
      venueId,
    });
  }

  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="h-4 bg-mint-700" />
      <div className="flex flex-col gap-3 p-4">
        <div className="flex justify-center">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            disabled={disabledDays}
            min={1}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-gray-300 px-3 py-1.5 text-center text-sm shadow-sm">
            {range?.from ? range.from.toLocaleDateString() : "Check in"}
          </div>
          <div className="rounded-lg border border-gray-300 px-3 py-1.5 text-center text-sm shadow-sm">
            {range?.to ? range.to.toLocaleDateString() : "Check out"}
          </div>
        </div>
        <input
          type="number"
          aria-label="Guests"
          placeholder="Guests"
          value={Number.isNaN(guests) ? "" : guests}
          onChange={(e) => setGuests(parseInt(e.target.value, 10))}
          min={1}
          max={maxGuests}
          className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-center text-sm shadow-sm"
        />
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-sm font-semibold">
            Total cost{nights > 0 && ` (${nights} nights)`}
          </span>
          <span className="text-xl font-bold">
            {totalPrice === 0 ? "..." : `$${totalPrice}`}
          </span>
        </div>
        <button
          onClick={handleBooking}
          disabled={isPending}
          className="w-full rounded-lg bg-mint-700 py-2 font-semibold text-white shadow-md hover:bg-mint-800 disabled:opacity-60"
        >
          Reserve
        </button>
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {isSuccess && <p className="text-green-500">Booking successful!</p>}
      </div>
    </section>
  );
}
