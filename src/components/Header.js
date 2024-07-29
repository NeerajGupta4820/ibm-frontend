import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import logoimg from "../assets/logo/logo.png";
import { MdOutlineManageAccounts } from "react-icons/md";
import { Tooltip } from 'react-tooltip';
import "../style/header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.user);

  const getProfileLink = () => {
    if (user.role === 'Tutor') {
      return '/tutor-dashboard';
    }
    else if (user.role === 'Tuition Center') {
      return '/tuition-center-dashboard';
    }
    else if (user.role === 'Admin') {
      return '/admin-dashboard';
    }
    else {
      return '/user-dashboard';
    }
  };

  return (
    <nav className="header">
      <div className="logo">
        <img src={logoimg} alt="logo" />
      </div>
      <div className="search-bar">
        <form className="search-form">
          <input
            type="text"
            placeholder="Search for tutors ...."
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
      <div className={`header-center ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link onClick={() => setIsMobileMenuOpen(false)} to={"/"}>
          HOME
        </Link>
        <div className="dropdown">
          <button>
            SERVICES
          </button>
          <div className="dropdown-menu">
            <Link to="/tutors">Tutors</Link>
            <Link to="/tuition-centers">Tuition Centers</Link>
          </div>
        </div>
        <Link onClick={() => setIsMobileMenuOpen(false)} to={"/about"}>
          ABOUT
        </Link>
        <Link onClick={() => setIsMobileMenuOpen(false)} to={"/contact"}>
          CONTACT
        </Link>
        {!user ? (
          <>
            <Link onClick={() => setIsMobileMenuOpen(false)} to={"/login"}>
              LOGIN
            </Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to={"/signup"}>
              Join US
            </Link>
          </>
        ) : (
          <>
            <Link onClick={() => setIsMobileMenuOpen(false)} to={getProfileLink()}>
              <MdOutlineManageAccounts style={{ fontSize: '24px' }} data-tooltip-id="tooltip" data-tooltip-content={user.name}/>
              <Tooltip id="tooltip" place="bottom" effect="solid" style={{ zIndex: 1000 }} />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
