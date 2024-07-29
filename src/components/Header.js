import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logoimg from "../assets/logo/logo.png";
import { MdOutlineManageAccounts } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import "../style/header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.user);

  const getProfileLink = () => {
    if (user.role === "Tutor") {
      return "/tutor-dashboard";
    } else if (user.role === "Tuition Center") {
      return "/tuition-center-dashboard";
    } else if (user.role === "Admin") {
      return "/admin-dashboard";
    } else {
      return "/user-dashboard";
    }
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        !event.target.closest(".header-center") &&
        !event.target.closest(".mobile-menu-toggle")
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="header">
      <div className="logo">
        <img src={logoimg} alt="logo" />
      </div>
      <div className="search-bar">
        <form className="search-form">
          <input type="text" placeholder="Search for tutors ...." />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
      <div className={`header-center ${isMobileMenuOpen ? "open" : ""}`}>
        <Link onClick={closeMenu} to={"/"}>
          HOME
        </Link>
        <div className="dropdown">
          <button>SERVICES</button>
          <div className="dropdown-menu">
            <Link onClick={closeMenu} to="/all-tutors">
              Tutors
            </Link>
            <Link onClick={closeMenu} to="/all-tuition-centers">
              Tuition Centers
            </Link>
          </div>
        </div>
        <Link onClick={closeMenu} to={"/about"}>
          ABOUT
        </Link>
        <Link onClick={closeMenu} to={"/contact"}>
          CONTACT
        </Link>
        {!user ? (
          <>
            <Link onClick={closeMenu} to={"/login"}>
              LOGIN
            </Link>
            <Link onClick={closeMenu} to={"/signup"}>
              Join US
            </Link>
          </>
        ) : (
          <>
            <Link onClick={closeMenu} to={getProfileLink()}>
              <MdOutlineManageAccounts
                style={{ fontSize: "24px" }}
                data-tooltip-id="tooltip"
                data-tooltip-content={user.name}
              />
              <Tooltip id="tooltip" place="bottom" effect="solid" style={{ zIndex: 1000 }} />
            </Link>
          </>
        )}
      </div>
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Header;
