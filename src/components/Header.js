import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import {toast} from "react-hot-toast";
import { FcBusinessman } from "react-icons/fc";
import { Tooltip } from 'react-tooltip';
import "../style/header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.user); 
  

  return (
    <nav className="header">
      <div className="logo">
        <h1>LOGO</h1>
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
            CATEGORIES
          </button>
          <div className="dropdown-menu">
            <Link>
              <option>tutor</option>
              <option>tuitioncenter</option>
            </Link>
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
            <Link onClick={() => setIsMobileMenuOpen(false)} to={"/profile"}>
            <FcBusinessman style={{ fontSize: '28px' }} data-tooltip-id="tooltip" data-tooltip-content={user.user.name}/>
            <Tooltip id="tooltip" place="top" style={{ zIndex: 1000 }} />
              {/* {user.user.name} */}
            </Link>
            
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
