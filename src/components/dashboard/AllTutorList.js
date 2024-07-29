import React from 'react';
import { useGetAllTutorsQuery, useDeleteTutorProfileMutation } from '../../redux/api/tutorApi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../style/dashboard/alltutorlist.css';
const AllTutorList = () => {
  const { data, error, isLoading } = useGetAllTutorsQuery();
  const [deleteTutorProfile] = useDeleteTutorProfileMutation();

  const handleDelete = async (id) => {
    try {
      await deleteTutorProfile(id).unwrap();
      toast.success('Tutor deleted successfully');
    } catch (err) {
      toast.error('Failed to delete tutor');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching tutors</div>;

  return (
    <div className="tutor-list-container">
      <h1>All Tutors</h1>
      <ul className="tutor-list">
        {data.tutors.map((tutor) => (
          <li key={tutor._id} className="tutor-list-item">
            <span className="tutor-name">{tutor.name}</span>
            <div className="tutor-actions">
              <Link to={`/tutors/${tutor._id}`} className="tutor-view-button">
                View Details
              </Link>
              <button onClick={() => handleDelete(tutor._id)} className="tutor-delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTutorList;
