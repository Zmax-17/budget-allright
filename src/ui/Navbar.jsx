import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate(); // For redirect after logout

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-green-500 font-bold"
      : "text-emerald-800 dark:text-emerald-200 hover:text-green-500";

  // Outsideclick handler to close the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [menuRef]);

  // Logout function
  const handleLogout = async () => {
    try {
      await logout(); // Call logout from context
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <nav
      className="p-4 bg-emerald-100 dark:bg-gray-900 border-b border-emerald-600"
      ref={menuRef}
    >
      <div className="flex items-center justify-between w-full">
        {/* Burger menu and greeting */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-emerald-800 dark:text-emerald-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes size={22} />
            ) : (
              <FaBars size={22} />
            )}
          </button>
          <span className="hidden md:block font-semibold text-xl text-emerald-700 dark:text-emerald-300">
            Hi, {user ? user.email : "Guest"}
          </span>
        </div>

        {/* Navigation buttons are adaptive */}
        <div
          className={`absolute md:static top-16 left-0 right-0 p-4 md:p-0 
                      bg-emerald-100 dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent
                      flex flex-col md:flex-row md:gap-6 md:flex-nowrap items-start md:items-center
                      ${
                        isMenuOpen
                          ? "flex"
                          : "hidden md:flex"
                      }
                      z-10`}
        >
          {isMenuOpen && (
            <span className="md:hidden font-semibold text-xl text-emerald-700 dark:text-emerald-300 mb-4">
              Hi, {user ? user.email : "Guest"}
            </span>
          )}
          <NavLink
            to="/dashboard"
            className={navLinkClasses}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/transactions"
            className={navLinkClasses}
          >
            Transactions
          </NavLink>
          <NavLink
            to="/savings"
            className={navLinkClasses}
          >
            Savings (In dev)
          </NavLink>
          <NavLink
            to="/settings"
            className={navLinkClasses}
          >
            Settings
          </NavLink>
          {user ? (
            <button
              onClick={handleLogout}
              className={
                navLinkClasses({ isActive: false }) +
                " text-red-500 hover:text-red-700"
              }
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={navLinkClasses}
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Theme switch button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white dark:bg-emerald-700 hover:bg-emerald-400 
          cursor-pointer"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          {darkMode ? "Light" : "Dark"} Mode (In dev)
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
