import React, { useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../assets/1.jpeg";
import emailjs from "emailjs-com";
import svg from "../assets/contact/svg.webp";
import {toast} from "react-hot-toast";
import "../style/contact.css";

const Contact = () => {
  const serviceID = process.env.REACT_APP_SERVICE_ID;
  const templateID = process.env.REACT_APP_TEMPLATE_ID;
  const key = process.env.REACT_APP_KEY;
  const [loading,setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if(formData.name == "" || formData.email == "" || formData.message == ""){
      toast.error("All fields are mandatory");
      setLoading(false);
      return;
    }
    emailjs
      .send(
        `${serviceID}`, // Replace with your Service ID
        `${templateID}`, // Replace with your Template ID
        formData,
        `${key}` // Replace with your User ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Email sent Successfully");
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          console.error("FAILED...", error);
          toast.error("Failed to send email.");
        }
      ).finally(()=>

        setLoading(false)
      );


    
  };
  return (
    <div>
      <section className="form-details">
        <div className="form-content">
          <form>
            <span>LEAVE A MESSAGE</span>
            <h2>We love to hear from you</h2>
            <input
              type="text"
              placeholder="Your Good Name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="E-mail"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              cols="30"
              rows="10"
              placeholder="Your message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button className="normal" onClick={handleSubmit} disabled={loading}>
              {loading === true? "Sending...":"Submit"}
            </button>
          </form>
        </div>
        <div className="svg-container">
          <img src={svg} alt="Contact SVG" />
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
    </div>
  );
};

export default Contact;
