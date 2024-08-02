import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLatestTutorsQuery } from "../redux/api/tutorApi";
import "../style/cards/tutorcard.css";

const LatestTutor = () => {
  const navigate = useNavigate();
  const [currentTutorIndex, setCurrentTutorIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);

  const {
    data: tutorsData,
    error: tutorsError,
    isLoading: tutorsLoading,
  } = useGetLatestTutorsQuery();
  const tutors = tutorsData?.latestTutors || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTutorIndex((prevIndex) => (prevIndex + 1) % tutors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [tutors.length]);

  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width <= 996) {
        setCardsToShow(2);
      } else if (width <= 1310) {
        setCardsToShow(3);
      } else {
        setCardsToShow(4);
      }
    };

    window.addEventListener("resize", updateCardsToShow);
    updateCardsToShow();

    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const handlePrevTutor = () => {
    setCurrentTutorIndex((prevIndex) => (prevIndex - 1 + tutors.length) % tutors.length);
  };

  const handleNextTutor = () => {
    setCurrentTutorIndex((prevIndex) => (prevIndex + 1) % tutors.length);
  };

  const handleTutorClick = (id) => {
    navigate(`/tutor/${id}`);
  };

  const displayedTutors = tutors.length > 0
    ? Array.from({ length: cardsToShow }, (_, i) => tutors[(currentTutorIndex + i) % tutors.length])
    : [];

  return (
    <div className="tutor-page">
      <h1>Our Latest Tutors</h1>
      {tutorsLoading && <p>Loading...</p>}
      {tutorsError && <p>Error loading tutors</p>}
      <div className="tutors-slider">
        <button onClick={handlePrevTutor} className="slider-button prev">
          &lt;
        </button>
        <div className="tutors-list">
          {displayedTutors.map((tutor, index) => (
            <div
              key={tutor?._id || index}
              className="tutor-card"
              onClick={() => handleTutorClick(tutor?._id)}
            >
              {tutor?.photo && (
                <img
                  src={tutor.photo}
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
        <button onClick={handleNextTutor} className="slider-button">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default LatestTutor;
