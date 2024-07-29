import React from "react";
import { useParams } from "react-router-dom";
import { useGetTutorProfileQuery } from "../../redux/api/tutorApi";
import LatestTutor from "../../components/LatestTutor";
import "../../style/profile/tutorprofile.css"

const TutorProfile = () => {
  const { id } = useParams();
  const { data: tutor, error, isLoading } = useGetTutorProfileQuery(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading tutor profile</p>;
  }

  return (
    <div className="main-tutor-profile">
      <div className="tutor-profile">
      <div className="tutor-profile-img">
      {tutor?.photo && (
        <img
          src={`${process.env.REACT_APP_SERVER}/${tutor.photo}`}
          alt={`${tutor.name}'s photo`}
          className="tutor-profile-photo"
        />
      )}
      </div>
      <div className="tutor-profile-content">
      <h1>{tutor?.name}</h1>
      <p>{tutor?.bio}</p>
      <p>Availability: {tutor?.availability}</p>
      <p>Ratings: {tutor?.ratings}</p>
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
      </div>
      <div className="tutor-profile-latest">
        <LatestTutor/>
      </div>
    </div>
  );
};

export default TutorProfile;
