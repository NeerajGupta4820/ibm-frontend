import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useGetTutorProfileQuery } from "../../redux/api/tutorApi";
import { useGetReviewsQuery } from "../../redux/api/reviewApi";
import { addToWatchlist } from "../../redux/reducers/watchlistReducer";
import LatestTutor from "../../components/LatestTutor";
import TutorReview from "../../components/review/TutorReview";
import "../../style/profile/tutorprofile.css";

const TutorProfile = () => {
  const { id } = useParams();
  const { data: tutor, error: tutorError, isLoading: isTutorLoading } = useGetTutorProfileQuery(id);
  const { data: reviews, error: reviewsError, isLoading: isReviewsLoading } = useGetReviewsQuery(
    { reviewedEntityId: id, reviewedEntityType: 'Tutor' }
  );
  const [selectedSubject, setSelectedSubject] = useState("");
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  if (isTutorLoading) {
    return <p>Loading...</p>;
  }

  if (tutorError ) {
    return <p>Error loading tutor profile or reviews</p>;
  }

  const handleAddToWatchlist = () => {
    if (!selectedSubject) {
      toast.error("Please select a subject.");
      return;
    }
    const tutorDetails = {
      tutorId: id,
      userId: user.id,
      tutorName: tutor.name,
      tutorPhoto: tutor.photo,
      subject: selectedSubject,
      fee: tutor.fees[selectedSubject],
    };
    dispatch(addToWatchlist(tutorDetails));
    toast.success("Tutor added to watchlist.");
  };

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
          <div className="add-to-watchlist">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="subject-select"
            >
              <option value="">Select a subject</option>
              {tutor?.fees &&
                Object.keys(tutor.fees).map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
            </select>
            <button onClick={handleAddToWatchlist} className="watchlist-button">
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>
      <div className="contact-section">
        <h2>Contact {tutor?.name}</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit" className="contact-submit">Send Message</button>
        </form>
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
