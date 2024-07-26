import React, { useEffect, useState } from "react";
import { useGetAllTutorsQuery } from '../redux/api/tutorApi';
import image1 from '../assets/home/header/image1.webp';
import image2 from '../assets/home/header/image2.webp';
import image3 from '../assets/home/header/image3.jpg';
import image4 from '../assets/home/header/image4.jpg';
import image5 from '../assets/home/header/image5.jpg';
import image6 from '../assets/home/header/image6.jpg';
import image7 from '../assets/home/header/image7.jpg';
import '../style/home.css';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image2, image3, image4, image5, image6, image7];
  const { data, error, isLoading } = useGetAllTutorsQuery();
  const tutors = data?.tutors || []; 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home">
      <section className="header-section">
        <div className="header-images">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`header-image ${index === currentImageIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </section>
      <section className="intro-section">
        <h1>Welcome to Our Platform</h1>
        <p>We provide detailed information about tuition centers and tutors. You can hire the best home tutors here.</p>
      </section>
      <section className="latest-products">
        <h2>Latest Products</h2>
        {/* Add content for latest products */}
      </section>
      <section className="categories">
        <h2>Categories</h2>
        {/* Add content for categories */}
      </section>
      <section className="banner">
        <h2>Special Offers</h2>
        {/* Add content for the banner */}
      </section>
      <section className="more-section">
        <h2>More About Us</h2>
        <p>Discover more about our services and how we can help you find the best tutors and tuition centers for your needs.</p>
        <ul>
          <li>Extensive database of tutors and tuition centers</li>
          <li>User-friendly interface for easy navigation</li>
          <li>Verified reviews and ratings</li>
          <li>Affordable and flexible pricing options</li>
        </ul>
      </section>
      <section className="tutors-section">
        <h2>Our Tutors</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading tutors</p>}
        <div className="tutors-list">
          {tutors.map((tutor) => (
            <div key={tutor._id} className="tutor-card">
              <h3>{tutor.name}</h3>
              <p>{tutor.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
