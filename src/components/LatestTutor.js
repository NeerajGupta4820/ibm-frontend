import React, { useState, useEffect } from "react";
import { useGetLatestTutorsQuery } from "../redux/api/tutorApi";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
import {toast} from "react-hot-toast"
import { useSelector } from "react-redux";
import "../style/admind.css";

const LatestTutor = () => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_SERVER;
  const user = useSelector((state) => state.user.user);
  const [currentTutorIndex, setCurrentTutorIndex] = useState(0);
  const {
    data: tutorsData,
    error: tutorsError,
    isLoading: tutorsLoading,
  } = useGetLatestTutorsQuery();

  const tutors = tutorsData?.latestTutors || [];

  const handleDelete = async (tutor) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this tutor?"
      );
      if (confirmDelete) {
        const token = localStorage.getItem("token");

        
          console.log(token);

          const response = await axios.delete(
            `${baseURL}/api/admin/user/${tutor._id}?id=${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast.success("Deleted Successfully");
          navigate("/admin-dashboard");
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTutorIndex((prevIndex) => (prevIndex + 1) % tutors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [tutors.length]);

  const handlePrevTutor = () => {
    setCurrentTutorIndex(
      (prevIndex) => (prevIndex - 1 + tutors.length) % tutors.length
    );
  };

  const handleNextTutor = () => {
    setCurrentTutorIndex((prevIndex) => (prevIndex + 1) % tutors.length);
  };

  const handleTutorClick = (id) => {
    navigate(`/tutor/${id}`);
  };

  const displayedTutors =
    tutors.length > 0
      ? [
          tutors[currentTutorIndex % tutors.length],
          tutors[(currentTutorIndex + 1) % tutors.length],
          tutors[(currentTutorIndex + 2) % tutors.length],
          tutors[(currentTutorIndex + 3) % tutors.length],
        ]
      : [];

  return (
    <div className="tutor-page">
      <h1>Our Latest Tutors</h1>
      {tutorsLoading && <p>Loading...</p>}
      {tutorsError && <p>Error loading tutors</p>}
      <div className="tutors-slider">
        <button onClick={handlePrevTutor} className="slider-button prev">
          &lt;
        </button>
        <div className="tutors-list">
          {displayedTutors.map((tutor, index) => (
            <div
              key={tutor?._id || index}
              className="tutor-card"
            >
              {user && user.role === "Admin" ? (
                <RiDeleteBin5Line
                  className="deletebtn"
                  onClick={() => handleDelete(tutor)}
                  id={tutor._id}
                />
              ) : (
                ""
              )}
              {tutor?.photo && (
                <img
                  src={`${process.env.REACT_APP_SERVER}/${tutor.photo}`}
                  alt={`${tutor.name}'s photo`}
                  className="tutor-photo"
                  onClick={() => handleTutorClick(tutor?._id)}
                />
              )}
              <h3>{tutor?.name}</h3>
              <p className="availability">
                Availability: {tutor?.availability}
              </p>
              <p className="ratings">Ratings: {tutor?.ratings}</p>
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
          ))}
        </div>
        <button onClick={handleNextTutor} className="slider-button">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default LatestTutor;
