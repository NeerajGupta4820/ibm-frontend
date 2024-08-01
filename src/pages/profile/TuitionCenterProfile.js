import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTuitionCenterProfileQuery } from '../../redux/api/tuitioncenterApi';
import LatestTuitioncenter from "../../components/LatestTuitioncenter";
import emailjs from "emailjs-com";
import { toast } from "react-hot-toast";
import img2 from "../../assets/contact/svg2.webp"
import TutorReview from "../../components/review/TutorReview";
import '../../style/profile/tuitioncenterprofile.css';
import { useGetReviewsQuery } from "../../redux/api/reviewApi";

const TuitionCenterProfile = () => {
  const { id } = useParams();
  const { data: center, error, isLoading } = useGetTuitionCenterProfileQuery(id);
  const { data: reviews, error: reviewsError, isLoading: isReviewsLoading } = useGetReviewsQuery(
    { reviewedEntityId: id, reviewedEntityType: "TuitionCenter" }
  );
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading tuition center profile</p>;
  }

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
    <div className="tuition-center-profile">
      <div className="center-profile">
        <div className="center-profile-img">
          {center?.photo && (
            <img
              src={center.photo}
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
      <div className="contact-section">
        <div className="tutor-profile-contact-content">
        <h2>Contact {center?.name}</h2>
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
      <div className="tuition-center-profile-latest">
        <LatestTuitioncenter />
      </div>
      <div>
        <TutorReview reviews={reviews || []} reviewedEntityId={id} reviewedEntityType="TuitionCenter" />
      </div>
    </div>
  );
};

export default TuitionCenterProfile;
