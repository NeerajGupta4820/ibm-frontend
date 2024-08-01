import React from 'react';
import { useGetAllTuitionCentersQuery } from '../../redux/api/tuitioncenterApi';
import "../../style/list/tuitioncenterlist.css";
import { useNavigate } from 'react-router-dom';

const TuitionCenterList = () => {
  const { data: centersData, error, isLoading } = useGetAllTuitionCentersQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching tuition centers: {error.message}</p>;
  }

  const centers = centersData || [];

  const handleClick = (id)=>{
    navigate(`/tuition-center/${id}`);
  }

  return (
    <div>
      <h1>All Tuition Centers</h1>
      {centers.length === 0 ? (
        <p>No tuition centers available</p>
      ) : (
        <div className="tuition-center-list">
          {centers.map((center) => (
            <div key={center._id} className="tuition-center-card" onClick={() => handleClick(center._id)}>
              <div className="tuition-center-card-inner">
                <div className="tuition-center-card-front" >
                  {center.photo && (
                    <img
                      src={`${process.env.REACT_APP_SERVER}/${center.photo}`}
                      alt={center.name}
                      className="tuition-center-photo"
                      
                    />
                  )}
                  <h3>{center.name}</h3>
                  <p>Location: {center.location}</p>
                  <p>Courses: {center.courses.join(', ')}</p>
                </div>
                <div className="tuition-center-card-back" >
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
          ))}
        </div>
      )}
    </div>
  );
};

export default TuitionCenterList;
