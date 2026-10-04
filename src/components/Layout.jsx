import { Link, Outlet } from "react-router";
import { useAuthStore } from "../features/auth/authStore.js";

export function Layout() {
  const { user, clearUser } = useAuthStore();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b p-4">
        <Link to="/" className="text-xl font-bold">
          Holidaze
        </Link>
        {user ? (
          <>
            <span className="ml-4">Hei, {user.name}</span>
            <button onClick={clearUser} className="ml-4 text-red-600 underline">
              Logg ut
            </button>
          </>
        ) : (
          <Link to="/login" className="ml-4 text-blue-600 underline">
            Logg inn
          </Link>
        )}
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="border-t p-4 text-center">&copy; 2024 Holidaze</footer>
    </div>
  );
}
