import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";
import Logo from "../../assets/Logo/ArtenisLogo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LogoutButton from "../LogoutButton/LogoutButton";

function Navbar({ toggleTheme, isDarkTheme }) {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const openProfile = () => {
    navigate("/");
  };

  return (
    <div>
      {isOpen && <div className="backdrop" onClick={closeSidebar}></div>}

      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-area">
            <img src={Logo} alt="Logo" className="logo" draggable="false" />
          </div>

          <button
            className={`burger-menu ${isOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? "☓" : "☰"}
          </button>

          <div className={`nav-links ${isOpen ? "open" : ""}`}>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  end
                  onClick={closeSidebar}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeSidebar}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeSidebar}
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeSidebar}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
            {isAuthenticated && (
              <>
                <button className="user-profile" onClick={toggleDropdown} />

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 80, scale: 0.9 }}
                      animate={{ opacity: 1, y: 105, scale: 1 }}
                      exit={{ opacity: 0, y: 80, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="profile-dropdown"
                    >
                      <button>Go to Dashboard</button>
                      <button id="settings-btn" onClick={openProfile}>
                        User Settings
                      </button>
                      <LogoutButton givenClass={"logout-btn"} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
            <button
              className="theme-toggle"
              onClick={() => {
                toggleTheme();
                closeSidebar();
              }}
              aria-label="Toggle theme"
            >
              {isDarkTheme ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
