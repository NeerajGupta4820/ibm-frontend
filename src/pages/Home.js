import React, { useEffect, useState } from "react";
import { useGetAllTutorsQuery } from "../redux/api/tutorApi";
// import image1 from '../assets/home/header/image1.webp';
import image2 from "../assets/home/header/image2.webp";
import image3 from "../assets/home/header/image3.jpg";
import image4 from "../assets/home/header/image4.jpg";
import image5 from "../assets/home/header/image5.jpg";
import image6 from "../assets/home/header/image6.jpg";
import image7 from "../assets/home/header/image7.jpg";
import "../style/home.css";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTutorIndex, setCurrentTutorIndex] = useState(0);
  const images = [image2, image3, image4, image5, image6, image7];
  const { data, error, isLoading } = useGetAllTutorsQuery();
  const tutors = data?.tutors || [];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    const tutorInterval = setInterval(() => {
      setCurrentTutorIndex((prevIndex) => (prevIndex + 1) % tutors.length);
    }, 3000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(tutorInterval);
    };
  }, [images.length, tutors.length]);

  const handlePrev = () => {
    setCurrentTutorIndex(
      (prevIndex) => (prevIndex - 1 + tutors.length) % tutors.length
    );
  };

  const handleNext = () => {
    setCurrentTutorIndex((prevIndex) => (prevIndex + 1) % tutors.length);
  };

  const displayedTutors =
    tutors.length > 0
      ? [
          tutors[currentTutorIndex % tutors.length],
          tutors[(currentTutorIndex + 1) % tutors.length],
          tutors[(currentTutorIndex + 2) % tutors.length],
          tutors[(currentTutorIndex + 3) % tutors.length],
        ]
      : [];

  return (
    <div className="home">
      <section className="header-section">
        <div className="header-images">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`header-image ${
                index === currentImageIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
      </section>
      <section className="intro-section">
        <h1>Welcome to Our Platform</h1>
        <p>
          We provide detailed information about tuition centers and tutors. You
          can hire the best home tutors here.
        </p>
      </section>
      <section className="tutors-section">
        <h2>Our Tutors</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading tutors</p>}
        <div className="tutors-slider">
          <button onClick={handlePrev} className="slider-button prev">
            &lt;
          </button>
          <div className="tutors-list">
            {displayedTutors.map((tutor, index) => (
              <div key={tutor?._id || index} className="tutor-card">
                {tutor?.photo && (
                  <img
                    src={`${process.env.REACT_APP_SERVER}/${tutor.photo}`}
                    alt={`${tutor.name}'s photo`}
                    className="tutor-photo"
                  />
                )}
                <h3>{tutor?.name}</h3>
                <p className="availability">
                  Availability: {tutor?.availability}
                </p>
                <p className="ratings">Ratings: {tutor?.ratings}</p>
                <div className="tutor-fees">
                  <strong>Fees:</strong>
                  <ul>
                    {tutor?.fees &&
                      Object.entries(tutor.fees).map(([subject, fee]) => (
                        <li key={subject}>
                          {subject}: Rs.{fee}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleNext} className="slider-button">
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
