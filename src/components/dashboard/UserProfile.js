import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEdit } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { userNotExist } from '../../redux/reducers/userReducer';
import { useUpdateUserMutation } from '../../redux/api/userApi';
import '../../style/profile/userdashboardprofile.css';

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: '',
    profileInfo: '',
  });
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        photo: user.photo || '',
        profileInfo: user.profileInfo || '',
      });
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser({ userId: user.id, userFormData: formData }).unwrap();
      if (response.success) {
        toast.success(response.message || 'User updated successfully');
        setEditMode(false);
      } else {
        toast.error(response.message || 'Failed to update user');
      }
    } catch (err) {
      console.error('Failed to update user:', err);
      toast.error('Failed to update user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(userNotExist());
    toast.success('User logout successfully');
    navigate('/');
  };

  return (
    <div className="user-dashboard-profile">
      <div className="dashboard-header">
        <img src={formData.photo} alt={formData.name} className="dashboard-profile-photo" />
        <h1>{formData.name}</h1>
        <p>{formData.email}</p>
        <p>{user.role}</p>
        <button onClick={handleEditClick} className="edit-button">
          <FaEdit /> Edit
        </button>
      </div>
      <form onSubmit={handleSubmit} className="user-profile-details">
        <FaUser size={50} />
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div>
          <label htmlFor="profileInfo">Profile Info:</label>
          <textarea
            id="profileInfo"
            name="profileInfo"
            value={formData.profileInfo}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <button type="submit" disabled={!editMode || updateLoading}>
          {updateLoading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
