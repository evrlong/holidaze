import { useMemo, useState } from "react";
import { useCreateBooking } from "./useCreateBooking";
import { differenceInDays } from "date-fns";
import { DayPicker, type DateRange } from "react-day-picker";
import type { BookingFormProps } from "./types";
import { getBookedRanges } from "../../utils/getBookedRanges";
import { useToast } from "../../context/ToastContext";

export function BookingForm({
  price,
  maxGuests,
  venueId,
  bookings,
}: BookingFormProps) {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [guests, setGuests] = useState<number>(1);

  const { mutate, isPending } = useCreateBooking();

  const bookedRanges = useMemo(() => getBookedRanges(bookings), [bookings]);

  const nights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;

  const guestRate = 0.5;
  const guestMultiplier = 1 + (guests - 1) * guestRate;
  const totalPrice = nights * price * guestMultiplier;

  const { showToast } = useToast();

  function handleBooking() {
    if (isPending || !range?.from || !range?.to) return;
    mutate(
      {
        dateFrom: range.from.toISOString(),
        dateTo: range.to.toISOString(),
        guests,
        venueId,
      },
      {
        onSuccess: () => {
          setRange(undefined);
          setGuests(1);
          showToast("Booking successful!", "success");
        },

        onError: (error) => showToast(error.message, "error"),
      },
    );
  }

  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="bg-mint-700 h-4" />
      <div className="flex flex-col gap-3 p-4">
        <div className="flex justify-center">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            disabled={[{ before: new Date() }, ...bookedRanges]}
            excludeDisabled
            modifiers={{ booked: bookedRanges }}
            modifiersClassNames={{ booked: "line-through text-red-400" }}
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
        <select
          aria-label="Guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm shadow-sm [text-align-last:center]"
        >
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
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
          disabled={isPending || !range?.from || !range?.to}
          className="bg-mint-700 hover:bg-mint-800 w-full rounded-lg py-2 font-semibold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Reserving..." : "Reserve"}
        </button>
      </div>
    </section>
  );
}
