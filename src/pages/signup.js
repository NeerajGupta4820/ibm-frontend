import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../redux/api/userApi'; // Adjust the import according to your setup

const SignupUser = () => {
  const dispatch = useDispatch();
  const [registerUser, { isLoading, isError, isSuccess, error }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: null,
    role: '',
    profileInfo: ''
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userFormData = new FormData();
      for (const key in formData) {
        userFormData.append(key, formData[key]);
      }
      await registerUser(userFormData).unwrap();
      alert('User registered successfully!');
    } catch (err) {
      console.error('Failed to register user:', err);
    }
  };

  return (
    <div className="signup-user">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="profileInfo">Profile Info</label>
          <textarea
            id="profileInfo"
            name="profileInfo"
            value={formData.profileInfo}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
        {isError && <p>Error: {error.message}</p>}
        {isSuccess && <p>Registration successful!</p>}
      </form>
    </div>
  );
};

export default SignupUser;
