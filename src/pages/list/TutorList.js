import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllTutorsQuery } from '../../redux/api/tutorApi';
import { FaFilter, FaSort } from 'react-icons/fa';
import {
  filterByFees,
  filterByAvailability,
  filterBySubject,
  filterByRatings,
} from '../../utils/filterUtils';
import {
  sortByName,
  sortByRatings,
  sortByFees
} from '../../utils/sortUtils';
import '../../style/list/tutorlist.css';

const TutorList = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllTutorsQuery();
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const [filter, setFilter] = useState({
    fees: '',
    availability: '',
    subject: '',
    ratings: '',
  });

  const [sort, setSort] = useState('');
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (data?.tutors) {
      // Extract unique subjects from data
      const allSubjects = data.tutors.flatMap(tutor => tutor.subjects || []);
      const uniqueSubjects = Array.from(new Set(allSubjects));
      setSubjects(uniqueSubjects);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading tutors</p>;
  }

  let tutors = data?.tutors || [];

  // Apply filters
  if (filter.fees) {
    tutors = filterByFees(tutors, filter.fees);
  }
  
  if (filter.availability) {
    tutors = filterByAvailability(tutors, filter.availability);
  }
  
  if (filter.subject) {
    tutors = filterBySubject(tutors, filter.subject);
  }
  
  if (filter.ratings) {
    tutors = filterByRatings(tutors, filter.ratings);
  }
  
  // Apply sorting
  if (sort === 'name') {
    tutors = sortByName(tutors);
  } else if (sort === 'ratings') {
    tutors = sortByRatings(tutors);
  } else if (sort === 'fees') {
    tutors = sortByFees(tutors);
  }

  const handleCardClick = (id) => {
    navigate(`/tutor/${id}`);
  };

  return (
    <div className="tutor-list">
      <h1>All Tutors</h1>
      {/* Filter and Sort UI */}
      <div className="filter-sort-controls">
        <button className="toggle-button" onClick={() => setShowFilter(!showFilter)}>
          <FaFilter /> Filters
        </button>
        <button className="toggle-button" onClick={() => setShowSort(!showSort)}>
          <FaSort /> Sort
        </button>
      </div>
      {/* Wrapping filters and sort in a single parent div */}
      <div className="filter-sort-content">
        {showFilter && (
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="fees">Fees:</label>
              <select id="fees" onChange={(e) => setFilter({...filter, fees: e.target.value})} value={filter.fees}>
                <option value="">Select Fee</option>
                <option value="1000">Up to 1000</option>
                <option value="2000">Up to 2000</option>
                <option value="3000">Up to 3000</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="availability">Availability:</label>
              <select id="availability" onChange={(e) => setFilter({...filter, availability: e.target.value})} value={filter.availability}>
                <option value="">Select Availability</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="subject">Subject:</label>
              <select id="subject" onChange={(e) => setFilter({...filter, subject: e.target.value})} value={filter.subject}>
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="ratings">Ratings:</label>
              <select id="ratings" onChange={(e) => setFilter({...filter, ratings: e.target.value})} value={filter.ratings}>
                <option value="">Select Minimum Rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
          </div>
        )}
        {showSort && (
          <div className="filter-group">
            <label htmlFor="sort">Sort By:</label>
            <select id="sort" onChange={(e) => setSort(e.target.value)} value={sort}>
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="ratings">Ratings</option>
              <option value="fees">Fees</option>
            </select>
          </div>
        )}
      </div>
      <div className="tutors-list-container">
        {tutors.length > 0 ? (
          tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="tutor-list-card"
              onClick={() => handleCardClick(tutor._id)}
            >
              {tutor.photo && (
                <img
                  src={tutor.photo}
                  alt={`${tutor.name}'s photo`}
                  className="tutor-list-photo"
                />
              )}
              <h3>{tutor.name}</h3>
              <p>Availability: {tutor.availability}</p>
              <p>Ratings: {tutor.ratings}</p>
              <p>Fees: {Math.min(...Object.values(tutor.fees))}</p>
            </div>
          ))
        ) : (
          <p className='no-result'>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default TutorList;
