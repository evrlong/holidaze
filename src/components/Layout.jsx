import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b p-4">
        <Link to="/" className="text-xl font-bold">
          Holidaze
        </Link>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="border-t p-4 text-center">&copy; 2024 Holidaze</footer>
    </div>
  );
}
