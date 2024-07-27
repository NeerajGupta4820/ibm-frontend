import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { userNotExist } from '../redux/reducers/userReducer'; 
import {toast} from "react-hot-toast";
import "../style/header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.user); 
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');
    dispatch(userNotExist()); 
    toast.success("User logout successfully")
  };

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
            <button onClick={handleLogout}>
              LOGOUT
            </button>
            <Link onClick={() => setIsMobileMenuOpen(false)} to={"/profile"}>
              {user.name}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
