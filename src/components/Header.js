import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../style/header.css"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  return (
    <nav className="header">
      <div className="logo">
        <h1>LOGO</h1>
      </div>
      <div className="search-bar">
        <form  className="search-form">
          <input
            type="text"
            placeholder="Search for products ...."
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
        <div className="dropdown" >
          <button >
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
        <Link onClick={() => setIsMobileMenuOpen(false)} to={"/login"}>
          LOGIN
        </Link>
        <Link onClick={() => setIsMobileMenuOpen(false)} to={"/signup"}>
          SIGNUP
        </Link>
      </div>

      {/* <div className="header-right">
        <Link onClick={() => setIsMobileMenuOpen(false)} to={"/cart"}>
          <FaShoppingBag />
        </Link>
          <>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <FaUser />
            </button>
            <dialog open={isOpen} className={`user-menu ${isMobileMenuOpen ? 'mobile-menu-dialog' : ''}`}>
              <div>
                  <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                    Admin
                  </Link>

                <Link onClick={() => setIsOpen(false)} to="/orders">
                  Orders
                </Link>
                <button>
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
          </>
          <Link to={"/login"}>
            <FaSignInAlt />
          </Link>
        <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
          <FaBars />
        </button>
      </div> */}
    </nav>
  );
};

export default Header;
