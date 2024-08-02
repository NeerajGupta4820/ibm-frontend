import React, { useEffect, useState } from "react";
import image2 from "../assets/home/header/image2.jpg";
import image3 from "../assets/home/header/image3.jpg";
import image4 from "../assets/home/header/image4.jpg";
import image5 from "../assets/home/header/image5.jpg";
import image6 from "../assets/home/header/image6.jpg";
import image7 from "../assets/home/header/image7.jpg";
import LatestTutor from "../components/LatestTutor";
import "../style/home.css";
import Hiringlist from "../components/Hiringlist";
import PerfectTutor from "../components/PerfectTutor";
import LatestTuitioncenter from "../components/LatestTuitioncenter";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image2, image3, image4, image5, image6, image7];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(imageInterval);
    };
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
      <section>
        <LatestTutor />
      </section>
      <section className="hiringlist">
        <Hiringlist />
      </section>
      <section>
        <LatestTuitioncenter/>
      </section>
      <section>
        <PerfectTutor />
      </section>
    </div>
  );
};

export default Home;
