import { Link, NavLink, Outlet } from "react-router";
import { BurgerMeny } from "./BurgerMeny";
import { useAuthStore } from "../features/auth/authStore";
import { FaFacebook, FaXTwitter, FaInstagram } from "react-icons/fa6";

const navBase =
  "border-b-2 pb-1 font-medium text-mint-50 transition-colors hover:border-korall-500";
const navClass = ({ isActive }: { isActive: boolean }) =>
  `${navBase} ${isActive ? "border-korall-500" : "border-transparent"}`;

export function Layout() {
  const { user, clearUser } = useAuthStore();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-mint-800 relative z-10 flex items-center justify-between p-8 shadow-lg">
        <Link
          to="/"
          className="text-mint-50 hover:text-korall-400 text-xl transition-[color,font-weight] duration-300 ease-out hover:font-bold md:text-3xl"
        >
          Holi
          <span className="text-korall-500 font-bold">daze</span>
        </Link>
        <BurgerMeny />
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" end className={navClass}>
            Browse
          </NavLink>

          {user ? (
            <>
              <NavLink to="/profile" className={navClass}>
                Profile
              </NavLink>

              <button
                type="button"
                onClick={clearUser}
                className={`${navBase} cursor-pointer border-transparent`}
              >
                Log out
              </button>
            </>
          ) : (
            <NavLink to="/login" className={navClass}>
              Log in
            </NavLink>
          )}
        </nav>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="bg-mint-800 border-t text-center text-white">
        <div className="footer-links flex flex-col justify-around gap-8 p-4 pt-12 md:flex-row md:pt-6">
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

          <div className="flex items-center justify-center gap-4 py-4 md:gap-8 md:py-0">
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
