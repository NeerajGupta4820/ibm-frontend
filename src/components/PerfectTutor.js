import React, { useState, useEffect } from "react";
import "../style/perfecttutor.css"; // Make sure to create and import the CSS file
import img1 from "../assets/home/perfectTutor/one.png";
import img2 from "../assets/home/perfectTutor/personal.png";
import img3 from "../assets/home/perfectTutor/flexible.png";
import img4 from "../assets/home/perfectTutor/student2.png";
import img5 from "../assets/home/perfectTutor/teacher2.png";

function PerfectTutor() {
  const [current, setCurrent] = useState(0);
  const testimonials = [
    {
      img: img4,
      name: "Ayush Bajwan",
      text:
        "Thank you for your dedication and support. Your guidance and encouragement have made a significant impact on my learning journey. I appreciate the time and effort you invest in helping us understand and excel. Your passion for teaching truly inspires me. Thank you for being an exceptional teacher!",
    },
    {
      img: img4,
      name: "Anuj Srivastav",
      text:
        "Thank you for your dedication and support. Your guidance and encouragement have made a significant impact on my learning journey. I appreciate the time and effort you invest in helping us understand and excel. Your passion for teaching truly inspires me. Thank you for being an exceptional teacher!",
    },
    {
      img: img5,
      name: "Prena Rana",
      text:
        "Thank you for your dedication and support. Your guidance and encouragement have made a significant impact on my learning journey. I appreciate the time and effort you invest in helping us understand and excel. Your passion for teaching truly inspires me. Thank you for being an exceptional teacher!",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000); 
    return () => clearInterval(interval);
  }, [testimonials.length]);

// email part 
const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Handle email submission logic here
    console.log('Email submitted:', email);
  };

  return (
    <div className="main-perfect">
      <div className="perfect-cards-container">
        <h1>Why Perfect Tutor</h1>
        <div className="perfect-cards">
          <div className="perfect-card" style={{ width: "18rem" }}>
            <img src={img1} className="card-img-top" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">One-On-One Learning</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="perfect-card" style={{ width: "18rem" }}>
            <img src={img2} className="card-img-top" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">100% verified profiles</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="perfect-card" style={{ width: "18rem" }}>
            <img src={img3} className="card-img-top" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Get the best Online Platform</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="testimonials">
        <h1>Testimonials</h1>
        <div className="testimonial-container">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card ${
                index === current
                  ? "middle"
                  : index === (current + 1) % testimonials.length
                  ? "right"
                  : "left"
              }`}
              style={{ width: "22rem" }}
            >
              <img
                src={testimonial.img}
                className="card-img-top"
                alt={testimonial.name}
              />
              <div className="card-body">
                <h5 className="card-title">{testimonial.name}</h5>
                <p className="card-text">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* email part */}
      <section>
      <div className="subscribe-section">
      

        <h2 className="subscribe-heading">Stay Updated</h2>
        <p className="subscribe-paragraph" color="#045D5D">
          Subscribe to our newsletter to get the latest updates and offers.
        </p>
        <form className="subscribe-form" onSubmit={handleEmailSubmit}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="subscribe-input"
            placeholder="Enter your email"
            required
          />
          <button type="submit" className="subscribe-button">Subscribe</button>
        </form>
      </div>
      </section>
    </div>
  );
}

export default PerfectTutor;
