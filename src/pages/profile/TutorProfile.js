import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useGetTutorProfileQuery } from "../../redux/api/tutorApi";
import { useGetReviewsQuery } from "../../redux/api/reviewApi";
import { addToWatchlist } from "../../redux/reducers/watchlistReducer";
import LatestTutor from "../../components/LatestTutor";
import TutorReview from "../../components/review/TutorReview";
import emailjs from "emailjs-com";
import img2 from "../../assets/tutorprofile/img2.webp"
import "../../style/profile/tutorprofile.css";

const TutorProfile = () => {
  const { id } = useParams();
  const { data: tutor, error: tutorError, isLoading: isTutorLoading } = useGetTutorProfileQuery(id);
  const { data: reviews, error: reviewsError, isLoading: isReviewsLoading } = useGetReviewsQuery(
    { reviewedEntityId: id, reviewedEntityType: "Tutor" }
  );
  console.log(tutor)
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  if (isTutorLoading ) {
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
    if (!user) {
      toast.error("Please Sign up First");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.name === "" || formData.email === "" || formData.message === "") {
      toast.error("All fields are mandatory");
      setLoading(false);
      return;
    }

    emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_KEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Email sent successfully");
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          console.error("FAILED...", error);
          toast.error("Failed to send email.");
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="main-tutor-profile">
      <div className="tutor-profile">
        <div className="tutor-profile-img">
          {tutor?.photo && (
            <img
              src={tutor.photo}
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
        <div className="tutor-profile-contact-content">
        <h2>Contact {tutor?.name}</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="contact-submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        </div>
        <div className="tutor-profile-contactimg">
          <img src={img2} />
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
