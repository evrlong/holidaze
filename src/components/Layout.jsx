import { Link, Outlet } from "react-router";
import { useAuthStore } from "../features/auth/authStore.js";
import { FaFacebook, FaXTwitter, FaInstagram } from "react-icons/fa6";

export function Layout() {
  const { user, clearUser } = useAuthStore();
  console.log(user);
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-mint-800 relative z-10 flex items-center justify-between p-8 shadow-lg">
        <Link to="/" className="text-mint-50 text-3xl font-bold">
          Holidaze
        </Link>
        <div className="flex items-center">
          <Link
            to="/"
            className="bg-mint-50 ml-4 rounded-[10px] px-3 py-0.5 text-black shadow-lg"
          >
            Browse
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="bg-mint-50 ml-4 rounded-[10px] px-3 py-0.5 text-black shadow-lg"
              >
                Profile
              </Link>
              <button
                onClick={clearUser}
                className="bg-mint-50 ml-4 rounded-[10px] px-3 py-0.5 text-black shadow-lg"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-mint-50 ml-4 rounded-[10px] px-3 py-0.5 text-black shadow-lg"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="bg-mint-800 border-t text-center text-white">
        <div className="footer-links flex justify-around p-4">
          <div className="flex flex-col space-y-2">
            <Link to="/">Venues</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Log in</Link>
          </div>
          <div className="flex flex-col space-y-2">
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">Terms & Privacy</Link>
          </div>

          <div className="flex items-center justify-center gap-8">
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebook className="size-8" />
            </a>
            <a href="https://twitter.com" aria-label="XTwitter">
              <FaXTwitter className="size-8" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram className="size-8" />
            </a>
          </div>
        </div>
        <p className="bg-mint-50 mt-4 text-black">
          {" "}
          &copy; Holidaze. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
