import React, { useState, useEffect } from 'react';
import { useGetLatestTuitionCentersQuery } from '../redux/api/tuitioncenterApi';
import { useNavigate } from 'react-router-dom';
import "../style/cards/tuitioncentercard.css";

const LatestTuitioncenter = () => {
  const navigate = useNavigate();
  const [currentCenterIndex, setCurrentCenterIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
  const { 
    data: centersData,
    error: centersError, 
    isLoading: centersLoading 
    } = useGetLatestTuitionCentersQuery();
  const centers = centersData?.latesttuitionCenters || [];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCenterIndex((prevIndex) => (prevIndex + 1) % centers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [centers.length]);

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

  const handlePrevCenter = () => {
    setCurrentCenterIndex((prevIndex) => (prevIndex - 1 + centers.length) % centers.length);
  };

  const handleNextCenter = () => {
    setCurrentCenterIndex((prevIndex) => (prevIndex + 1) % centers.length);
  };

  const handleCardClick = (id) => {
    navigate(`/tuition-center/${id}`);
  };

  const displayedCenters = centers.length > 0
    ? Array.from({ length: cardsToShow }, (_, i) => centers[(currentCenterIndex + i) % centers.length])
    : [];

  return (
    <div className="i-latest-tuition-centers">
      <h1>Latest Tuition Centers</h1>
      {centersLoading && <p>Loading...</p>}
      {centersError && <p>Error fetching latest tuition centers: {centersError.message}</p>}
      <div className="i-centers-slider">
        <button onClick={handlePrevCenter} className="i-slider-button prev">
          &lt;
        </button>
        <div className="i-centers-list">
          {displayedCenters.map((center, index) => (
            <div
              key={center?._id || index}
              className="i-tuition-center-card"
              onClick={() => handleCardClick(center?._id)}>
              {center?.photo && (
                <img 
                  src={center.photo}
                  alt={center.name} 
                  className="i-tuition-center-photo" 
                />
              )}
              <h3>{center?.name}</h3>
              <p>Courses: {center?.courses && center.courses.join(', ')}</p>
              <p>Rating: {center?.ratings}</p>
            </div>
          ))}
        </div>
        <button onClick={handleNextCenter} className="i-slider-button">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default LatestTuitioncenter;
