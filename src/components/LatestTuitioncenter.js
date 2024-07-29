import React, { useState, useEffect } from 'react';
import { useGetLatestTuitionCentersQuery } from '../redux/api/tuitioncenterApi';
import { useNavigate } from 'react-router-dom';

const LatestTuitioncenter = () => {
  const navigate=useNavigate();
  const [currentCenterIndex, setCurrentCenterIndex] = useState(0);
  const { data: centersData, error: centersError, isLoading: centersLoading } = useGetLatestTuitionCentersQuery();
  
  const centers = centersData || [];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCenterIndex((prevIndex) => (prevIndex + 1) % centers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [centers.length]);

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
    ? [
        centers[currentCenterIndex % centers.length],
        centers[(currentCenterIndex + 1) % centers.length],
        centers[(currentCenterIndex + 2) % centers.length],
        centers[(currentCenterIndex + 3) % centers.length],
      ]
    : [];

  return (
    <div className="latest-tuition-centers">
      <h1>Latest Tuition Centers</h1>
      {centersLoading && <p>Loading...</p>}
      {centersError && <p>Error fetching latest tuition centers: {centersError.message}</p>}
      <div className="centers-slider">
        <button onClick={handlePrevCenter} className="slider-button prev">
          &lt;
        </button>
        <div className="centers-list">
          {displayedCenters.map((center, index) => (
            <div key={center?._id || index} className="tuition-center-card"
            onClick={() => handleCardClick(center._id)}>
              {center?.photo && (
                <img 
                  src={`${process.env.REACT_APP_SERVER}/${center.photo}`} 
                  alt={center.name} 
                  className="tuition-center-photo" 
                />
              )}
              <h3>{center?.name}</h3>
              <p>Courses: {center?.courses && center.courses.join(', ')}</p>
              <p>Rating: {center?.ratings}</p>
            </div>
          ))}
        </div>
        <button onClick={handleNextCenter} className="slider-button">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default LatestTuitioncenter;
