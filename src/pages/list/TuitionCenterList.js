import React, { useState, useEffect } from 'react';
import { useGetAllTuitionCentersQuery } from '../../redux/api/tuitioncenterApi';
import { useNavigate } from 'react-router-dom';
import { filterByFees, filterByAvailability, filterByCourse, filterByRatings } from '../../utils/filterUtils';
import { sortByName, sortByRatings, sortByFees } from '../../utils/sortUtils';
import "../../style/list/tuitioncenterlist.css";
import { FaFilter, FaSort } from 'react-icons/fa';

const TuitionCenterList = () => {
  const { data: centersData, error, isLoading } = useGetAllTuitionCentersQuery();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    fees: '',
    availability: '',
    course: '',
    ratings: '',
  });

  const [sort, setSort] = useState('');
  const [courses, setCourses] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    if (centersData) {
      const allCourses = centersData.flatMap(center => center.courses || []);
      const uniqueCourses = Array.from(new Set(allCourses));
      setCourses(uniqueCourses);
    }
  }, [centersData]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching tuition centers: {error.message}</p>;
  }

  let centers = centersData || [];

  // Apply filters
  if (filter.fees) {
    centers = filterByFees(centers, filter.fees);
  }
  if (filter.availability) {
    centers = filterByAvailability(centers, filter.availability);
  }
  if (filter.course) {
    centers = filterByCourse(centers, filter.course);
  }
  if (filter.ratings) {
    centers = filterByRatings(centers, filter.ratings);
  }

  // Apply sorting
  let sortedCenters = [...centers];
  if (sort === 'name') {
    sortedCenters = sortByName(sortedCenters);
  } else if (sort === 'ratings') {
    sortedCenters = sortByRatings(sortedCenters);
  } else if (sort === 'fees') {
    sortedCenters = sortByFees(sortedCenters);
  }

  const handleClick = (id) => {
    navigate(`/tuition-center/${id}`);
  };

  return (
    <div>
      <h1>All Tuition Centers</h1>

      <div className="filter-sort-controls">
        <button className="toggle-button" onClick={() => setShowFilter(!showFilter)}>
          <FaFilter /> Filters
        </button>
        <button className="toggle-button" onClick={() => setShowSort(!showSort)}>
          <FaSort /> Sort
        </button>
      </div>

      {showFilter && (
        <div className="filter-section">
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
            <label htmlFor="course">Course:</label>
            <select id="course" onChange={(e) => setFilter({...filter, course: e.target.value})} value={filter.course}>
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
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
        <div className="sort-section">
          <div className="filter-group">
            <label htmlFor="sort">Sort By:</label>
            <select id="sort" onChange={(e) => setSort(e.target.value)} value={sort}>
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="ratings">Ratings</option>
              <option value="fees">Fees</option>
            </select>
          </div>
        </div>
      )}

      <div className="tuition-center-list">
        {sortedCenters.length > 0 ? (
          sortedCenters.map((center) => (
            <div key={center._id} className="tuition-center-card" onClick={() => handleClick(center._id)}>
              <div className="tuition-center-card-inner">
                <div className="tuition-center-card-front">
                  {center.photo && (
                    <img
                      src={center.photo}
                      alt={center.name}
                      className="tuition-center-photo"
                    />
                  )}
                  <h3>{center.name}</h3>
                  <p>Location: {center.location}</p>
                  <p>Courses: {center.courses.join(', ')}</p>
                </div>
                <div className="tuition-center-card-back">
                  <p>Rating: {center.ratings}</p>
                  <p>Contact Number: {center.contactNumber}</p>
                  <div className="center-fees">
                    <strong>Fees:</strong>
                    <ul>
                      {center.fees &&
                        Object.entries(center.fees).map(([course, fee]) => (
                          <li key={course}>
                            {course}: Rs.{fee}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='no-result'>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default TuitionCenterList;
