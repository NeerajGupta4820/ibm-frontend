import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/logo/logo.png";
import "../style/footer.css";
import img1 from "../assets/pay/app.jpg";
import img2 from "../assets/pay/pay.png";
import img3 from "../assets/pay/play.jpg";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="section-p1">
        <div className="col">
          <h4>Contact</h4>
          <p>Maharshi dayanand university rohtak</p>
          <p>
            <strong>Phone:</strong> +01 2222 365/(+91) 01 2345 6789
          </p>
          <p>
            <strong>Hours:</strong> 10:00-18:00, Mon-Sat
          </p>
        </div>
        <div className="col">
          <h4>About</h4>
          <a href="/about">About us</a>
          <a href="#">Delivery Information</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & condition</a>
          <a href="/contact">Contact us</a>
        </div>
        <div className="col">
          <h4>My Account</h4>
          <a href="/login">Sign In</a>
          <a href="#">View cart</a>
          <a href="#">My wishlist</a>
          <a href="#">Track my order</a>
          <a href="/about">Help</a>
        </div>
        <div className="col" id="install">
          <h4>Install app</h4>
          <p>From App Store or Google Play</p>
          <div className="row">
            <img src={img1} alt="App Store" />
            <img src={img3} alt="Google Play" />
          </div>
          <p>Secured payment gateways</p>
          <div className="payment-icons">
            <img src={img2} alt="Payment" />
          </div>
        </div>
      </div>
      <div className="follow">
        <h4>Follow Us</h4>
        <div className="icon">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaPinterestP />
          <FaYoutube />
        </div>
      </div>
      <div className="copyright">
      <p>@ 2021, Tech2 etc - HTML CSS Ecommerce Template</p>
      </div>
    </footer>
  );
};

export default Footer;
