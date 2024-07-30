import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../../style/dashboard/tutordashboard.css"

const TutorDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tutor-dashboard">
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default TutorDashboard;
