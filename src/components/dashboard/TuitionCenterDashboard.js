import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TuitionCenterDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login'); 
    return null;
  }

  const { name, email, photo, location, courses, fees, ratings, description, reviews, contactNumber } = user;

  return (
    <div className="tuition-center-profile">
      <img src={photo} alt="Tuition Center Photo" />
      <h1>{name}</h1>
      <p>{email}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Courses:</strong> {courses.join(', ')}</p>
      <p><strong>Contact Number:</strong> {contactNumber}</p>
      <p><strong>Ratings:</strong> {ratings}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Reviews:</strong> {reviews.length}</p>
      <p><strong>Fees:</strong> {Object.entries(fees).map(([course, fee]) => (
        <span key={course}>{course}: ${fee} </span>
      ))}</p>
    </div>
  );
};

export default TuitionCenterDashboard;
