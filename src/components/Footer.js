import React from 'react';
import '../style/footer.css'; 

const Footer = () => {
  return (
    <footer className="section-p1">
      <div className="col">
        <img className="logofooter" src="img/logo.png" alt="Logo" />
        <h4>Contact</h4>
        <p>Maharshi dayanand university rohtak</p>
        <p><strong>Phone:</strong> +01 2222 365/(+91) 01 2345 6789</p>
        <p><strong>Hours:</strong> 10:00-18:00, Mon-Sat</p>
        <div className="follow">
          <h4>Follow Us</h4>
          <div className="icon">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-pinterest"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>
      <div className="col">
        <h4>About</h4>
        <a href="#">About us</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & condition</a>
        <a href="#">Contact us</a>
      </div>
      <div className="col">
        <h4>My Account</h4>
        <a href="#">Sign In</a>
        <a href="#">View cart</a>
        <a href="#">My wishlist</a>
        <a href="#">Track my order</a>
        <a href="#">Help</a>
      </div>
      <div className="col" id="install">
        <h4>Install app</h4>
        <p>From App Store or Google Play</p>
        <div className="row">
          <img src="img/pay/app.jpg" alt="App Store" />
          <img src="img/pay/play.jpg" alt="Google Play" />
        </div>
        <p>Secured payment gateways</p>
        <img id="install" src="img/pay/pay.png" alt="Payment Methods" />
      </div>
      <div className="copyright">
        <p>@ 2021, Tech2 etc - HTML CSS Ecommerce Template</p>
      </div>
    </footer>
  );
};

export default Footer;
