import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import logoimg from "../assets/logo/logo.png";
import { MdOutlineManageAccounts } from "react-icons/md";
import { Tooltip } from 'react-tooltip';
import "../style/header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const getProfileLink = () => {
    if (user.role === 'Tutor') return '/tutor-dashboard';
    if (user.role === 'Tuition Center') return '/tuition-center-dashboard';
    if (user.role === 'Admin') return '/admin-dashboard';
    return '/user-dashboard';
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // Navigate to the search results page with the query
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <nav className="header">
      <div className="logo">
        <Link to="/">
          <img src={logoimg} alt="logo" />
        </Link>
      </div>
      <div className="search-bar">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for tutors or centers ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="header-center">
        <Link to="/">HOME</Link>
        <div className="dropdown">
          <button>SERVICES</button>
          <div className="dropdown-menu">
            <Link to="/all-tutors">Tutors</Link>
            <Link to="/all-tuition-centers">Tuition Centers</Link>
          </div>
        </div>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        {!user ? (
          <>
            <Link to="/login">LOGIN</Link>
            <Link to="/signup">Join US</Link>
          </>
        ) : (
          <Link to={getProfileLink()}>
            <MdOutlineManageAccounts style={{ fontSize: '24px' }} data-tooltip-id="tooltip" data-tooltip-content={user.name}/>
            <Tooltip id="tooltip" place="bottom" effect="solid" style={{ zIndex: 1000 }} />
          </Link>
        )}
      </div>
      <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      {isMobileMenuOpen && (
        <>
          <div className="overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="mobile-menu">
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/">HOME</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/all-tutors">TUTORS</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/all-tuition-centers">TUITION CENTERS</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/about">ABOUT</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/contact">CONTACT</Link>
            {!user ? (
              <>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/login">LOGIN</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/signup">Join US</Link>
              </>
            ) : (
              <Link onClick={() => setIsMobileMenuOpen(false)} to={getProfileLink()}>
                <MdOutlineManageAccounts style={{ fontSize: '24px' }} />
              </Link>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
