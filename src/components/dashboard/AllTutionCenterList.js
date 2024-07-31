import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDeleteTuitionCenterProfileMutation, useGetAllTuitionCentersQuery } from "../../redux/api/tuitioncenterApi";

const AllTutionCenterList = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllTuitionCentersQuery();
  const [deleteTuitionCenterProfile] = useDeleteTuitionCenterProfileMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const handleViewProfile = (id) => {
      navigate(`/profile/${id}`);
    };
    console.log(data);

  const handleDelete = async (id) => {
    try {
      await deleteTuitionCenterProfile(id).unwrap();
      toast.success('Tuition Center deleted successfully');
    } catch (err) {
      toast.error('Failed to delete Tuition Center');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching tuition centers</p>;

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = data ? data.slice(indexOfFirstUser, indexOfFirstUser + itemsPerPage) : [];
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

  return (
    <div className="user-list">
      <h1>All Tuition Centers</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Courses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user._id}>
              <td>{user.name}<div style={{'color':"gray", fontSize:12}}>{user.description}</div></td>
              <td>{user.email}<div style={{'color':"gray", fontSize:12}}>{user.location}</div></td>
              <td>{user.courses.map((course,index) => (<div>{index+1}. {course}</div>))}</td>
              <td>
                <button onClick={() => handleViewProfile(user._id)} className="tutor-view-button">View Details</button>
                <button onClick={() => handleDelete(user._id)} className="tutor-delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllTutionCenterList;
