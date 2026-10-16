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
    <section className="p-8">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        disabled={disabledDays}
        min={1}
      />
      <p>From: {range?.from ? range.from.toLocaleDateString() : "..."}</p>
      <p>To: {range?.to ? range.to.toLocaleDateString() : "..."}</p>
      <p>Guests: {guests}</p>
      <p>Night: {nights === 0 ? "..." : nights}</p>
      <p>Total Price: {totalPrice === 0 ? "..." : totalPrice}</p>
      <input
        type="number"
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value, 10))}
        min={1}
        max={maxGuests}
      />
      <button onClick={handleBooking} disabled={isPending}>
        Book Now
      </button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {isSuccess && <p className="text-green-500">Booking successful!</p>}
    </section>
  );
}
