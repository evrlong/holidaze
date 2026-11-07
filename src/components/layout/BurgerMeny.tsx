import { NavLink } from "react-router";
import { useAuthStore } from "../../features/auth/authStore";
import {
  FaUser,
  FaMagnifyingGlass,
  FaRightToBracket,
  FaRightFromBracket,
  FaHouse,
} from "react-icons/fa6";
import { useEffect, useState } from "react";

const itemClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col items-center gap-1 text-sm font-semibold transition-colors py-2 hover:text-mint-700 ${
    isActive ? "text-mint-700" : "text-neutral-300"
  }`;
const iconClass = "text-mint-700 size-4";

const bar =
  "absolute left-0 h-0.5 w-8 rounded-full bg-white transition-all duration-300 ease-out";

export function BurgerMeny() {
  const { user, clearUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[60] size-8 cursor-pointer"
      >
        <span
          className={`${bar} ${isOpen ? "top-[15px] rotate-45" : "top-[6px]"}`}
        />
        <span
          className={`${bar} top-[15px] ${isOpen ? "scale-x-0 opacity-0" : ""}`}
        />
        <span
          className={`${bar} ${isOpen ? "top-[15px] -rotate-45" : "top-[24px]"}`}
        />
      </button>

      <div
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 z-50 flex min-h-[28rem] w-64 origin-top-right flex-col bg-white shadow-xl transition-all duration-300 ease-out ${
          isOpen
            ? "visible scale-100 opacity-100"
            : "invisible scale-0 opacity-0"
        }`}
      >
        <div className="bg-mint-700 flex h-24 items-center px-8">
          <span className="text-xl font-semibold text-white">Menu</span>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-6 py-8">
          {user && (
            <>
              <NavLink to="/profile" onClick={close} className={itemClass}>
                <FaUser className={iconClass} />
                Profile
              </NavLink>
              {user.venueManager && (
                <NavLink
                  to="/profile/venues"
                  onClick={close}
                  className={itemClass}
                >
                  <FaHouse className={iconClass} />
                  My Venues
                </NavLink>
              )}
            </>
          )}
          <NavLink to="/" end onClick={close} className={itemClass}>
            <FaMagnifyingGlass className={iconClass} />
            Browse
          </NavLink>
          {!user && (
            <NavLink to="/login" onClick={close} className={itemClass}>
              <FaRightToBracket className={iconClass} />
              Login
            </NavLink>
          )}
        </nav>

        {user && (
          <button
            type="button"
            onClick={() => {
              clearUser();
              close();
            }}
            className="hover:text-mint-700 bg-korall-200 flex cursor-pointer items-center justify-center gap-2 py-4 font-semibold text-neutral-400 transition-colors"
          >
            Log out
            <FaRightFromBracket className={iconClass} />
          </button>
        )}
      </div>
    </div>
  );
}
