import React from 'react';
import { useGetAllTutorsQuery } from '../../redux/api/tutorApi';
import '../../style/list/tutorlist.css';

const TutorList = () => {
  const { data, error, isLoading } = useGetAllTutorsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading tutors</p>;
  }

  const tutors = data?.tutors || [];

  return (
    <div className="tutor-list">
      <h1>All Tutors</h1>
      <div className="tutors-list-container">
        {tutors.map((tutor) => (
          <div key={tutor._id} className="tutor-list-card">
            {tutor.photo && (
              <img
                src={`${process.env.REACT_APP_SERVER}/${tutor.photo}`}
                alt={`${tutor.name}'s photo`}
                className="tutor-list-photo"
              />
            )}
            <h3>{tutor.name}</h3>
            <p>{tutor.bio}</p>
            <p>Availability: {tutor.availability}</p>
            <p>Ratings: {tutor.ratings}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorList;
