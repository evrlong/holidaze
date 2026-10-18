import { useMyBookings } from "./useMyBookings";

export function MyBookingsUi({
  username,
  token,
}: {
  username: string;
  token: string;
}) {
  const { data: bookings, isLoading, error } = useMyBookings(username, token);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!bookings?.length) {
    return (
      <section>
        <h2>My Bookings</h2>
        <p>You don't have any bookings yet.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <h3>Venue: {booking.venueId}</h3>
            <p>
              {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
              {new Date(booking.dateTo).toLocaleDateString()}
            </p>
            <p>Guests: {booking.guests}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
