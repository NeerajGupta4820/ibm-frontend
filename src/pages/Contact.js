import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assets/1.jpeg';
import svg from '../assets/contact/svg.webp';
import '../style/contact.css';

const Contact = () => {
  return (
    <div>
      <section id="page-header" className="about-header">
        <div className="content">
          <h1>#Let's Talk</h1>
          <h3>Here you can leave your message, We love to hear from you</h3>
        </div>
      </section>

      <section className="contact-details">
        <div className="details">
          <span>Get in touch</span>
          <h2>Visit one of our shop locations or contact us today</h2>
          <h3>Head Office</h3>
          <div>
            <li>
              <i className="fa-solid fa-location-dot"></i>
              <p>Maharshi Dayanand University, Rohtak, India</p>
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <p>contact@example.com</p>
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              <p>+01 2222 365 / (+91) 01 2345 6789</p>
            </li>
            <li>
              <i className="fa-solid fa-clock"></i>
              <p>Monday to Saturday: 9.00am to 5.00pm</p>
            </li>
          </div>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.485570264696!2d76.62067707422702!3d28.877017772781234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d84ddaef54325%3A0x5c86cf8f3f0e375d!2sMaharshi%20Dayanand%20University%2C%20Rohtak%2C%20Haryana%20124001!5e0!3m2!1sen!2sin!4v1690289945397!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <section className="form-details">
        <div className="form-content">
          <form>
            <span>LEAVE A MESSAGE</span>
            <h2>We love to hear from you</h2>
            <input type="text" placeholder="Your Good Name" />
            <input type="text" placeholder="E-mail" />
            <input type="text" placeholder="Subject" />
            <textarea cols="30" rows="10" placeholder="Your message"></textarea>
            <button className="normal">Submit</button>
          </form>
        </div>
        <div className="svg-container">
          <img src={svg} alt="Contact SVG" />
        </div>
      </section>
    </div>
  );
}

export default Contact;
