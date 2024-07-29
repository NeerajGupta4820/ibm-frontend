import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetTuitionCenterProfileQuery } from '../../redux/api/tuitioncenterApi';
import LatestTuitioncenter from "../../components/LatestTuitioncenter"
import '../../style/profile/tuitioncenterprofile.css';

const TuitionCenterProfile = () => {
  const { id } = useParams();
  const { data: center, error, isLoading } = useGetTuitionCenterProfileQuery(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading tuition center profile</p>;
  }

  return (
    <div className="tuition-center-profile">
      <div className="center-profile">
        <div className="center-profile-img">
          {center?.photo && (
            <img
              src={`${process.env.REACT_APP_SERVER}/${center.photo}`}
              alt={`${center.name}'s photo`}
              className="center-photo"
            />
          )}
        </div>
        <div className="center-profile-content">
          <h1>{center?.name}</h1>
          <p>{center?.description}</p>
          <p>Location: {center?.location}</p>
          <p>Courses Offered: {center?.courses.join(', ')}</p>
          <p>Rating: {center?.ratings}</p>
          <p>Contact Number: {center?.contactNumber}</p>
          <div className="center-fees">
            <strong>Fees:</strong>
            <ul>
              {center?.fees &&
                Object.entries(center.fees).map(([course, fee]) => (
                  <li key={course}>
                    {course}: Rs.{fee}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="tuition-center-profile-latest">
        <LatestTuitioncenter/>
      </div>
    </div>
  );
};

export default TuitionCenterProfile;
