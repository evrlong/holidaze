import { useParams } from "react-router";
import { useVenueById } from "../features/venues/useVenues";
import { BookingForm } from "../features/bookingSystem/BookingForm";
import { FaWifi, FaParking, FaCoffee, FaPaw, FaEnvelope } from "react-icons/fa";

export function VenuePage() {
  const { id } = useParams();
  const { data: venue, isLoading, error } = useVenueById(id);
  if (isLoading || !venue) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8">Something went wrong: {error.message}</p>;

  return (
    <main className="mx-auto max-w-5xl p-8">
      {venue.media?.[0] && (
        <img
          src={venue.media[0].url}
          alt={venue.media[0].alt || venue.name}
          className="my-4 h-72 w-full rounded-lg object-cover"
        />
      )}

      <div className="grid gap-8 md:grid-cols-[1fr_20rem]">
        <div>
          <h1 className="text-3xl font-bold">{venue.name}</h1>
          <p className="mt-2 underline">
            {venue.location.city}, {venue.location.country}
          </p>
          <p className="mt-2">
            <span className="rounded bg-green-500 px-2 py-1 text-white">
              {venue.rating}
            </span>
          </p>
          <p className="mt-2">Capacity: {venue.maxGuests} guests</p>
          <p>Price: {venue.price} per night</p>

          {venue.meta && (
            <section className="mt-6">
              <h2 className="text-xl font-bold">Facilities</h2>
              <ul className="mt-2 grid grid-cols-2 gap-1">
                <li className={venue.meta.wifi ? "" : "text-gray-400"}>
                  {venue.meta.wifi ? (
                    <>
                      <FaWifi className="mr-2 inline" />
                      Free WiFi
                    </>
                  ) : (
                    "No WiFi"
                  )}
                </li>
                <li className={venue.meta.breakfast ? "" : "text-gray-400"}>
                  {venue.meta.breakfast ? (
                    <>
                      <FaCoffee className="mr-2 inline" />
                      Breakfast included
                    </>
                  ) : (
                    "Breakfast not included"
                  )}
                </li>
                <li className={venue.meta.parking ? "" : "text-gray-400"}>
                  {venue.meta.parking ? (
                    <>
                      <FaParking className="mr-2 inline" />
                      Parking
                    </>
                  ) : (
                    "No parking"
                  )}
                </li>
                <li className={venue.meta.pets ? "" : "text-gray-400"}>
                  {venue.meta.pets ? (
                    <>
                      <FaPaw className="mr-2 inline" />
                      Pets allowed
                    </>
                  ) : (
                    "Pets not allowed"
                  )}
                </li>
              </ul>
            </section>
          )}

          <section className="mt-6">
            <h2 className="text-xl font-bold">About the venue</h2>
            <p className="mt-2">{venue.description}</p>
          </section>
        </div>

        <aside className="self-start">
          <BookingForm
            price={venue.price}
            maxGuests={venue.maxGuests}
            venueId={venue.id}
          />
          {venue.owner && (
            <section className="border-mint-200 mt-10 rounded-xl border bg-gray-100 shadow-lg">
              <div className="flex flex-col gap-6 p-6">
                <div className="flex-left flex flex-col flex-row items-center gap-4">
                  <img
                    src={venue.owner.avatar?.url}
                    alt={venue.owner.avatar?.alt || venue.owner.name}
                    className="h-12 w-12 shrink-0 rounded-full bg-gray-200 object-cover"
                  />
                  <div className="mt-2">
                    <p className="flex flex-col text-gray-600">
                      Hosted by{" "}
                      <span className="font-bold">{venue.owner.name}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">{venue.owner.bio}</p>
                </div>
                <a
                  href={`mailto:${venue.owner.email}`}
                  className="text-mint-700"
                >
                  <FaEnvelope className="mr-2 inline" />
                  Contact host
                </a>
              </div>
            </section>
          )}
        </aside>
      </div>
    </main>
  );
}
