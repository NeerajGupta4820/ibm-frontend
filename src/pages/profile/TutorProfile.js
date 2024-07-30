import React from "react";
import { useParams } from "react-router-dom";
import { useGetTutorProfileQuery } from "../../redux/api/tutorApi";
import { useGetReviewsQuery } from "../../redux/api/reviewApi";
import LatestTutor from "../../components/LatestTutor";
import TutorReview from "../../components/review/TutorReview";
import "../../style/profile/tutorprofile.css";

const TutorProfile = () => {
  const { id } = useParams();
  const { data: tutor, error: tutorError, isLoading: isTutorLoading } = useGetTutorProfileQuery(id);
  const { data: reviews, error: reviewsError, isLoading: isReviewsLoading } = useGetReviewsQuery(
    { reviewedEntityId: id, reviewedEntityType: 'Tutor' }
  );
  if (isTutorLoading ) {
    return <p>Loading...</p>;
  }

  if (tutorError ) {
    return <p>Error loading tutor profile or reviews</p>;
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
          <p className="profile-availability">Availability: {tutor?.availability}</p>
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
        <LatestTutor />
      </div>
      <div>
        <TutorReview reviews={reviews || []} reviewedEntityId={id} reviewedEntityType="Tutor" />
      </div>
    </div>
  );
};

export default TutorProfile;
