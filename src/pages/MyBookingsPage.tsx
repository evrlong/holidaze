import { MyBookingsUi } from "../features/myBookings/myBookingsUi";
import { useAuthStore } from "../features/auth/authStore";

export function MyBookingsPage() {
  const { user, accessToken } = useAuthStore();

  return (
    <section>
      <h2 className="mb-8 text-center text-2xl font-semibold text-gray-600">
        My bookings
      </h2>
      <MyBookingsUi username={user?.name ?? ""} token={accessToken ?? ""} />
    </section>
  );
}
